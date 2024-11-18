-- Create database
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
        comment TEXT NOT NULL,
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

-- Define RESPONDS_TO table
CREATE TABLE
    RESPONDS_TO (
        moderator_id INT NULL,
        report_id INT NOT NULL,
        UNIQUE (moderator_id, report_id),
        FOREIGN KEY (moderator_id) REFERENCES MODERATOR (moderator_id) ON DELETE SET NULL,
        FOREIGN KEY (report_id) REFERENCES REPORT_LISTING (report_id) ON DELETE CASCADE
    );

-- Define TRANSACTION table
CREATE TABLE
    TRANSACTION (
        recorded_seller INT NULL,
        recorded_buyer INT NULL,
        for_listing INT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (recorded_seller, recorded_buyer, for_listing),
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

-- Reading game listings
SELECT
    *
FROM
    GAME_LISTING
    JOIN SELLER ON GAME_LISTING.posted_by = SELLER.seller_id
    JOIN GAME_PLATFORM ON GAME_LISTING.platform = GAME_PLATFORM.platform_name
    JOIN GAME_CATEGORY ON GAME_LISTING.category = GAME_CATEGORY.category_name;

-- Other variants for filtering game listing results
SELECT
    *
FROM
    GAME_LISTING
    JOIN SELLER ON GAME_LISTING.posted_by = SELLER.seller_id
    JOIN GAME_PLATFORM ON GAME_LISTING.platform = GAME_PLATFORM.platform_name
    JOIN GAME_CATEGORY ON GAME_LISTING.category = GAME_CATEGORY.category_name
WHERE
    GAME_LISTING.categoy_name LIKE 'Action';

SELECT
    *
FROM
    GAME_LISTING
    JOIN SELLER ON GAME_LISTING.posted_by = SELLER.seller_id
    JOIN GAME_PLATFORM ON GAME_LISTING.platform = GAME_PLATFORM.platform_name
    JOIN GAME_CATEGORY ON GAME_LISTING.category = GAME_CATEGORY.category_name
WHERE
    GAME_LISTING.platform LIKE 'PlayStation 4';

SELECT
    *
FROM
    GAME_LISTING
    JOIN SELLER ON GAME_LISTING.posted_by = SELLER.seller_id
    JOIN GAME_PLATFORM ON GAME_LISTING.platform = GAME_PLATFORM.platform_name
    JOIN GAME_CATEGORY ON GAME_LISTING.category = GAME_CATEGORY.category_name
WHERE
    GAME_LISTING.game_title LIKE 'The Legend of Zelda%';

SELECT
    *
FROM
    GAME_LISTING
    JOIN SELLER ON GAME_LISTING.posted_by = SELLER.seller_id
    JOIN GAME_PLATFORM ON GAME_LISTING.platform = GAME_PLATFORM.platform_name
    JOIN GAME_CATEGORY ON GAME_LISTING.category = GAME_CATEGORY.category_name
WHERE
    SELLER.username LIKE 'Anderdingus';

-- Read game categories
SELECT
    *
FROM
    GAME_CATEGORY;

-- Read game platforms
SELECT
    *
FROM
    GAME_PLATFORM;

-- Find user for login
SELECT
    *
FROM
    BUYER
WHERE
    username = 'Anderdingus'
    OR email = 'anderdingus@hotmail.com';

SELECT
    *
FROM
    SELLER
WHERE
    username = 'Anderdingus'
    OR email = 'anderdingus@hotmail.com';

SELECT
    *
FROM
    MODERATOR
WHERE
    username = 'Anderdingus'
    OR email = 'anderdingus@hotmail.com';

-- Registering a new user
INSERT INTO
    BUYER (password_hash, email, city, username)
VALUES
    (
        'somehash1',
        'ryanbuttlord@gmail.com',
        'New York',
        'RyanButtlord'
    );

INSERT INTO
    SELLER (password_hash, email, city, username)
VALUES
    (
        'somehash2',
        'coconutball@hotmail.com',
        'Los Angeles',
        'CoconutBall'
    );

-- Reports joined with listings and the buyer who wrote the report
SELECT
    *
FROM
    REPORT_LISTING
    JOIN GAME_LISTING ON REPORT_LISTING.written_for = GAME_LISTING.listing_id
    JOIN BUYER ON REPORT_LISTING.written_by = BUYER.buyer_id;

-- Transactions a buyer has made joined with the seller and listing
SELECT
    *
FROM
    TRANSACTION
    JOIN SELLER ON TRANSACTION.recorded_seller = SELLER.seller_id
    JOIN BUYER ON TRANSACTION.recorded_buyer = BUYER.buyer_id
    JOIN GAME_LISTING ON TRANSACTION.for_listing = GAME_LISTING.listing_id;

-- Transactions a seller has made joined with the buyer and listing
SELECT
    *
FROM
    TRANSACTION
    JOIN SELLER ON TRANSACTION.recorded_seller = SELLER.seller_id
    JOIN BUYER ON TRANSACTION.recorded_buyer = BUYER.buyer_id
    JOIN GAME_LISTING ON TRANSACTION.for_listing = GAME_LISTING.listing_id;

-- Reviews a seller has received joined with the buyer who wrote the review
SELECT
    *
FROM
    SELLER_REVIEW
    JOIN BUYER ON SELLER_REVIEW.written_by = BUYER.buyer_id;

-- Reviews a buyer has written joined with the seller who received the review
SELECT
    *
FROM
    SELLER_REVIEW
    JOIN SELLER ON SELLER_REVIEW.written_for = SELLER.seller_id;

-- Wishlist listings a buyer has created joined with the listing
SELECT
    *
FROM
    WISHLIST_LISTING
    JOIN GAME_LISTING ON WISHLIST_LISTING.created_for = GAME_LISTING.listing_id;

-- Offers a buyer has sent joined with the seller and the listing
SELECT
    *
FROM
    SENDS_OFFER_TO
    JOIN SELLER ON SENDS_OFFER_TO.seller = SELLER.seller_id
    JOIN BUYER ON SENDS_OFFER_TO.buyer = BUYER.buyer_id;

-- Offers a seller has received joined with the buyer and the listing
SELECT
    *
FROM
    SENDS_OFFER_TO
    JOIN SELLER ON SENDS_OFFER_TO.seller = SELLER.seller_id
    JOIN BUYER ON SENDS_OFFER_TO.buyer = BUYER.buyer_id;

-- Bans joined with the moderator who banned the seller and the seller
SELECT
    *
FROM
    BAN_LIST
    JOIN MODERATOR ON BAN_LIST.banned_by = MODERATOR.moderator_id
    JOIN SELLER ON BAN_LIST.target_seller = SELLER.seller_id;

-- Probably other queries will be used in the future or the above queries will be modified