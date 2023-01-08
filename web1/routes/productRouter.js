// import controllers review, products
const productController = require('../controllers/productController.js');
const reviewController = require('../controllers/reviewController.js');
const orderController = require('../controllers/orderController.js');
const orderproductController = require('../controllers/orderproductController.js');

const router = require('express').Router();

// use routers
// 新增產品
router.post('/addProduct', productController.upload,  productController.addProduct)
// 新增產品與評論相關
router.post('/addOrderProductid', orderproductController.addOrderproductID)

// 訂單相關
// 批量增加訂單產品
router.post('/batchAddOrderproductID', orderproductController.batchAddOrderproductID)
// 待測試 同時寫入訂單與多筆產品
router.post('/addOrderProduct', orderController.addOrderProuct)
// 新增訂單
router.post('/addOrder', orderController.addOrder)


// 產品與評論相關
router.get('/allProducts', productController.getAllProducts)
// 取得所有上架產品
router.get('/published', productController.getPublishedProduct)

// 取得訂單
router.get('/allOrders', orderController.getAllOrders)
// 取得所有訂單產品 取定單與產品
router.get('/getAllOrdersProduct', orderController.getAllOrdersProduct)
// 取得所有訂單產品 只取產品
router.get('/allOrderProducts', orderproductController.getAllOrderproducts)


// Review Url and controller

// 上架產品與評論相關
// 取得所有評論
router.get('/allReviews', reviewController.getAllReviews)
// 上傳評論綁定產品id
router.post('/addReview/:id', reviewController.addReview)
// 取得產品評論
router.get('/getProductReviews/:id', productController.getProductReviews)

// get product review
// 訂單與產品相關
// 取得訂單id並會帶出產品
router.get('/getProductOrders/:id', orderController.getOrderProduct)
// 取得訂單購買者id並會帶出產品
router.get('/getOrderProductsUser/:byid', orderController.getOrderProductbyid)
// 上傳單筆訂單產品 綁定訂單ID
router.post('/addOrderProduct/:id', orderproductController.addOrderproduct)
// 更新訂單
router.patch('/updateOrder/:id', orderController.updateOrder)

// Products router
// 取得產品ID
router.get('/getOneProductid/:id', productController.getOneProduct)

//  更新產品ID
router.put('/updateProductid/:id', productController.updateProduct)
router.patch('/patchProductid/:id', productController.upload, productController.updateProduct)

// 刪除產品ID
router.delete('deleteProductid/:id', productController.deleteProduct)

module.exports = router;