module.exports = (sequelize, DataTypes) => {

    const Order = sequelize.define("order", {        
        
        ord_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        ord_total: {
            type: DataTypes.INTEGER
        },
        ord_phone: {
            type: DataTypes.STRING
        },
        ord_address: {
            type: DataTypes.TEXT
        },
        ord_payment: {
            type: DataTypes.STRING
        },
        ord_byusername: {
            type: DataTypes.STRING
        },
        // byusername: 採購帳號名稱
        ord_byid: {
            type: DataTypes.INTEGER
        },
        // byid: 採購帳號id
        ord_state: {
            type: DataTypes.STRING
        },
        // 物流狀態
        ord_logistics: {
            type: DataTypes.STRING
        },
    
    })

    return Order

}