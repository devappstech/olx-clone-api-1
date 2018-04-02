CREATE TABLE images (
    image_id serial PRIMARY KEY NOT NULL,
    image_path varchar(255) NOT NULL,
    image_advertise_id int NOT NULL,
    CONSTRAINT fk_image_advertiseid FOREIGN KEY (image_advertise_id)
    REFERENCES advertises(advertise_id) ON DELETE CASCADE
);
