const dotenv = require("dotenv");
dotenv.config({ path: ".env" });


const config = {
	APP_SECRET: process.env.APP_SECRET,
	PORT: process.env.PORT,
	DB_HOST: process.env.DBHOST,
	DB_USERNAME: process.env.DBUSERNAME,
	DB_PASSWORD: process.env.DBPASSWORD,
	DB_NAME: process.env.DBNAME,
	DB_PORT: process.env.DBPORT,
	REDIS_PORT : process.env.REDIS_PORT,
	REDIS_HOST : process.env.REDIS_HOST,
	EMAIL_PASS : process.env.EMAIL_PASS
};

module.exports = config;