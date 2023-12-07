-- 1. Create Authors table
CREATE TABLE authors (
    author_id SERIAL PRIMARY KEY,
    author_name VARCHAR(100) NOT NULL,
    birth_date DATE,
    country VARCHAR(50)
);

-- 2. Create Genres table
CREATE TABLE genres (
    genre_id SERIAL PRIMARY KEY,
    genre_name VARCHAR(50) NOT NULL
);

-- 3. Create Books table referencing Authors and Genres
CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id INT REFERENCES authors(author_id),
    genre_id INT REFERENCES genres(genre_id),
    publication_year INT,
    ISBN VARCHAR(20) UNIQUE NOT NULL
);

-- 4. Copy mock data into authors
COPY authors 
FROM '/Software Development/FS_JS_QAP3/Queries/authors.csv' 
WITH CSV HEADER;

-- 5. Copy mock data into genres
COPY genres 
FROM '/Software Development/FS_JS_QAP3/Queries/genres.csv' 
WITH CSV HEADER;

-- 6. Copy mock data into books
COPY books 
FROM '/Software Development/FS_JS_QAP3/Queries/books.csv' 
WITH CSV HEADER;

-- 7. show understanding of SELECT
Select * FROM authors;

SELECT * FROM authors where country = 'Russia';

SELECT * FROM genres;

SELECT * FROM books;

SELECT * FROM books WHERE publication_year > 2010;

SELECT * FROM books WHERE author_id = 1;

-- 8. Show understanding of INSERT, UPDATE and DELETE
INSERT INTO authors (author_name, birth_date, country) VALUES ('Phil St Croix', '01/01/2020', 'Canada');
-- need to reset intervals
SELECT setval('authors_author_id_seq', (SELECT MAX(author_id) FROM authors));
-- rerun code
INSERT INTO authors (author_name, birth_date, country) VALUES ('Phil St Croix', '01/01/2020', 'Canada');

select * FROM authors; --to test

-- UPDATE

UPDATE authors SET country = 'Canada' WHERE author_id = 17;

SELECT * FROM authors WHERE author_id = 17; -- to test

-- DELETE
DELETE FROM books WHERE isbn = '1673040';

SELECT * FROM books WHERE isbn ='1673040'; -- to test