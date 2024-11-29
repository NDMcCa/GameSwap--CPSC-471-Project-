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
    BUYER (buyer_id, password_hash, email, city, username)
VALUES
    (
        1,
        '$2b$10$9HDOA8kaxoo0aRWV5yoAbepbrPZTFArVeQHy9mSTdTgCgA9tJFQA2',
        'test2@test.com',
        'Calgary',
        'defaultbuyer'
    );

INSERT INTO
    MODERATOR (password_hash, email, username)
VALUES
    (
        '$2b$10$9HDOA8kaxoo0aRWV5yoAbepbrPZTFArVeQHy9mSTdTgCgA9tJFQA2',
        'test3@test.com',
        'defaultmod'
    );

-- Insert sample listings
INSERT INTO
    GAME_LISTING (
        title,
        description,
        price,
        posted_by,
        platform,
        category
    )
VALUES
    (
        'Halo 3',
        'The third installment of the Halo series',
        20.00,
        1,
        'Xbox',
        'Action'
    ),
    (
        'Super Mario 64',
        'The first 3D Mario game',
        30.00,
        1,
        'Nintendo 64',
        'Adventure'
    ),
    (
        'Final Fantasy VII',
        'The first 3D Final Fantasy game',
        40.00,
        1,
        'PlayStation 4',
        'Role-Playing'
    ),
    (
        'Super Mario World',
        'The first Mario game on the Super Nintendo',
        20.00,
        1,
        'Super Nintendo',
        'Action'
    ),
    (
        'Sonic the Hedgehog',
        'The first Sonic game',
        10.00,
        1,
        'Sega Genesis',
        'Action'
    ),
    (
        'Minecraft',
        'A sandbox game',
        20.00,
        1,
        'Xbox',
        'Adventure'
    );

-- Insert some sample offers
INSERT INTO
    SENDS_OFFER_TO (buyer, seller, offer_comment)
VALUES
    (1, 1, 'I will pay $15 for Halo 3');

-- Insert some default transactions
INSERT INTO
    TRANSACTION (recorded_seller, recorded_buyer, for_listing)
VALUES
    (1, 1, 1),
    (1, 1, 2),
    (1, 1, 3);