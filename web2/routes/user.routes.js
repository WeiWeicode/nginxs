const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
// controllers是引入user.controller.js

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

  app.get("/api/test/all", controller.allAccess);
  // 所有人都可以訪問

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],    
    controller.userBoard
  );
  // 登入的使用者可以訪問

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );
  // 版主可以訪問

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  // 管理者可以訪問
};