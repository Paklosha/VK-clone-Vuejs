<template>
  <v-app
    dark
    style="background:#EDEEF0;"
  >
    <ToolBar />
       <nuxt />
    <Footer />
  </v-app>
</template>

<script>
import ToolBar from "@/components/ToolBar";
import Footer from "@/components/Footer";
export default {
  name: "LoginLayout",
  components: {
    ToolBar,
    Footer
  },
};
</script>
