const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
// controllers是引入auth.controller.js

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    // Access-Control-Allow-Headers: 用於預檢請求，告知伺服器接下來的請求會使用哪些自定義的 HTTP 標頭
    // x-access-token: 自定義的 HTTP 標頭
    // Origin: 來源
    // Content-Type: 內容類型
    // Accept: 接受
    next();
  });
  // header http的標頭
  // 註冊
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    // 驗證註冊(中間件)驗證帳號密碼是否重複,角色是否存在
    controller.signup
    // 註冊寫入資料庫
  );
  // 登入
  app.post("/api/auth/signin", controller.signin);
};