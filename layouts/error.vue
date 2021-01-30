<template>
  <v-app>
<body class="error-container" onclick='window.location.href="/"'>

</body>
  </v-app>
</template>

<script>
export default {
  name: "ErrorLayout",
};
</script>
<style scoped>
body{
  cursor: pointer;
}
.error-container{
  background: #3f5d81 url(../assets/error404.png) no-repeat 50% 50%;
  width: 100%;
  height: 100%;
  overflow: hidden; 
  margin: 0px;
}

</style>