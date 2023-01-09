export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    // 取得JWT本地儲存
  
    if (user && user.accessToken) {
    //   return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
      return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    } else {
      return {};
    }
    // 訪問受保護的路由時，將JWT添加到請求的Http標頭中
    // 用nodejs 使用x-access-token標頭
  }