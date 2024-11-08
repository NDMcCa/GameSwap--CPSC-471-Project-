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