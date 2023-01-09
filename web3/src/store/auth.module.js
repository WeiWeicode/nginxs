import AuthService from '../services/auth.service';

// state: 狀態, 用來存放user資料
// actions: 用來觸發mutations中的方法，可以包含任意異步操作
// mutations: 用來定義狀態的變更，必須是同步函數
// Promise: 一個表示非同步運算的最終完成或失敗的物件

const user = JSON.parse(localStorage.getItem('user'));
// json.parse() 方法用於將一個 JSON 字符串轉換為對象。
// localStorage: 用於在瀏覽器中存儲數據的一種方法
// getItem(): 返回指定 key 的本地存儲的值

const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };
// initialState: 狀態的初始值
// ?{status: {loggedIn: true}, user}: 如果user存在，就把status.loggedIn設為true，否則設為false
// :{status: {loggedIn: false}, user: null}: 如果user不存在，就把status.loggedIn設為false，user設為null

export const auth = {
  namespaced: true,
  //   namespaced: true, 使模塊具有命名空間，這樣可以避免不同模塊之間的命名衝突

  state: initialState,
  //   state: 狀態, 用來存放資料

  actions: {
    login({ commit }, user) {
      // login: 登入
      // commit: 提交
      // user: 帳號密碼

      return AuthService.login(user).then(
        // 調用AuthService中的login方法,user到本地儲存

        user => {
          commit('loginSuccess', user);

          return Promise.resolve(user);
          //   Promise.resolve: 返回一個"成功"的promise對象
        },
        error => {
          commit('loginFailure');

          return Promise.reject(error);
          //   Promise.reject: 返回一個"失敗"的promise對象
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    // 調用AuthService中的logout方法,移除JWT本地儲存

    register({ commit }, user) {
      // register: 註冊
      return AuthService.register(user).then(
        // AuthService.register(user): 調用services/Auth.Service.js中的register方法,user到本地儲存
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
          // 註冊成功 promise.resolve反應成功  

        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
          // 註冊失敗 promise.reject反應失敗

        }
      );
    }
  },
  mutations: {
    // mutations: 用來定義狀態的變更，必須是同步函數

    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    // loginSuccess: 登入成功

    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    // loginFailure: 登入失敗

    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    // logout: 登出

    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    // registerSuccess: 註冊成功

    registerFailure(state) {
      state.status.loggedIn = false;
    }
    // registerFailure: 註冊失敗
  }
};