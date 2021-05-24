const path = require('path');

require('dotenv').config({
    path: path.join(__dirname, '..', '.env')
});

export const config  = {
    PORT : process.env.PORT,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
    SECRETKEY: process.env.SECRKETKEY,
    EXPIRESIN: process.env.EXPIRESIN
}