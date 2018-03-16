CREATE TABLE reset_password (
    reset_id serial PRIMARY KEY NOT NULL,
    reset_user_email varchar(100) NOT NULL,
    reset_token uuid NOT NULL,
    reset_timestamp timestamp DEFAULT now() NOT NULL,
    unique (reset_user_email, reset_token, reset_timestamp)
);