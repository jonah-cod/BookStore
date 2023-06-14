CREATE DATABASE BookStore;
GO;
use BookStore;
GO;

CREATE TABLE books(
    BookID INT PRIMARY KEY IDENTITY, 
    Title VARCHAR(50) NOT NULL, 
    Author VARCHAR(50) NOT NULL, 
    PublicationYear DATE NOT NULL, 
    Status VARCHAR(20) DEFAULT 'available'
)


CREATE TABLE members(
    MemberID INT PRIMARY KEY IDENTITY, 
    FullName VARCHAR(50) NOT NULL, 
    Address VARCHAR(50), 
    ContactNumber INT NOT NULL
)



CREATE TABLE loans(
    LoanID INT PRIMARY KEY IDENTITY, 
    BookID INT REFERENCES books(BookID), 
    MemberID INT REFERENCES members(MemberID), 
    LoanDate DATE, 
    ReturnDate DATE
)