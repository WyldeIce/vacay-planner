const pg = require('pg');
const client = new pg.Client('postgres://localhost/vacay_planner_db')

const seed = async() => {
    const SQL = `
        DROP TABLE IF EXISTS vacations;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS places;
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100)
        );
        CREATE TABLE places (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100)
        );
        CREATE TABLE vacations (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) NOT NULL,
            place_id INTEGER REFERENCES places(id) NOT NULL,
            created_at TIMESTAMP DEFAULT now()
        );

        INSERT INTO users(name) VALUES ('Morgan');
        INSERT INTO users(name) VALUES ('Kala');
        INSERT INTO users(name) VALUES ('Heather');
        INSERT INTO users(name) VALUES ('Jonas');
        INSERT INTO users(name) VALUES ('Dylan');
        INSERT INTO users(name) VALUES ('Aimee');

        INSERT INTO places(name) VALUES ('India');
        INSERT INTO places(name) VALUES ('Japan');
        INSERT INTO places(name) VALUES ('Korea');
        INSERT INTO places(name) VALUES ('Fiji');
        INSERT INTO places(name) VALUES ('Vietnam');
        INSERT INTO places(name) VALUES ('Phuket');

        INSERT INTO vacations(user_id, place_id) VALUES (
            (SELECT id FROM users WHERE name='Aimee'),
            (SELECT id FROM places WHERE name='Fiji')
        )
    `

    await client.query(SQL)
    console.log('Created tables and seeded data')
}

module.exports = {
    client,
    seed
}