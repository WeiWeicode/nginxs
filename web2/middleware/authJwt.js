const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

// 驗證token
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  // header http的標頭(POSTMAN x-access-token)
  if (!token) {
    // token不存在
    return res.status(403).send({
      message: "No token provided!"
      // 未提供token
    });
  }
  

  // token存在
  jwt.verify(token, config.secret, (err, decoded) => {
    // jwt.verify 驗證token,並回傳解碼後的資料
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
      // 未授權
    }
    req.userId = decoded.id;
    // 丟到 isAdmin isModerator isModeratorOrAdmin判斷
    next();
    // next()繼續執行
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    // findByPk 依照主鍵查詢
    user.getRoles().then(roles => {
      // getRoles 取得角色
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          // 角色名稱="admin"
          next();
          // next()繼續執行
          return;
          // return 傳回
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
        // 403 禁止 需要管理員權限
      });
      return;
    });
  });
};

// 跟上面差不多 判斷是否是moderator
isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator Role!"
      });
    });
  });
};

// 跟上面差不多 判斷是否是moderator或admin
isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    // findByPk 依照主鍵查詢
    user.getRoles().then(roles => {
      // getRoles 取得角色
      for (let i = 0; i < roles.length; i++) {
        // 判斷是否是moderator或admin
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!"
        // 403 禁止 需要管理員或版主權限
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;