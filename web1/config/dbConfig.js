module.exports = {
  HOST: "192.168.68.60",
  USER: "asdf0359",
  PASSWORD: "zxcv0359",
  DB: "node_sequelize_api_db",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
