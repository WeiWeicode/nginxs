const db = require("../models");

// model
const Order = db.orders;
const Orderproduct = db.orderproducts;

// function

// add order

const addOrder = async (req, res) => {
    // 取得現在時間
    let newDate = new Date();
    // 取得年份
    let newyear = newDate.getFullYear();
    // 取得月份  
    let newmonth = newDate.getMonth() + 1;
    //日期轉換成字串 
    let newyearStr = newyear.toString();
    let newmonthStr = newmonth.toString();
    // 月份小於10補0
    if (newmonth < 10) {
        newmonthStr = "0" + newmonthStr;
    }

    let Number = Math.floor(Math.random() * 1000000000) + 1;
    // 亂數 

    let ordNumber = newyearStr + newmonthStr + Number;
    // 產生訂單編號
    req.body.ord_number = ordNumber;
    // 將訂單編號存入req.body
    let data = {
        ord_number: req.body.ord_number,
        ord_total: req.body.ord_total,
        ord_phone: req.body.ord_phone,
        ord_address: req.body.ord_address,
        ord_payment: req.body.ord_payment,
        ord_byusername: req.body.ord_byusername,
        ord_byid: req.body.ord_byid,
        ord_state: req.body.ord_state,
        ord_logistics: req.body.ord_logistics,

    }
    const order = await Order.create(data)
    res.status(200).send(order)
}

// get all order

const getAllOrders = async (req, res) => {
    const orders = await Order.findAll();
    res.status(200).send(orders);
}

// get all Orders Product 取得全部訂單與訂單商品

const getAllOrdersProduct = async (req, res) => {
    const orders = await Order.findAll({
        include: {
            model: Orderproduct,
            as: 'orderproduct'
        }

    });
    res.status(200).send(orders);
}

const getOrderProduct = async (req, res) => {
    const id = req.params.id
    const data = await Order.findOne({
        include: [{
            model: Orderproduct,
            as: 'orderproduct'
        }],
        where: { id: id }
    })
    res.status(200).send(data)
}


const getOrderProductbyid = async (req, res) => {
    const byid = req.params.byid
    const data = await Order.findAll({
        include: [{
            model: Orderproduct,
            as: 'orderproduct'
        }],
        where: { ord_byid: byid }
    })
    res.status(200).send(data)
}

const addOrderProuct = async (req, res) => {
    // 取得現在時間
    let newDate = new Date();
    // 取得年份
    let newyear = newDate.getFullYear();
    // 取得月份  
    let newmonth = newDate.getMonth() + 1;
    //日期轉換成字串 
    let newyearStr = newyear.toString();
    let newmonthStr = newmonth.toString();
    // 月份小於10補0
    if (newmonth < 10) {
        newmonthStr = "0" + newmonthStr;
    }

    let Number = Math.floor(Math.random() * 1000000000) + 1;
    // 亂數 

    let ordNumber = newyearStr + newmonthStr + Number;
    // 產生訂單編號
    // req.body.ord_number = ordNumber;
    // 將訂單編號存入req.body

    // 寫入訂單資料與訂單商品資料

    let data = {
        ord_number: ordNumber,
        ord_total: req.body.ord_total,
        ord_phone: req.body.ord_phone,
        ord_address: req.body.ord_address,
        ord_payment: req.body.ord_payment,
        ord_byusername: req.body.ord_byusername,
        ord_byid: req.body.ord_byid,
        ord_state: req.body.ord_state,
        ord_logistics: req.body.ord_logistics,
        orderproduct: req.body.orderproduct




        //     [{
        //         ord_product_id: 1,
        //         ord_product_title: 'ee',
        //         ord_product_price: 123
        //     },
        //     {
        //         ord_product_id: 2,
        //         ord_product_title: 'eeee',
        //         ord_product_price: 12345
        //     },        
        // ]
    }

    const order = await Order.create(data, {
        include: [{
            model: Orderproduct,
            as: 'orderproduct'
        }]
    })
    res.status(200).send(order)
}

// patch order
const updateOrder = async (req, res) => {
    let id = req.params.id;
    const order = await Order.update(req.body, { where: { id: id } });
    res.status(200).send(order);
}











module.exports = {
    addOrder,
    getAllOrders,
    getAllOrdersProduct,
    getOrderProduct,
    getOrderProductbyid,
    addOrderProuct,
    updateOrder
    

}