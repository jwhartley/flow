BEGIN;

CREATE TABLE internal.tasks (
    task_id    BIGINT PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
    task_type  SMALLINT NOT NULL, -- Enumeration of possible task types.
    task_key   TEXT     NOT NULL, -- Deduplication key.

    UNIQUE(task_type, task_key),

    wake_at  TIMESTAMPTZ NOT NULL, -- Deadline by which the task should be polled.
    context  JSONB NOT NULL,       -- Context for the poll of this task.

    -- When a task is actively being polled, then `heartbeat` is set to the time
    -- of dequeue and periodically updated as the task poll runs.
    -- If the heartbeat is not updated within a threshold amount of time,
    -- the poll is presumed to have failed and the task becomes eligible to
    -- be dequeued again by a different runner.
    -- If `heartbeat` is the default, this task has never been dequeued for polling.
    heartbeat TIMESTAMPTZ NOT NULL DEFAULT '0001-01-01T00:00:00Z',

    -- Deadline for the *next* poll of this task. `next_wake_at` may be non-NULL
    -- only if heartbeat is not DEFAULT, meaning it's been dequeued by a runner.
    next_wake_at  TIMESTAMPTZ,
    -- Context for the *next* poll of this task.
    next_context  JSONB

    -- Upon the successful completion of a task poll, if `next_wake_at` is non-NULL then:
    --  `heartbeat` is reset to DEFAULT.
    --  `wake_at` is set to `next_wake_at`, and `next_wake_at` is reset to NULL.
    --  `context` is set to `next_context`, and `next_context` is reset to NULL.
    --
    -- Otherwise, if `next_wake_at` is NULL then the task is done and its row is deleted.
);

COMMENT ON TABLE internal.tasks IS '
The tasks table supports a distributed and asynchronous task execution system.

Tasks are poll-able futures which are identified by (task_type, task_key).
They may be short-lived and polled just once, or very long-lived and polled
many times over their life-cycle.

Tasks are polled by executors which dequeue from the tasks table and run
bespoke handlers parameterized by the task type, key, and context. A polling
routine may take an arbitrarily long amount of time to finish, and the executor
is required to periodically update the task heartbeat as it runs.

A task is polled by at-most one executor at a time. Executor failures are
detected through a failure to update the task heartbeat within a threshold amount
of time, which makes the task re-eligible for dequeue by another executor.

A task may be schedule to run many times prior to its actual dequeue by a runner.
If the task has yet to be dequeued, multiple scheduled polls of a task are reduced
by minimizing over `wake_at` and through JSON Merge-Patch of the polling `context`.

If the task is currently being polled, additional scheduled polls are reduced
by minimizing over `next_wake_at` and through JSON Merge-Patch of `next_context`.
A running executor may schedule future polls its current task, to implement a
recursive or periodic task lifecycle.

When an executor completes polling a task, the task is updated to be eligible
for a future dequeue in accordance with its `next_wake_at`. Or, if `next_wake_at`
remains NULL then the task is considered completed and its row is removed.
';

COMMENT ON COLUMN internal.tasks.task_id IS 'Generated unique ID for the task';


CREATE INDEX internal.tasks_wake_at ON internal.tasks
    USING btree (wake_at) INCLUDE (task_type);


CREATE FUNCTION internal.schedule_task(
    p_task_type  SMALLINT,
    p_task_key   TEXT,
    p_wake_at    TIMESTAMPTZ,
    p_context    JSONB
)
RETURNS VOID AS $$
BEGIN

    INSERT INTO internal.tasks AS CUR (
        task_type,
        task_key,
        wake_at,
        context
    ) VALUES (
        p_task_type,
        p_task_key,
        p_wake_at,
        p_context
    )
    ON CONFLICT (task_type, task_key) DO UPDATE SET
        -- If the task has not been polled, then ratchet down `wake_at`.
        wake_at = CASE
            WHEN CUR.heartbeat = '0001-01-01T00:00:00Z' THEN LEAST(CUR.wake_at, EXCLUDED.wake_at)
            ELSE CUR.wake_at
        END,
        -- If the task has not been polled, then merge the inserted polling context.
        context = CASE
            WHEN CUR.heartbeat = '0001-01-01T00:00:00Z' THEN internal.jsonb_merge_patch(CUR.context, EXCLUDED.context)
            ELSE CUR.context
        END,
        -- If the task HAS been polled, then ratchet down the *NEXT* `wake_at`.
        next_wake_at = CASE
            WHEN CUR.heartbeat = '0001-01-01T00:00:00Z' THEN CUR.next_wake_at
            ELSE LEAST(CUR.next_wake_at, EXCLUDED.wake_at)
        END,
        -- If the task HAS been polled, then merge into the *NEXT* polling context.
        next_context = CASE
            WHEN CUR.heartbeat = '0001-01-01T00:00:00Z' THEN CUR.next_context
            WHEN CUR.next_context IS NULL THEN EXCLUDED.context
            ELSE internal.jsonb_merge_patch(CUR.next_context, EXCLUDED.context)
        END
    ;

END;
$$ LANGUAGE plpgsql;


/*
CREATE FUNCTION internal.dequeue_task_polls(
    p_task_types []SMALLINT,
    p_timeout    INTERVAL,
    p_count      SMALLINT
)
RETURNS internal.tasks AS $$
BEGIN

    WITH picked AS (
        SELECT task_id
        FROM internal.tasks
        WHERE
            -- Pick only eligible task types.
            task_type = ANY(p_task_types) AND
            -- Pick only tasks that are ready now.
            wake_at < NOW()
            -- Don't pick a task that's being polled.
            heartbeat < NOW() - p_timeout AND
        -- Dequeue under last-in, first-out ordering.
        -- This improves live-ness if there's a large backlog.
        ORDER BY wake_at DESC
        LIMIT p_count
        FOR UPDATE SKIP LOCKED
    )
    UPDATE internal.tasks
    SET heartbeat = NOW()
    WHERE task_id in (SELECT task_id FROM picked)
    RETURNING *;

END;
$$ LANGUAGE plpgsql;


CREATE FUNCTION internal.resolve_task_poll(
    p_task_id  BIGINT PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY
)
RETURNS internal.tasks AS $$
BEGIN

    WITH updated AS (
        UPDATE internal.tasks AS t SET
            heartbeat = '0001-01-01T00:00:00Z',
            wake_at = t.next_wake_at,
            context = t.next_context,
            next_wake_at = NULL,
            next_context = NULL
        WHERE task_id = p_task_id
          AND next_wake_at IS NOT NULL
        RETURNING task_id
    )
    DELETE FROM internal.tasks
    WHERE task_id = p_task_id
      AND NOT EXISTS (SELECT 1 FROM updated);

END;
$$ LANGUAGE plpgsql;

*/

COMMIT;