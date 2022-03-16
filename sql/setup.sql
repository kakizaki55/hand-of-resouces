-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS profiles,
books;

CREATE TABLE profiles (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    bio TEXT NOT NULL
);

INSERT INTO
    profiles (name, bio)
VALUES
    ('james', 'king of cats');

CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    author TEXT NOT NULL,
    title TEXT NOT NULL
);

INSERT INTO
    books (author, title)
VALUES
    (
        'forest',
        'the emotinal scientist and the messy gramatical pronoun'
    ),
    ('kurt Vonegget', 'sirans of titan');