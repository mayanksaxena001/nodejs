CREATE TABLE user (
    id int NOT NULL,
    name varchar(45) NOT NULL,
    user_name varchar(20) NOT NULL,
password varchar(20) NOT NULL,
    PRIMARY KEY (ID)
);
CREATE TABLE todo (
    id int NOT NULL,
    description varchar(120) NOT NULL,
    created_date datetime DEFAULT CURRENT_TIMESTAMP,
 last_date datetime ,
owner_id int NOT NULL,
    PRIMARY KEY (ID),FOREIGN KEY(owner_id) REFERENCES user(id)
);
