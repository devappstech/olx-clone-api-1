CREATE TABLE cities (
    city_id serial PRIMARY KEY NOT NULL,
    city_state_id int NOT NULL,
    city_name varchar(50) UNIQUE NOT NULL,
    CONSTRAINT fk_city_state FOREIGN KEY (city_state_id)
    REFERENCES states(state_id) ON DELETE CASCADE
);
