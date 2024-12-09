-- Create and use the gameswap_db database
CREATE DATABASE IF NOT EXISTS gameswap_db;

USE gameswap_db;

-- Define MODERATOR table
-- Assuming a username is at most 20 characters
CREATE TABLE
    MODERATOR (
        moderator_id INT AUTO_INCREMENT PRIMARY KEY,
        password_hash TEXT NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        username VARCHAR(20) UNIQUE NOT NULL
    );

-- Define BUYER table
-- Assuming a username is at most 20 characters
-- Assuming a city is at most 30 characters
CREATE TABLE
    BUYER (
        buyer_id INT AUTO_INCREMENT PRIMARY KEY,
        password_hash TEXT NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        city VARCHAR(30),
        username VARCHAR(20) UNIQUE NOT NULL
    );

-- Define SELLER table
-- Assuming a username is at most 20 characters
-- Assuming a city is at most 30 characters
CREATE TABLE
    SELLER (
        seller_id INT AUTO_INCREMENT PRIMARY KEY,
        password_hash TEXT NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        city VARCHAR(30),
        username VARCHAR(20) UNIQUE NOT NULL,
        avg_rating FLOAT DEFAULT 0.0
    );

-- Define BAN_LIST table
CREATE TABLE
    BAN_LIST (
        banned_by INT NULL,
        target_seller INT NOT NULL,
        UNIQUE (banned_by, target_seller),
        FOREIGN KEY (banned_by) REFERENCES MODERATOR (moderator_id) ON DELETE SET NULL,
        FOREIGN KEY (target_seller) REFERENCES SELLER (seller_id) ON DELETE CASCADE
    );

-- Define SELLER_REVIEW table
CREATE TABLE
    SELLER_REVIEW (
        written_by INT NOT NULL,
        written_for INT NOT NULL,
        review_number INT AUTO_INCREMENT PRIMARY KEY,
        rating INT NOT NULL CHECK (
            rating >= 1
            AND rating <= 5
        ),
        description TEXT NOT NULL,
        FOREIGN KEY (written_by) REFERENCES BUYER (buyer_id) ON DELETE CASCADE,
        FOREIGN KEY (written_for) REFERENCES SELLER (seller_id) ON DELETE CASCADE
    );

-- Define GAME_PLATFORM table
-- Assuming a platform name is at most 20 characters
CREATE TABLE
    GAME_PLATFORM (
        platform_name VARCHAR(20) PRIMARY KEY,
        description TEXT,
        icon_path TINYTEXT
    );

-- Define GAME_CATEGORY table
-- Assuming a category name is at most 20 characters
CREATE TABLE
    GAME_CATEGORY (
        category_name VARCHAR(20) PRIMARY KEY,
        description TEXT
    );

-- Define GAME_LISTING table
-- Assuming a title is at most 20 characters
CREATE TABLE
    GAME_LISTING (
        listing_id INT AUTO_INCREMENT PRIMARY KEY,
        description TEXT,
        title VARCHAR(20) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        posted_by INT NOT NULL,
        is_sold BOOLEAN DEFAULT FALSE,
        platform VARCHAR(20) NULL,
        category VARCHAR(20) NULL,
        FOREIGN KEY (posted_by) REFERENCES SELLER (seller_id) ON DELETE CASCADE,
        FOREIGN KEY (platform) REFERENCES GAME_PLATFORM (platform_name) ON DELETE SET NULL,
        FOREIGN KEY (category) REFERENCES GAME_CATEGORY (category_name) ON DELETE SET NULL
    );

-- Define REPORT_LISTING table
CREATE TABLE
    REPORT_LISTING (
        report_id INT AUTO_INCREMENT PRIMARY KEY,
        description TEXT,
        written_by INT NULL,
        written_for INT NOT NULL,
        FOREIGN KEY (written_by) REFERENCES BUYER (buyer_id) ON DELETE SET NULL,
        FOREIGN KEY (written_for) REFERENCES GAME_LISTING (listing_id) ON DELETE CASCADE
    );

-- Define WISHLIST_LISTING table
CREATE TABLE
    WISHLIST_LISTING (
        created_by INT NOT NULL,
        created_for INT NOT NULL,
        wishlist_number INT AUTO_INCREMENT PRIMARY KEY,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES BUYER (buyer_id) ON DELETE CASCADE,
        FOREIGN KEY (created_for) REFERENCES GAME_LISTING (listing_id) ON DELETE CASCADE
    );

