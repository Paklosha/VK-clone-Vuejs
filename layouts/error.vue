<template>
  <v-app>
<body class="error-container">
<a class="error-link" href="https://vk.com/"></a>
</body>
  </v-app>
</template>

<script>
export default {
  name: "ErrorLayout",
};
</script>
<style scoped>
.error-container{
  background: #3f5d81 url(../assets/error404.png) no-repeat 50% 50%;
  width: 100%;
  height: 100%;
  overflow: hidden; 
  margin: 0px;
}
.error-link{
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -265px -345px 0px; 
  height: 530px;
  width: 690px;
}
</style>