CREATE DATABASE ripepotatoes;

CREATE TABLE users(
    user_id UUID DEFAULT uuid_generate_v4(),
    user_name VARCHAR(64) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_bio TEXT,
    user_image TEXT,
    created_time TIMESTAMP NOT NULL DEFAULT NOW(),
    last_login_time TIMESTAMP,
    
    PRIMARY KEY(user_id)
);

CREATE TABLE movies(
    movie_id UUID DEFAULT uuid_generate_v4(),
    movie_url TEXT NOT NULL UNIQUE,
    PRIMARY KEY (movie_id)
);

CREATE TABLE movie_likes(
    created_time TIMESTAMP NOT NULL DEFAULT NOW(),
    movie_id UUID,
    user_id UUID,

    PRIMARY KEY (movie_id, user_id)
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE
);

CREATE TABLE movie_ratings(
    rating_id UUID DEFAULT uuid_generate_v4(),
    movie_id UUID,
    user_id UUID,
    rating_score SMALLINT NOT NULL,
    created_time TIMESTAMP NOT NULL DEFAULT NOW(),

    PRIMARY KEY (rating_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE
);
ALTER TABLE movie_ratings ADD CONSTRAINT unique_user_movie UNIQUE(movie_id, user_id);

CREATE TABLE movie_reviews(
    review_id UUID DEFAULT uuid_generate_v4(),
    movie_id UUID,
    user_id UUID,
    review_title VARCHAR(64) NOT NULL, 
    content VARCHAR(1024) NOT NULL,
    created_time TIMESTAMP NOT NULL DEFAULT NOW(),

    PRIMARY KEY (review_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE
);

CREATE TABLE review_comments(
    comment_id UUID default uuid_generate_v4(),
    content VARCHAR(512) NOT NULL,
    created_time TIMESTAMP NOT NULL DEFAULT NOW(),
    review_id UUID,
    user_id UUID,

    PRIMARY KEY (comment_id),
    FOREIGN KEY (review_id) REFERENCES movie_reviews(review_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE comment_likes (
    created_time TIMESTAMP NOT NULL DEFAULT NOW(),
    comment_id UUID,
    user_id UUID,

    PRIMARY KEY (comment_id, user_id)
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES review_comments(comment_id) ON DELETE CASCADE
);

CREATE TABLE review_likes(
    created_time TIMESTAMP NOT NULL DEFAULT NOW(),
    review_id UUID,
    user_id UUID,

    PRIMARY KEY (review_id, user_id)
    FOREIGN KEY (review_id) REFERENCES movie_reviews(review_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE follows(
    created_time TIMESTAMP NOT NULL DEFAULT NOW(),
    follower_user_id UUID,
    followed_user_id UUID,

    PRIMARY KEY (follower_user_id, followed_user_id)
    FOREIGN KEY (follower_user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (followed_user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- made some test entires
-- users
INSERT INTO users(user_name, user_email, user_password, user_bio) VALUES('admin', 'admin@gmail.com', 'admin', 'admin for the ripepotatoes site');
-- fac9e315-7580-4d5d-91a3-53ef7ba9d0c3
INSERT INTO users(user_name, user_email, user_password, user_bio) VALUES('admin1', 'admin1@gmail.com', 'admin1', 'admin1 for the ripepotatoes site');
-- 37120d6a-87f3-4b46-8320-16b0035abe61
INSERT INTO users(user_name, user_email, user_password, user_bio) VALUES('admin2', 'admin2@gmail.com', 'admin2', 'admin2 for the ripepotatoes site');
-- f3308154-c4fa-4087-b094-31a4d41f90f9

-- follows
INSERT INTO follows(follower_user_id, followed_user_id) 
    VALUES
    (
        'fac9e315-7580-4d5d-91a3-53ef7ba9d0c3',
        '37120d6a-87f3-4b46-8320-16b0035abe61'
    ),
    (
        'fac9e315-7580-4d5d-91a3-53ef7ba9d0c3',
        'f3308154-c4fa-4087-b094-31a4d41f90f9'
    ),
    (
        'f3308154-c4fa-4087-b094-31a4d41f90f9',
        'fac9e315-7580-4d5d-91a3-53ef7ba9d0c3'
    ),
    (
        '37120d6a-87f3-4b46-8320-16b0035abe61',
        'f3308154-c4fa-4087-b094-31a4d41f90f9'
    ),
    (
        '37120d6a-87f3-4b46-8320-16b0035abe61',
        'fac9e315-7580-4d5d-91a3-53ef7ba9d0c3'
    )
;

-- movies
INSERT INTO movies(movie_url) VALUES('adminmovie.com'); 
-- 4e981821-7b28-4952-af73-5f651f8e7620
INSERT INTO movies(movie_url) VALUES('adminmovie1.com');
-- 3adf2bc9-2de3-4050-984e-4cbefa37f1e6

-- movies likes
INSERT INTO comment_likes(movie_id, user_id) 
    VALUES 
    (
        '4e981821-7b28-4952-af73-5f651f8e7620',
        'fac9e315-7580-4d5d-91a3-53ef7ba9d0c3'
    ),
    (
        '4e981821-7b28-4952-af73-5f651f8e7620',
        'fac9e315-7580-4d5d-91a3-53ef7ba9d0c3'
    ),
    (
        '3adf2bc9-2de3-4050-984e-4cbefa37f1e6',
        '37120d6a-87f3-4b46-8320-16b0035abe61'
    ),
    (
        '3adf2bc9-2de3-4050-984e-4cbefa37f1e6',
        'f3308154-c4fa-4087-b094-31a4d41f90f9'
    )
;

-- movies ratings
INSERT INTO movie_ratings(rating_score, movie_id, user_id) 
    VALUES 
    (
        8,
        '4e981821-7b28-4952-af73-5f651f8e7620',
        'fac9e315-7580-4d5d-91a3-53ef7ba9d0c3'
    ),
    (
        4,
        '3adf2bc9-2de3-4050-984e-4cbefa37f1e6',
        'fac9e315-7580-4d5d-91a3-53ef7ba9d0c3'
    ),
    (
        10,
        '3adf2bc9-2de3-4050-984e-4cbefa37f1e6',
        '37120d6a-87f3-4b46-8320-16b0035abe61'
    ),
    (
        8,
        '3adf2bc9-2de3-4050-984e-4cbefa37f1e6',
        'f3308154-c4fa-4087-b094-31a4d41f90f9'
    )
;

-- reviews
INSERT INTO movie_reviews(movie_id, user_id, review_title, content) 
    VALUES
        (
            '4e981821-7b28-4952-af73-5f651f8e7620', 
            'fac9e315-7580-4d5d-91a3-53ef7ba9d0c3', 
            'admin review', 
            'admin review content'
        ),
        -- ba23299c-c7a9-46ad-98b7-ec591d425b79
        (
            '3adf2bc9-2de3-4050-984e-4cbefa37f1e6', 
            'fac9e315-7580-4d5d-91a3-53ef7ba9d0c3', 
            'admin review', 
            'admin review content'
        ),
        -- c5549144-983e-4908-bcd7-425cd6aa4234
        (
            '4e981821-7b28-4952-af73-5f651f8e7620', 
            '37120d6a-87f3-4b46-8320-16b0035abe61', 
            'admin review', 
            'admin review content'
        ),
        -- d9a50839-ac64-4b59-ad37-f8058cdaefb8
        (
            '3adf2bc9-2de3-4050-984e-4cbefa37f1e6', 
            'f3308154-c4fa-4087-b094-31a4d41f90f9', 
            'admin review', 
            'admin review content'
        )
        -- 099bf02c-9064-4a36-aa23-7d840a0c561c 
;

-- review comments
INSERT INTO review_comments(content, review_id, user_id)
    VALUES 
    (
        'admin comment',
        'ba23299c-c7a9-46ad-98b7-ec591d425b79',
        'fac9e315-7580-4d5d-91a3-53ef7ba9d0c3'
    ),
    -- 5720a82d-59f6-4ff6-b81b-0efd9cf25482
    (
        'admin1 comment',
        'ba23299c-c7a9-46ad-98b7-ec591d425b79',
        '37120d6a-87f3-4b46-8320-16b0035abe61'
    ),
    -- 8bd15f5f-c5a6-4458-a550-582376e77bae
    (
        'admin1 comment',
        'ba23299c-c7a9-46ad-98b7-ec591d425b79',
        '37120d6a-87f3-4b46-8320-16b0035abe61'
    ),
    -- 592c9869-11ee-4e88-a627-f6380648b91b
    (
        'admin2 comment',
        'd9a50839-ac64-4b59-ad37-f8058cdaefb8',
        'f3308154-c4fa-4087-b094-31a4d41f90f9'
    ),
    -- b20ccb53-0da0-4643-adaf-472752892bd7
    (
        'admin2 comment',
        'c5549144-983e-4908-bcd7-425cd6aa4234',
        'f3308154-c4fa-4087-b094-31a4d41f90f9'
    )
    -- 3b3418e5-0f1d-435e-9145-b1fdcec92e77
;

-- review likes
INSERT INTO review_likes(review_id, user_id) 
    VALUES 
    (
        'ba23299c-c7a9-46ad-98b7-ec591d425b79',
        'fac9e315-7580-4d5d-91a3-53ef7ba9d0c3'
    ),
    (
        'c5549144-983e-4908-bcd7-425cd6aa4234',
        'fac9e315-7580-4d5d-91a3-53ef7ba9d0c3'
    ),
    (
        'ba23299c-c7a9-46ad-98b7-ec591d425b79',
        '37120d6a-87f3-4b46-8320-16b0035abe61'
    ),
    (
        '099bf02c-9064-4a36-aa23-7d840a0c561c',
        'f3308154-c4fa-4087-b094-31a4d41f90f9'
    )
;

-- comment likes
INSERT INTO comment_likes(comment_id, user_id) 
    VALUES 
    (
        'b20ccb53-0da0-4643-adaf-472752892bd7',
        'fac9e315-7580-4d5d-91a3-53ef7ba9d0c3'
    ),
    (
        'b20ccb53-0da0-4643-adaf-472752892bd7',
        'fac9e315-7580-4d5d-91a3-53ef7ba9d0c3'
    ),
    (
        'b20ccb53-0da0-4643-adaf-472752892bd7',
        '37120d6a-87f3-4b46-8320-16b0035abe61'
    ),
    (
        'b20ccb53-0da0-4643-adaf-472752892bd7',
        'f3308154-c4fa-4087-b094-31a4d41f90f9'
    )
;