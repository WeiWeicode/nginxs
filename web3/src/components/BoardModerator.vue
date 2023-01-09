<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>



    </header>
  </div>

  <!-- <Addproducts></Addproducts> -->
</template>
  
<script>
import UserService from "../services/user.service";
// import Addproducts from "./moderatorpackage/Addproducts.vue";

export default {
  name: "Moderator",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    UserService.getModeratorBoard().then(
      // userService.getModeratorBoard(): 取得/services/user.service getModeratorBoard的內容
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
  },

  components: {
    // Addproducts,
  },
};
</script>