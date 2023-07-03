DROP TABLE IF EXISTS students;
CREATE TABLE IF NOT EXISTS students(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR,
  last_name VARCHAR,
  email VARCHAR,
  password VARCHAR,
  calendar_id VARCHAR
);
