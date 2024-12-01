-- Password for all of these users is '123'
INSERT INTO
    SELLER (seller_id, password_hash, email, city, username)
VALUES
    (
        1,
        '$2b$10$9HDOA8kaxoo0aRWV5yoAbepbrPZTFArVeQHy9mSTdTgCgA9tJFQA2',
        'test@test.com',
        'Calgary',
        'defaultseller'
    );

INSERT INTO
    SELLER (seller_id, password_hash, email, city, username)
VALUES
    (
        2,
        '$2b$10$9HDOA8kaxoo0aRWV5yoAbepbrPZTFArVeQHy9mSTdTgCgA9tJFQA2',
        'test69@test.com',
        'Edmonton',
        'bannedseller'
    );

INSERT INTO
    BUYER (buyer_id, password_hash, email, city, username)
VALUES
    (
        1,
        '$2b$10$9HDOA8kaxoo0aRWV5yoAbepbrPZTFArVeQHy9mSTdTgCgA9tJFQA2',
        'test2@test.com',
        'Calgary',
        'defaultbuyer'
    ),
    (
        2,
        '$2b$10$9HDOA8kaxoo0aRWV5yoAbepbrPZTFArVeQHy9mSTdTgCgA9tJFQA2',
        'test69@420.com',
        'Toronto',
        'defaultbuyer2'
    ),
    (
        3,
        '$2b$10$9HDOA8kaxoo0aRWV5yoAbepbrPZTFArVeQHy9mSTdTgCgA9tJFQA2',
        'test420@69.com',
        'Vancouver',
        'defaultbuyer3'
    );

INSERT INTO
    MODERATOR (password_hash, email, username)
VALUES
    (
        '$2b$10$9HDOA8kaxoo0aRWV5yoAbepbrPZTFArVeQHy9mSTdTgCgA9tJFQA2',
        'test3@test.com',
        'defaultmod'
    );

INSERT INTO
    BAN_LIST (banned_by, target_seller)
VALUES
    (
        1,
        2
    );

-- Insert sample listings
INSERT INTO
    GAME_LISTING (
        listing_id,
        title,
        description,
        price,
        posted_by,
        platform,
        category,
        is_sold
    )
VALUES
    (
        1,
        'Halo 3',
        'The third installment of the Halo series',
        20.00,
        1,
        'Xbox',
        'Action',
        TRUE
    ),
    (
        2,
        'Super Mario 64',
        'The first 3D Mario game',
        30.00,
        1,
        'Nintendo 64',
        'Adventure',
        TRUE
    ),
    (
        3,
        'Final Fantasy VII',
        'The first 3D Final Fantasy game',
        40.00,
        1,
        'PlayStation 4',
        'Role-Playing',
        TRUE
    ),
    (
        4,
        'Super Mario World',
        'The first Mario game on the Super Nintendo',
        20.00,
        1,
        'Super Nintendo',
        'Action',
        FALSE
    ),
    (
        5,
        'Sonic the Hedgehog',
        'The first Sonic game',
        10.00,
        1,
        'Sega Genesis',
        'Action',
        FALSE
    ),
    (
        6,
        'Minecraft',
        'A sandbox game',
        20.00,
        1,
        'Xbox',
        'Adventure',
        FALSE
    );

-- Insert some sample offers
INSERT INTO
    SENDS_OFFER_TO (buyer, seller, offer_comment)
VALUES
    (1, 1, 'I will pay $15 for Halo 3'),
    (2, 1, 'I will give you 0.4332 Gen Z Quant for Super Mario 64'),
    (3, 1, 'I will give you 0.69420 Chill Guy Token for Final Fantasy VII');

-- Insert some default transactions
INSERT INTO
    TRANSACTION (recorded_seller, recorded_buyer, for_listing)
VALUES
    (1, 1, 1),
    (1, 1, 2),
    (1, 1, 3);