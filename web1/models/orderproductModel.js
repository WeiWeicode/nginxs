module.exports = (sequelize, DataTypes) => {
  const Orderproduct = sequelize.define("orderproduct", {
    ord_product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ord_product_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ord_product_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

  })

  return Orderproduct
}
