import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import productsHome from "./components/productsHome.vue";
// lazy-loaded
const Profile = () => import("./components/Profile.vue")
const BoardAdmin = () => import("./components/BoardAdmin.vue")
const BoardModerator = () => import("./components/BoardModerator.vue")
const BoardUser = () => import("./components/BoardUser.vue")
const Payment = () => import("./components/package/Payment.vue")
const PayPage = () => import("./components/package/PayPage.vue")
const Order = () => import("./components/package/Order.vue")
const Addproducts = () => import("./components/moderatorpackage/Addproducts.vue")
const Showproducts = () => import("./components/moderatorpackage/Showproducts.vue")
// const Updataproducts = () => import("./components/moderatorpackage/Updataproducts.vue")

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },

  {
    path: "/productsHome",
    component: productsHome,
  },

  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/admin",
    name: "admin",
    // lazy-loaded
    component: BoardAdmin,
  },
  {
    path: "/mod",
    name: "moderator",
    // lazy-loaded
    component: BoardModerator,
  },
  {
    path: "/user",
    name: "user",
    // lazy-loaded
    component: BoardUser,
  },

  {
    path: "/payment",
    name: "payment",

    component: Payment,
  },

  {
    path: "/paypage",
    name: "paypage",

    component: PayPage,
  },

 {
    path: "/myorder",
    name: "myorder",

    component: Order,

 },

 {
    path: "/addproducts",
    name: "addproducts",
    component: Addproducts,
 },

  {
    path: "/showproducts",
    name: "showproducts",
    component: Showproducts,
  },

  




];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
// router: 路由
// createRouter: 創建路由
// createWebHistory: 創建Web歷史記錄


router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
// beforeEarch: 路由守衛
// to: 要去的路由
// from: 來自哪個路由
// next: 跳轉到哪個路由
// publicPages: 公共頁面
// authRequired: 需要驗證的頁面
// loggedIn: 登入的頁面

//   // trying to access a restricted page + not logged in
//   // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
  // authRequired && !loggedIn: 需要驗證的頁面 + 沒有登入
  // next('/login'): 跳轉到登入頁面
});

export default router;