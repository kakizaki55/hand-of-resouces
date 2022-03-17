-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS profiles,
books;

--Profiles table
CREATE TABLE profiles (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    bio TEXT NOT NULL
);

INSERT INTO
    profiles (name, bio)
VALUES
    ('james', 'king of cats');

-- Books table
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

--Tea table
CREATE TABLE tea (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    origin TEXT NOT NULL
);

INSERT INTO
    tea (name, origin)
VALUES
    ('Earlgrey', 'England'),
    ('Greentea', 'Japan');