CREATE TYPE condition AS ENUM (
    'Excellent',
    'Good',
    'Acceptable',
    'Worse'
);

CREATE TYPE stage as ENUM (
    'stage1',
    'stage2',
    'published'
);

CREATE TABLE advertises (
    advertise_id serial PRIMARY KEY NOT NULL,
    advertise_user_id int NOT NULL,
    advertise_title varchar(255) NOT NULL,
    advertise_description text NOT NULL,
    advertise_price numeric(10,2) NOT NULL,
    advertise_condition condition NOT NULL,
    advertise_category_id int,
    advertise_latitude numeric(9,6),
    advertise_longitude numeric(9,6),
    advertise_timestamp timestamp default now() NOT NULL,
    advertise_sold boolean DEFAULT false NOT NULL,
    advertise_city_id integer,
    advertise_stage stage,
    CONSTRAINT fk_advertise_categoryid
    FOREIGN KEY (advertise_category_id)
    REFERENCES categories(category_id) ON DELETE SET NULL,
    CONSTRAINT fk_advertise_cityid FOREIGN KEY (advertise_city_id)
    REFERENCES cities(city_id) ON DELETE SET NULL,
    CONSTRAINT fk_advertise_userid FOREIGN KEY (advertise_user_id)
    REFERENCES users(user_id) ON DELETE CASCADE
);
