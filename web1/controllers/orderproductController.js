const db = require("../models");

// model
const Orderproduct = db.orderproducts;

// function

// add orderproduct

const addOrderproduct = async (req, res) => {

    const id = req.params.id

    let data = {
        order_id: id,
        ord_product_id: req.body.ord_product_id,
        ord_product_title: req.body.ord_product_title,
        ord_product_price: req.body.ord_product_price
    }

    const orderproduct = await Orderproduct.create(data)
    res.status(200).send(orderproduct)

}

// get all orderproduct

const getAllOrderproducts = async (req, res) => {
    const orderproducts = await Orderproduct.findAll();
    res.status(200).send(orderproducts);
}

// 單筆傳入手動打order_id
const addOrderproductID = async (req, res) => {

    let info = {
        ord_product_id: req.body.ord_product_id,
        ord_product_title: req.body.ord_product_title,
        ord_product_price: req.body.ord_product_price,
        order_id: req.body.order_id
    }

    const orderproducts = await Orderproduct.create(info)
    res.status(200).send(orderproducts)
    console.log(orderproducts)

}

// 多筆傳入
const batchAddOrderproductID = async (req, res) => {

    // let info = {
    //     ord_product_id: req.body.ord_product_id,
    //     ord_product_title: req.body.ord_product_title,
    //     ord_product_price: req.body.ord_product_price,
    //     order_id: req.body.order_id
    // }

    const orderproducts = await Orderproduct.bulkCreate(req.body)
    res.status(200).send(orderproducts)
    console.log(orderproducts)

}



module.exports = {
    addOrderproduct,
    getAllOrderproducts,
    addOrderproductID,
    batchAddOrderproductID

}