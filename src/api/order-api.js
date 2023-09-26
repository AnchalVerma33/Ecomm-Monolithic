const { OrderController } = require("../controllers");
const { Auth } = require("../middleware/auth");

module.exports = (app) => {
    const orderController = new OrderController();

    app.post("/initiate", Auth, orderController.initiateOrder);

}