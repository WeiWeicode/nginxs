<template>
    <div class="container">
      <header class="jumbotron">
        <h3>
          <strong>{{currentUser.username}}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong>
        {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
      </p>
      <p>
        <strong>Id:</strong>
        {{currentUser.id}}
      </p>
      <p>
        <strong>Email:</strong>
        {{currentUser.email}}
      </p>
      <strong>Authorities:</strong>
      <ul>
        <li v-for="role in currentUser.roles" :key="role">{{role}}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Profile',
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
      // currentUser: 取得目前使用者的資料
      // $store.state.auth.user: 取得目前使用者的資料
    },
    mounted() {
      if (!this.currentUser) {
        this.$router.push('/login');
      }
      // 如果沒有目前使用者的資料，則導向「登入」頁面
    }
  };
  </script>