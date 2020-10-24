<template>
     <div class="nav">

  <div class="middle">
    <div class="item">
     <nuxt-link to="/profile">
        <v-icon>fab fa-vk</v-icon>
        <span class="pl-5 font-weight-medium stayHome">#stayhome</span>
      </nuxt-link>
     </div>

    <div class="item">
      <v-text-field
      shrink
     
      placeholder="Search"
      height="30"
      style="font-size:5px;margin:0;"
      color="#7ab4f5"
      rounded
      prepend-inner-icon="fas fa-search small"
      class="ml-10 subtitle-2 blue--text"
        @focus="changeColor('#FFFFFF')"
        @blur="changeColor('#224B7A')"
        :background-color="color"
      ></v-text-field>
    </div>
       
<div class="item"> 
  <div class="myspacing">
    <v-menu offset-y class="ml-10">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          id="lowercase"
           class="btn--flat"
          color="#4a76a8"
          dark
          v-bind="attrs"
          v-on="on"
        >
          {{ loggedInUser.firstname }}
        </v-btn>
      </template>
      <v-list color="#ffffff">

        <v-list-item color="#ffffff">
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item>

        <v-list-item color="#ffffff">
          <v-list-item-title>Help</v-list-item-title>
        </v-list-item>

        <v-list-item color="#ffffff">
          <v-list-item-title @click="logout">Log out</v-list-item-title>
        </v-list-item>

      </v-list>
    </v-menu>
  </div>
  </div>
   </div> 
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
         items: [
        { title: 'Settings' },
        { title: 'Help' },
        { title: 'Log out' },
      ],
        color : '#224B7A'
    };
},
    computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
methods: {
    changeColor: function (color) {
      this.color = color
    },
    async logout() {
      await this.$auth.logout();
      this.$router.push('/')
    }
  }
};
</script>
<style scoped>
#lowercase{
  text-transform: lowercase;
  text-transform: capitalize;
}
.v-list-item{
  cursor: pointer;
}

.nav {
  display: flex;
  height: 45px;
flex-wrap: nowrap;
  align-items: center;
  white-space: nowrap;
}

.item {
  font-size: 20px;
 height: 20px;
  display: inline-block;
  flex-wrap: nowrap;
  white-space: nowrap;

}
.middle {
  flex: 1;
  text-align: center;
  height: 45px;
  background: #4a76a8;
  flex-wrap: nowrap;
  white-space: nowrap;
}
.v-input__control{
height: 10px !important;
}
.v-text-field {
    padding-top: 6px !important;
   
}
.myspacing{
  margin-left: 400px;
}

.v-input__slot{
  width: 250px !important;
  padding-bottom: 10px;
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