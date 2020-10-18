<template>
    <div>
        <h1>My email is {{this.$store.state.auth.user}}</h1></br>
        <button @click = 'logout' style="width: 200px;heigth: 200px;background-color: green;margin-left: 100px;">Logout</button>
    </div>
</template>

<script>


export default {
  head() {
    return {
      title: `My profile`,
    };
  },
    data: function () {
    return {
     // email: localStorage.getItem('email')
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout();
    }
  },
  middleware: 'notLoggedIn'
};
</script>

<style scoped>

</style>