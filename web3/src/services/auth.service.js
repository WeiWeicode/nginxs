import axios from 'axios';
// 引用axios
// 引用axios和auth-header
import AxiosAPI from "../APIurl/axiosAPI.js";
// 變數 = AxiosAPI.getPublicAPIurl()
const API_URL = AxiosAPI.AuthServiceurl();


// const API_URL = 'http://localhost:8080/api/auth/';

// authService 用來處理登入login、登出logout、註冊register等相關的功能
class AuthService {
    login(user) {        
      return axios
        .post(API_URL + 'signin', {
          username: user.username,
          password: user.password
        })
        // http://localhost:8080/api/auth/signin 登入
        .then(response => {
          if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
          }
          // response.data.accessToken 存在的話，就把response.data存到localStorage
          // localStorage.setItem: 將資料存入瀏覽器的本地儲存
          return response.data;
        });
        // login: username and password 保存到JWT本地儲存
    }
  
    logout() {
      localStorage.removeItem('user');
    }
    // logout: 移除JWT本地儲存
    // localStorage.removeItem: 移除指定的localStorage
  
    register(user) {
      return axios.post(API_URL + 'signup', {
        // http://localhost:8080/api/auth/signup 註冊
        username: user.username,
        email: user.email,
        password: user.password
      });
    }
    // register: username, email and password 保存到JWT本地儲存
  }
  
  export default new AuthService();