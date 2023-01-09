import { createStore } from "vuex";
import { auth } from "./auth.module";
// createStore: 創建store

const store = createStore({
  modules: {
    auth,
  },
//   store 是一個包含了所有應用狀態的對象，你可以在這裡設置初始狀態，並且可以在這裡定義對狀態的變更。
});

export default store;