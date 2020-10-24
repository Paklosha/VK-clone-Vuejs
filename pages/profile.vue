<template>

    <v-card
      class="d-flex justify-center container"
      flat
      tile
    >
      <v-card
        class="pa-2 menu"
        outlined
        tile
      >
      <ul class="no-bullets">
        <li>
          <v-icon color="#99b0c6">fas fa-house-user</v-icon>
          <span>My profile</span>
        </li>
        <li>
          <v-icon color="#99b0c6">fas fa-newspaper</v-icon>
          <span>News</span>
        </li>
        <li>
          <v-icon>fas fa-envelope</v-icon>
          <span>Messenger</span>
        </li>
        <li>
          <v-icon color="#99b0c6">fas fa-user-friends</v-icon>
          <span>Friends</span>
        </li>
        <li>
          <v-icon color="#99b0c6">fas fa-images</v-icon>
          <span>Photos</span>
        </li>
        <li>
          <v-icon color="#99b0c6">fas fa-music</v-icon>
          <span>Music</span>
        </li>
      </ul>
       
      </v-card>
            <v-card
       
     
        class="pa-2 photo"
        outlined
        tile
      >
       
      </v-card>
            <v-card
       
     
        class="pa-2 info"
        outlined
        tile
      >
      
      </v-card>
    </v-card>
  
</template>

<script>

import { mapGetters } from 'vuex'
export default {
  layout: "profile",
    computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
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
  middleware: 'notLoggedIn'
};
</script>

<style scoped>
.v-icon{
  margin-right: 10px;
}

.fa-envelope:before {
    content: "\f0e0";
    color: #99b0c6;
}
ul.no-bullets {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
ul.no-bullets > *{
  margin-bottom: 10px;
}
ul.no-bullets > *:hover{
  background-color: #dce1e6;
  cursor: pointer;
}
.container{
  width: 1000px;
  min-width: 1000px;
  margin-top: 10px;
  background:#EDEEF0;
}
.menu{
  width: 180px;
  min-width: 180px;
  background:#EDEEF0;
  color: #4f759a;
}
.photo{
  width: 200px;
  background-color: #ffffff;
  margin-left: 16px;
  margin-right: 16px;
  min-width: 200px;
}
.info{
  width: 550px;
  min-width: 550px;
   background-color: #ffffff !important;
   border: none !important;
     flex-shrink: 0;
  flex-wrap: nowrap;
}


.v-toolbar__content{
  display: block;
  margin: 0 auto;

 
  width: 100% !important;
  max-width: 960px;
  padding: 0 !important;
  
}

.v-input__slot{
  width: 250px !important;
}

.btn--flat:hover{
background-color: red;
}
.v-list{
    padding: 0 !important;
}
.v-list-item__title{
    color:#587c9f;
}
.v-list-item:hover{
background-color: #f0f2f5;
}
.v-toolbar__content{ 
  width: 90%;
  left:  10%; 
} 

a{
  text-decoration: none;
  color: white;
}
.v-application a {
    color: white;
}
.fa-search:before {
    content: "\f002";
    font-size: 16px;
    color:#809BBA;
}

</style>