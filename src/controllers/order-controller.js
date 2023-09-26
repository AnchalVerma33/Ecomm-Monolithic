const { RedisUtils } = require("../database/cache");
const { OrderService } = require("../services");

class OrderController{
    constructor(){
        this.servcie = new OrderService();
        this.redis = new RedisUtils();
    }

    initiateOrder =  async(req,res,next) => {
        try {
            const { productData } = req.body;
            const user = req.user;
            const data = await this.servcie.InitiateOrder({productData, user});
            return res.json({success : true, data});
        } catch (e) {
            next(e);   
        }
    }


    
}


module.exports = OrderController;

