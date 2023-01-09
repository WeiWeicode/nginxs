<template>
    <div class="container">
      <header class="jumbotron">
        <h3>{{ content }}</h3>
      </header>
    </div>
  </template>
  
  <script>
  import UserService from "../services/user.service";
  
  export default {
    name: "Admin",
    data() {
      return {
        content: "",
      };
    },
    mounted() {
      UserService.getAdminBoard().then(
        // userService.getAdminBoard(): 取得/services/user.service getAdminBoard的內容
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
  };
  </script>