INSERT INTO tasks (title, priority)
SELECT
  'Task ' || g,
  'low'
FROM generate_series(1, 1000) g;
