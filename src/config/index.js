const dotenv = require("dotenv");
dotenv.config({ path: ".env" });


const config = {
	PORT: process.env.PORT,
	DB_HOST: process.env.DBHOST,
	DB_USERNAME: process.env.DBUSERNAME,
	DB_PASSWORD: process.env.DBPASSWORD,
	DB_NAME: process.env.DBNAME,
};

module.exports = config;