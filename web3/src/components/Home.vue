<template>
  <div class="container">
    <header class="jumbotron">
      <h2>{{ content }}</h2>
      
    </header>
    <!-- <Card></Card> -->
  </div>
</template>
  
<script>
import UserService from "../services/user.service";
import Card from "./package/Card.vue";
// 引用services/user.service.js
// import AxiosAPI from "../APIurl/AxiosAPI.js";
import AxiosAPI from "../APIurl/axiosAPI.js";

export default {
  name: "Home",
  components: {
    Card,
  },
  data() {
    return {
      content: "",
      
    };
  },
  mounted() {
    UserService.getPublicContent().then(
      // userService.getPublicContent(): 取得/services/user.service getPublicContent公開的內容
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
      // 取得AxiosAPI.getPublicAPIurl的文字
    
    
  },
};
</script>