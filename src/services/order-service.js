const { OrderRepository, OrderItemsRepository, ProductRepository } = require("../database/repository");
const { APIError } = require("../utils/errors/app-errors");
const { GenerateUUID } = require("../utils/helpers");


class OrderService{
    constructor(){
        this.orderRepository  = new OrderRepository();
        this.orderItemRepository = new OrderItemsRepository();
        this.productRepository = new ProductRepository();
    }

    async InitiateOrder(data){
        try {
        const { user, productData } = data;
        let productArray = productData.filter((obj) => {
            if(obj.productID && obj.quantity > 0){
                return obj;
            }
        }).map((obj) => {
            return {
                productID : obj.productID,
                quantity : obj.quantity
            }
        })  
        const dbProdData  =  await this.productRepository.ProductList({productID : productArray.map((obj) => {
            return obj.productID;
        })})

        const finalProdData = dbProdData.map((obj) => {
            return obj.dataValues;
        });

        let totalprice = 0;
        let remainingQuantity = [];
        let orderItemsList = [];

        for(let i = 0; i < productArray.length; i++){
            const id = productArray[i].productID;
            if(productArray[i].quantity > finalProdData[i].quantity){
                throw new Error(`${productArray[i].productName} is Out of Stock`);
            }
            else{
                totalprice += finalProdData[i].price * productArray[i].quantity;
                let noUnitsLeft = finalProdData[i].quantity - productArray[i].quantity;
                remainingQuantity.push({productID : id, noUnitsLeft}); 
                orderItemsList.push(
                    {
                        orderItemID : GenerateUUID(),
                        productID : id,
                        quantity : productArray[i].quantity,
                        itemPrice : finalProdData[i].price * productArray[i].quantity
                    }
                )
            }  
        }

        await this.productRepository.BulkUpdate(remainingQuantity);
        const orderID = GenerateUUID();

        const finalOrderItemsList = orderItemsList.map((obj) => ({
            ...obj, 
            objectID
          }));

        const pushOrderItems = await this.orderItemRepository.Create(finalOrderItemsList);

        const finalOrder = await this.orderRepository.Create(
            {
                orderID,
                userID : user.id,
                orderDate : new Date(),
                totalAmount : totalprice,
                orderStatus : "Initiated"
            }
        )
        return finalOrder;
        } catch (e) {
            throw new APIError(e, e.statusCode);
        }
    }  

}

module.exports = OrderService;