-- views

-- view to get members who have borrowed a book

CREATE VIEW BorrowedBooksView AS
    SELECT 
        m.MemberID, 
        m.FullName, 
        b.BookID, 
        b.Title
    FROM members m
    INNER JOIN loans l ON m.MemberID = l.MemberID
    INNER JOIN books b ON l.BookID = b.BookID;
