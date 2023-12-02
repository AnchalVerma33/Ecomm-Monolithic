const { RedisUtils } = require('../database/cache');
const { ProductService } = require('../services');

class ProductController {
  constructor() {
    this.servcie = new ProductService();
    this.redis = new RedisUtils();
  }

  createProduct = async (req, res, next) => {
    try {
      const prodDetails = req.body;
      const data = await this.servcie.Add(prodDetails);
      return res.json({ succes: true, data });
    } catch (e) {
      next(e);
    }
  };

  // find all products by name filter
  findProduct = async (req, res, next) => {
    try {
      const { productName, productID = '' } = req.body;
      const data = await this.servcie.Find({ productName, productID });
      return res.json({ success: true, data });
    } catch (e) {
      next(e);
    }
  };

  // Get Product List
  productList = async (req, res, next) => {
    try {
      const data = await this.servcie.prodList(req.query);
      return res.json({ success: true, data });
    } catch (e) {
      next(e);
    }
  };

  // find unique product by id
  findProductById = async (req, res, next) => {
    try {
      const { productID } = req.params;
      const data = await this.servcie.FindOne({ productID });
      return res.json({ success: true, data });
    } catch (e) {
      next(e);
    }
  };

  // update product
  updateProduct = async (req, res, next) => {
    try {
      const updates = req.body;
      const { productID } = req.params;
      const data = await this.servcie.Update(productID, updates);
      return res.json({ success: true, data });
    } catch (e) {
      next(e);
    }
  };

  // delete product

  deleteProduct = async (req, res, next) => {
    try {
      const { productID } = req.params;
      const data = this.servcie.Delete({ productID });
      return res.json({ scuccess: true, data });
    } catch (e) {
      next(e);
    }
  };
}

module.exports = ProductController;
