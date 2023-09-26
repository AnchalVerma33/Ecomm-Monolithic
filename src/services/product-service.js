const { ProductRepository } = require("../database/repository");
const { APIError } = require("../utils/errors/app-errors");
const { GenerateUUID, FilterValues } = require("../utils/helpers");

class ProductService{
    constructor(){
        this.repository  = new ProductRepository();
    }


    async Add (data){
        try{
            const { productName, price, quantity, productImage, productDescription} = data;
            FilterValues(
                [
                    productName,
                    price,
                    quantity
                ],
                [null, ""],
                data
            );
            const productID = GenerateUUID();
            const newProd = await this.repository.Create(
                {
                    productID,
                    productName,
                    price,
                    quantity,
                    productImage,
                    productDescription
                })
            return newProd;
        } catch(e) {
            throw new APIError(e, e.statusCode);
        }
    }

    async Find(filters){
        try{
            return this.repository.GetAll(filters);
        } catch(e) {
            throw new APIError(e, e.statusCode);
        }
    }

    async prodList(filters){
        try{
            return await this.repository.ProductList(filters);
        }catch(e){
            throw new APIError(e, e.statusCode);
        }
    }

    async FindOne(filters){
        try{
            return await this.repository.GetOne(filters);
        } catch(e) {
            throw new APIError(e, e.statusCode);
        }
    }

    async Update (id,updates){
        try{
            // if('quantity' in updates){
            //     const data = await this.repository.GetOne({ productID : id });
            //     const newQuantity = data.quantity + updates.quantity ; 
            //     updates.quantity = newQuantity;
            // }
            return await this.repository.Update(id, updates);
        } catch(e) {
            throw new APIError(e, e.statusCode);
        }
    }

    async Delete(filters){
        try{
            return await this.repository.Delete(filters);
        } catch(e) {
            throw new APIError(e, e.statusCode);
        }
    }

}

module.exports = ProductService;