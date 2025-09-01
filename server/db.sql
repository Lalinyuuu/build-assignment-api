-- Drop existing tables
DROP TABLE IF EXISTS users, assignments, assignment_submissions, comments, posts CASCADE;

-- Create users table
CREATE TABLE users (
  user_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(25) UNIQUE NOT NULL,
  password VARCHAR(25) NOT NULL,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_logged_in TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create posts table to represent assignments
CREATE TABLE assignments (
  assignment_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(9) NOT NULL,
  length VARCHAR(10),
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  status TEXT, -- Status can be 'draft', 'published', 'archived', etc.
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  published_at TIMESTAMPTZ
);

-- Table to store assignment submissions
CREATE TABLE assignment_submissions (
  submission_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  assignment_id INT REFERENCES assignments(assignment_id) ON DELETE CASCADE,
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  submission_content TEXT NOT NULL,
  submission_status TEXT NOT NULL DEFAULT 'pending', -- Status can be 'pending', 'submitted', 'graded', etc.
  grade DECIMAL(5, 2), -- Grade for the submission
  feedback TEXT, -- Feedback provided by instructor
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table to store comments on assignments
CREATE TABLE comments (
  comment_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  assignment_id INT REFERENCES assignments(assignment_id) ON DELETE CASCADE,
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  comment_text TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

insert into users (username, password, firstname, lastname, created_at, updated_at, last_logged_in) values ('lchadwyck0', 'C2N21L6x', 'Legra', 'Chadwyck', '2021-12-23T09:48:50Z', '2022-01-13T12:33:42Z', '2022-01-08T11:58:03Z');
insert into users (username, password, firstname, lastname, created_at, updated_at, last_logged_in) values ('gvisco1', 'BzR4faX', 'Georgeanne', 'Visco', '2021-09-01T08:11:47Z', '2021-08-03T09:03:46Z', '2021-07-14T03:24:02Z');
insert into users (username, password, firstname, lastname, created_at, updated_at, last_logged_in) values ('hjammet2', 'Z6lxVR', 'Hollie', 'Jammet', '2022-02-27T20:41:32Z', '2022-04-14T05:44:45Z', '2021-12-15T04:50:24Z');
insert into users (username, password, firstname, lastname, created_at, updated_at, last_logged_in) values ('cspinella3', 'RUEZ1yJEs', 'Charline', 'Spinella', '2021-11-23T00:13:30Z', '2021-11-03T11:00:37Z', '2021-12-19T19:58:06Z');
insert into users (username, password, firstname, lastname, created_at, updated_at, last_logged_in) values ('breglar4', 'D6GYjCL', 'Burlie', 'Reglar', '2021-09-14T03:46:37Z', '2021-10-11T19:49:03Z', '2021-07-03T11:03:53Z');
