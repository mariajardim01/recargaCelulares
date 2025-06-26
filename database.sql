-- 1. USERS
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    description VARCHAR(250) NOT NULL,
    cpf VARCHAR(12) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. CARRIERS
CREATE TABLE carriers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    code INT NOT NULL
);

INSERT INTO carriers (name, code) VALUES ('Vivo', 15), ('Tim', 41), ('Oi', 31), ('Claro', 21);

-- 3. PHONES
CREATE TABLE phones (
    id SERIAL PRIMARY KEY,
    number VARCHAR(11) NOT NULL,
    carrier_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_phones_carrier FOREIGN KEY (carrier_id) REFERENCES carriers(id) ON DELETE RESTRICT,
    CONSTRAINT fk_phones_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT unique_phone_number UNIQUE (number)
);

-- 4. RECHARGES
CREATE TABLE recharges (
    id SERIAL PRIMARY KEY,
    value NUMERIC NOT NULL,
    number_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_recharges_phones FOREIGN KEY (number_id) REFERENCES phones(id) ON DELETE RESTRICT
);
