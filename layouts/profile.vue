<template>
  <v-app
    dark
    style="background:#EDEEF0;"
  >
    <profileToolbar />
       <nuxt />
  </v-app>
</template>

<script>
import profileToolbar from "@/components/profileToolbar";

export default {
  name: "ProfileLayout",
  components: {
    profileToolbar
  },
};
</script>