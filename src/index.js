const express = require("express");
const {
	PORT
} = require("./config");
require("colors");

const { connectDB } = require("./database/connect");
const { Models, User, Product, Order, OrderItems, Cart } = require("./database/models");

const StartServer = async () => {
	try {
		const app = express();
		const dbConnection = await connectDB();
		const models = new Models(dbConnection);
        const user = new User()
        const order = new Order()
        const product = new Product()
        const orderItems  = new OrderItems()
        const cart = new Cart()
        await models.migrate(true);
		app.listen(PORT, () => {
			console.log(`Customer server running to port ${PORT}`.yellow);
			console.log(`http://localhost:${PORT}`.yellow);
		}).on("error", (err) => {
			throw new Error(err);
		});
	} catch (e) {
		console.log(e);
		process.exit(0);
	}
};

StartServer();


