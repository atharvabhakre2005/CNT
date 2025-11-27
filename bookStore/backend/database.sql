CREATE DATABASE IF NOT EXISTS assignment9;
USE assignment9;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

DELETE FROM users;
DELETE FROM books;

INSERT INTO users (name, email, password) VALUES 
('John Doe', 'john@example.com', '$2a$08$8ZqJZ5Z5Z5Z5Z5Z5Z5Z5ZuK7qK7qK7qK7qK7qK7qK7qK7qK7qK7qK'),
('Jane Smith', 'jane@example.com', '$2a$08$8ZqJZ5Z5Z5Z5Z5Z5Z5Z5ZuK7qK7qK7qK7qK7qK7qK7qK7qK7qK7qK'),
('Bob Johnson', 'bob@example.com', '$2a$08$8ZqJZ5Z5Z5Z5Z5Z5Z5Z5ZuK7qK7qK7qK7qK7qK7qK7qK7qK7qK7qK');

INSERT INTO books (title, author, price) VALUES 
('The Great Gatsby', 'F. Scott Fitzgerald', 10.99),
('To Kill a Mockingbird', 'Harper Lee', 12.50),
('1984', 'George Orwell', 8.99),
('Pride and Prejudice', 'Jane Austen', 9.99),
('The Catcher in the Rye', 'J.D. Salinger', 11.25);
