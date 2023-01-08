const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// singup 註冊
exports.signup = (req, res) => {
  // exports 直接導出
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
    // bcrypt.hashSync 密碼加密
  })  
  // bcrypt 是一個幫助你 hash 密碼的函式庫。
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
              // 這裡的 req.body.roles 是一個陣列，例如 ["admin", "moderator", "user"]。
            }
          }
        // 取得所有角色(寫入資料庫的角色name)。
        // roles = table名稱
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
        // setRoles 設置角色        
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
        // setRoles [1] 預設角色(user)
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// singin 登入
exports.signin = (req, res) => {
  // exports 直接導出
  User.findOne({
    where: {
      username: req.body.username
    }
    // 取得使用者名稱
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      // 找不到使用者名稱
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      // bcrypt.compareSync 比較密碼是否相同

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }      
      // 密碼錯誤

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      // jwt.sign 產生 token 暫時
      // expiresIn: 86400 24小時 token 過期

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        // 寫入多個角色
        // getRoles 取得角色名稱 => 迴圈
        // authorities.push("ROLE_" + roles[i].name.toUpperCase()); => 寫入角色名稱
        // toUpperCase() 方法會將字串轉換為大寫。
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
        // 寫入使用者資料
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};