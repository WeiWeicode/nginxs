const db = require("../models");

// image upload path=路徑
const multer = require('multer');
const path = require('path');



// create mini model

const Product = db.products;
const Review = db.reviews;

// main work

// create product

const addProduct = async (req, res) => {

  // let info = {
  //   // image upload path=圖片路徑 如果沒有圖片就傳送空值
  //     // image: req.file.path ? req.file.path : req.body.image,
  //     title: req.body.title,
  //     price: req.body.price,
  //     description: req.body.description,
  //     published: req.body.published ? req.body.published : false
  // }

  // 判斷有沒有圖片
  let info = {
    // image upload path=圖片路徑 如果沒有圖片就傳送空值
    image: req.file ? req.file.path : null,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  }




  const product = await Product.create(info)
  res.status(200).send(product)
  console.log(product)

}


// get all product

const getAllProducts = async (req, res) => {
  const product = await Product.findAll();
  res.status(200).send(product);
};

// get single product

const getOneProduct = async (req, res) => {

  let id = req.params.id
  let product = await Product.findOne({ where: { id: id } })
  res.status(200).send(product)

}


// update product

const updateProduct = async (req, res) => {
  let id = req.params.id;
  // const product = await Product.update(req.body, { where: { id: id } });
  // 改成form data
  if (!req.file) {
    let info = {
      // image upload path=圖片路徑 如果沒有圖片就傳送空值
      // image: req.file ? req.file.path : null,
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    }
    const product = await Product.update(info, { where: { id: id } });

    res.status(200).send(product);

  } else if (req.file) {
    let info = {
      // image upload path=圖片路徑 如果沒有圖片就傳送空值
      image: req.file ? req.file.path : null,
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    }
    const product = await Product.update(info, { where: { id: id } });

    res.status(200).send(product);

  }

  // let info = {
  //   // image upload path=圖片路徑 如果沒有圖片就傳送空值
  //   // image: req.file ? req.file.path : null,
  //   title: req.body.title,
  //   price: req.body.price,
  //   description: req.body.description,
  //   published: req.body.published ? req.body.published : false
  // }
  // const product = await Product.update(info, { where: { id: id } });

  // res.status(200).send(product);


};

// delete product

const deleteProduct = async (req, res) => {
  let id = req.params.id;
  await Product.destroy({ where: { id: id } });
  res.status(200).send("delete success");
};

// get published product

const getPublishedProduct = async (req, res) => {
  const products = await Product.findAll({ where: { published: true } });
  res.status(200).send(products);
}


// conect on to many relation Product and Review

const getProductReviews = async (req, res) => {

  const id = req.params.id

  const data = await Product.findOne({
    include: [{
      model: Review,
      as: 'review'

    }],
    where: { id: id }

  })

  res.status(200).send(data)

}


// image upload controller

const storage = multer.diskStorage({
  // DiskStorage：是一個 storage engine，透過它可以將檔案存至磁碟中。使用時，可以使用destination和filename屬性設定存取位置和檔案命名
  destination: (req, file, cb) => {
    cb(null, 'Images')
  },
  filename: (req, file, cb) => { //file=Multer的檔案 cb=檔案回呼 參考以下連結
    // https://eyesofkids.gitbooks.io/javascript-start-from-es6/content/part4/callback.html
    cb(null, Date.now() + path.extname(file.originalname)) // 檔案名稱=時間+副檔名
  }
})
const upload = multer({
  storage: storage,
  limits: { fileSize: '10000000' }, // 最大10mb
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/ // 檔案類型
    const mimeType = fileTypes.test(file.mimetype) // mimetype	文件的 MIME 类型(jpeg jpg png gif之類的)
    const extname = fileTypes.test(path.extname(file.originalname))
    // extname = 文件類型 path.extname() 方法返回文件路徑的擴展名。 originalname	用户计算机上的文件的名称

    if (mimeType && extname) { // &&=and
      return cb(null, true) // 檔案類型正確
    }
    cb('Give proper files formate to upload') // 顯示成功訊息
  }
}).single('image') // image=前端傳來的檔案名稱 對應models\productModel.js的image




module.exports = {
  addProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  getPublishedProduct,
  getProductReviews,
  upload
}