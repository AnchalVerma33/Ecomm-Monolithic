const { ProductController } = require('../controllers');

module.exports = (app) => {
  const productController = new ProductController();

  app.post('/create', productController.createProduct);

  app.get('/findProduct', productController.findProduct);

  app.get('/productList', productController.productList);

  app.get('/getprod/:productID', productController.findProductById);

  app.put('/updateProd/:productID', productController.updateProduct);

  app.delete('/deleteProd/:productID', productController.deleteProduct);
};
