import mysql from 'mysql';

export const connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Lamadev123',
    database: 'social'
});