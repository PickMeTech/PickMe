CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       username VARCHAR(50) NOT NULL UNIQUE,
                       phone_number VARCHAR(20),
                       password VARCHAR(255) NOT NULL,
                       email VARCHAR(100) UNIQUE,
                       country VARCHAR(100),
                       birth_date DATE,
                       profile_image_url TEXT,
                       bio TEXT,
                       instagram_url TEXT,
                       telegram_username VARCHAR(100),

    -- Delivery info
                       full_name VARCHAR(100),
                       street_address TEXT,
                       city VARCHAR(100),
                       post_code VARCHAR(20),
                       post_service VARCHAR(100),

                       created_at TIMESTAMP DEFAULT now(),
                       updated_at TIMESTAMP DEFAULT now()
);
