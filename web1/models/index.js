const dbConfig = require("../config/dbConfig.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
}
);

// sequelize.authenticate 測試連線
sequelize.authenticate()
    .then(() => {
        console.log("連線成功");
    })
    .catch(err => {
        console.log("連線失敗" + err);
    })

const db = {}
// 初始化

db.Sequelize = Sequelize;
db.sequelize = sequelize;
//隔離函數 大小寫

// table = 路徑 DataTypes數據類型
db.products = require('./productModel.js')(sequelize, DataTypes)
db.reviews = require('./reviewModel.js')(sequelize, DataTypes)

db.orders = require('./orderModel.js')(sequelize, DataTypes)
db.orderproducts = require('./orderproductModel.js')(sequelize, DataTypes)

// force: false = 不會刪除現有資料表 true = 會刪除現有資料表
db.sequelize.sync({ force: false })
    .then(() => {
        console.log("同步成功");
    })

// 1 to many relation 一對多關聯

db.products.hasMany(db.reviews, {
    foreignKey: 'product_id',
    as: 'review'
})

db.reviews.belongsTo(db.products, {
    foreignKey: 'product_id',
    as: 'product'
})


db.orders.hasMany(db.orderproducts, {
    foreignKey: 'order_id',
    as: 'orderproduct'
})
db.orderproducts.belongsTo(db.orders, {
    foreignKey: 'order_id',
    as: 'order'
})


module.exports = db;