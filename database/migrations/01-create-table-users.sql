CREATE TABLE users (
    user_id serial PRIMARY KEY NOT NULL,
    user_name varchar(50) NOT NULL,
    user_phone bigint NOT NULL,
    user_status boolean DEFAULT true,
    user_email varchar(100) UNIQUE NOT NULL
);