-- Define SENDS_OFFER_TO table
CREATE TABLE
    SENDS_OFFER_TO (
        buyer INT NOT NULL,
        seller INT NOT NULL,
        offer_comment TEXT,
        PRIMARY KEY (buyer, seller),
        FOREIGN KEY (buyer) REFERENCES BUYER (buyer_id) ON DELETE CASCADE,
        FOREIGN KEY (seller) REFERENCES SELLER (seller_id) ON DELETE CASCADE
    );

-- Define TRANSACTION table
CREATE TABLE
    TRANSACTION (
        recorded_seller INT NULL,
        recorded_buyer INT NULL,
        for_listing INT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (recorded_seller, for_listing),
        FOREIGN KEY (recorded_seller) REFERENCES SELLER (seller_id) ON DELETE SET NULL,
        FOREIGN KEY (recorded_buyer) REFERENCES BUYER (buyer_id) ON DELETE SET NULL,
        FOREIGN KEY (for_listing) REFERENCES GAME_LISTING (listing_id) ON DELETE SET NULL
    );

-- Insert data into GAME_PLATFORM table
INSERT INTO
    GAME_PLATFORM (platform_name, description, icon_path)
VALUES
    (
        'PlayStation 4',
        'Sony''s 8th generation console',
        'ps4.png'
    ),
    (
        'Xbox One',
        'Microsoft''s 8th generation console',
        'xboxone.png'
    ),
    (
        'Nintendo Switch',
        'Nintendo''s 8th generation console',
        'switch.png'
    ),
    (
        'PlayStation 2',
        'Sony''s 6th generation console',
        'ps2.png'
    ),
    (
        'Xbox',
        'Microsoft''s 6th generation console',
        'xbox.png'
    ),
    (
        'Nintendo 64',
        'Nintendo''s 5th generation console',
        'n64.png'
    ),
    (
        'Sega Genesis',
        'Sega''s 4th generation console',
        'genesis.png'
    ),
    (
        'Super Nintendo',
        'Nintendo''s 4th generation console',
        'snes.png'
    );

-- Insert data into GAME_CATEGORY table
INSERT INTO
    GAME_CATEGORY (category_name, description)
VALUES
    (
        'Action',
        'Games that emphasize physical challenges, including hand-eye coordination and reaction time.'
    ),
    (
        'Adventure',
        'Games that emphasize story and exploration.'
    ),
    (
        'Role-Playing',
        'Games that emphasize character development and story.'
    ),
    (
        'Simulation',
        'Games that simulate real-world activities.'
    ),
    (
        'Strategy',
        'Games that emphasize planning and decision-making.'
    ),
    (
        'Sports',
        'Games that simulate real-world sports.'
    );

-- Queries used in backend controllers

-- Listings queries
SELECT
    GAME_LISTING.*,
    SELLER.*,
    GAME_CATEGORY.description AS category_description,
    GAME_PLATFORM.description AS platform_description
FROM GAME_LISTING
JOIN SELLER ON GAME_LISTING.posted_by = SELLER.seller_id
JOIN GAME_CATEGORY ON GAME_LISTING.category = GAME_CATEGORY.category_name
JOIN GAME_PLATFORM ON GAME_LISTING.platform = GAME_PLATFORM.platform_name
WHERE GAME_LISTING.posted_by NOT IN (SELECT target_seller FROM BAN_LIST)
 
-- Additional conditions:
-- GAME_CATEGORY.category_name = ?
-- GAME_PLATFORM.platform_name = ?
-- GAME_LISTING.title LIKE %?%
-- SELLER.username LIKE %?%
-- ORDER BY listing_id DESC

UPDATE GAME_LISTING
SET title = ?, description = ?, price = ?, platform = ?, category = ?
WHERE posted_by = ? AND listing_id = ?

DELETE FROM GAME_LISTING
WHERE listing_id = ?

-- User queries
SELECT * FROM ?? WHERE username = ? OR email = ?

SELECT * FROM BAN_LIST WHERE target_seller = ?

INSERT INTO ?? (username, email, password_hash, city) VALUES (?, ?, ?, ?)

SELECT  SELLER.username AS banned_user, SELLER.seller_id AS seller_id, MODERATOR.username AS banning_moderator
FROM BAN_LIST 
JOIN SELLER ON BAN_LIST.target_seller = SELLER.seller_id
JOIN MODERATOR ON BAN_LIST.banned_by = MODERATOR.moderator_id;

