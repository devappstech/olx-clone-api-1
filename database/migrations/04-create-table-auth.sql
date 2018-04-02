CREATE TYPE strategy AS ENUM (
  'Local',
  'Google',
  'Facebook'
);

CREATE TABLE auth (
    auth_id serial PRIMARY KEY NOT NULL,
    auth_user_id int NOT NULL,
    auth_type strategy NOT NULL,
    auth_password varchar(100),
    unique (auth_user_id, auth_type),
    CONSTRAINT fk_auth_userid FOREIGN KEY (auth_user_id)
    REFERENCES users(user_id) ON DELETE CASCADE
);
