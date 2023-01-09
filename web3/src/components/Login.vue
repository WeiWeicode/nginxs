<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img id="profile-img" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" class="profile-img-card" />
      <Form @submit="handleLogin" :validation-schema="schema">
        <div class="form-group">
          <label for="username">Username</label>
          <Field name="username" type="text" class="form-control" />
          <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <Field name="password" type="password" class="form-control" />
          <ErrorMessage name="password" class="error-feedback" />
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Login</span>
          </button>
        </div>

        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>
  
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
//  這個頁面有一個Form Field: username& password。我們使用VeeValidate 4.x來驗證輸入。如果存在無效字段，我們將顯示錯誤消息。
//  yup: 一個JavaScript對象驗證器和對象模式解析器。在「Submit」與「實際送出」之間，加入一個「檢核」的流程。

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  // form: 這個頁面有一個Form Field: username& password。我們使用VeeValidate 4.x來驗證輸入。如果存在無效字段，我們將顯示錯誤消息。
  // field: 用於輸入的欄位
  // errorMessage: 用於顯示錯誤訊息的元件
  // yup綁定到data/schema

  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });
    // 提醒文字 username: 必填 password: 必填

    return {
      loading: false,
      message: "",
      schema,
    };
    // loading: 是否正在載入
    // message: 顯示錯誤訊息
    // schema: yup綁定到data/schema

  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    // loggedIn: 是否已登入
    // $store.state.auth.status.loggedIn: 取得登入狀態
  },

  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
    // this.loggedIn: 判斷是否已登入
    // 我們使用 Vuex Store 檢查用戶登錄狀態：this.$store.state.auth.status.loggedIn。如果狀態是true，我們使用 Vue Router 將用戶定向到個人資料頁面：
  },
  methods: {
    handleLogin(user) {
      // 在handleLogin()函數中，我們將'auth/login'Action 派發到 Vuex Store。如果登錄成功，進入個人資料頁面，否則顯示錯誤信息。
      this.loading = true;
      // this.loading: 是否正在載入 true: 載入中

      this.$store.dispatch("auth/login", user).then(
        // this.$store.dispatch: 派發Action
        // auth/login: Action名稱
        // user: 傳入的參數        

        () => {
          this.$router.push("/profile");
        },
        // $router.push: 導向頁面
        // /profile: 頁面路徑


        (error) => {
          // error: 錯誤訊息
          this.loading = false;
          // this.loading: 是否正在載入 false: 不在載入
          this.message =
            // this.message: 顯示錯誤訊息
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>
  
<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.error-feedback {
  color: red;
}
</style>