INSERT INTO BAN_LIST (banned_by, target_seller) VALUES (?, ?);

DELETE FROM BAN_LIST WHERE target_seller = ?;

UPDATE BUYER
SET email = ?, city = ?
WHERE buyer_id = ?

UPDATE SELLER
SET email = ?, city = ?
WHERE seller_id = ?

UPDATE MODERATOR
SET email = ?
WHERE moderator_id = ?

INSERT INTO SELLER_REVIEW (written_by, written_for, rating, description)
VALUES (?, ?, ?, ?)

SELECT AVG(rating) AS avg_rating
FROM SELLER_REVIEW
WHERE written_for = ?

UPDATE SELLER
SET avg_rating = ?
WHERE seller_id = ?

SELECT sr.written_by, sr.written_for, sr.review_number, sr.rating, sr.description, b.username
FROM SELLER_REVIEW sr
JOIN BUYER b ON sr.written_by = b.buyer_id
WHERE written_for = ?

SELECT b.* FROM BUYER b WHERE b.buyer_id = ?

SELECT s.* 
FROM SELLER s
LEFT JOIN BAN_LIST b ON s.seller_id = b.target_seller
WHERE b.target_seller IS NULL;

SELECT s.* 
FROM SELLER s
LEFT JOIN BAN_LIST b ON s.seller_id = b.target_seller
WHERE b.target_seller IS NULL AND s.seller_id = ?;

SELECT m.* FROM MODERATOR m WHERE m.moderator_id = ?

SELECT b.*, s.username AS banned_username
FROM BAN_LIST b
JOIN SELLER s ON b.target_seller = s.seller_id;

SELECT * FROM SELLER;

SELECT 1 FROM SELLER_REVIEW WHERE written_by = ? AND written_for = ?

INSERT INTO SELLER_REVIEW (written_by, written_for, rating, description)
VALUES (?, ?, ?, ?)

-- Offer queries
SELECT * FROM SENDS_OFFER_TO JOIN BUYER ON SENDS_OFFER_TO.buyer = BUYER.buyer_id WHERE seller = ?

INSERT INTO SENDS_OFFER_TO (buyer, seller, offer_comment) VALUES (?, ?, ?)

DELETE FROM SENDS_OFFER_TO WHERE buyer = ? AND seller = ?

-- Report queries
SELECT 1 FROM REPORT_LISTING WHERE written_by = ? AND written_for = ?

INSERT INTO REPORT_LISTING (description, written_by, written_for) VALUES (?, ?, ?)

DELETE FROM REPORT_LISTING WHERE report_id = ?

SELECT 
    RL.report_id AS reportId,
    RL.description,
    RL.written_by,
    RL.written_for,
    B.username AS written_by_username,
    S.username AS seller_username,
    S.seller_id,
    GL.title AS game_title
    FROM 
        REPORT_LISTING RL
    LEFT JOIN 
        BUYER B ON RL.written_by = B.buyer_id
    INNER JOIN 
        GAME_LISTING GL ON RL.written_for = GL.listing_id
    INNER JOIN 
        SELLER S ON GL.posted_by = S.seller_id
    WHERE RL.report_id = ?

SELECT 
    RL.report_id AS reportId,
    RL.description,
    RL.written_by,
    RL.written_for,
    B.username AS written_by_username,
    S.username AS seller_username,
    S.seller_id,
    GL.title AS game_title
    FROM 
        REPORT_LISTING RL
    LEFT JOIN 
        BUYER B ON RL.written_by = B.buyer_id
    INNER JOIN 
        GAME_LISTING GL ON RL.written_for = GL.listing_id
    INNER JOIN 
        SELLER S ON GL.posted_by = S.seller_id

-- Transaction queries
SELECT * FROM TRANSACTION JOIN SELLER ON TRANSACTION.recorded_seller = SELLER.seller_id JOIN GAME_LISTING ON TRANSACTION.for_listing = GAME_LISTING.listing_id WHERE recorded_buyer = ?

INSERT INTO TRANSACTION (recorded_seller, recorded_buyer, for_listing) VALUES (?, ?, ?)

-- Wishlist queries
SELECT 1 FROM WISHLIST_LISTING WHERE created_by = ? AND created_for = ?

INSERT INTO WISHLIST_LISTING (created_by, created_for) VALUES (?, ?)

DELETE FROM WISHLIST_LISTING WHERE created_by = ? AND created_for = ?