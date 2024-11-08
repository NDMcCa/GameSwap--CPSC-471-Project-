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