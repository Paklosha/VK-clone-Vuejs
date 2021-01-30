<template>
     <div class="nav"
     v-bind:class="{'d-none': !contentVisible }">

  <div class="middle d-flex justify-space-between">
    <div class="item">
    <div class="item">
     <nuxt-link to="/profile">
        <v-icon id="vk-logo">fab fa-vk</v-icon>
      </nuxt-link>
      
     </div>

    <div class="item" style="margin-left:110px;">
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
       </div>
<div class="item" style="margin-top:4px;"> 
  
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
</template>

<script>
import { mapGetters } from 'vuex'
import { mapState } from "vuex";
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
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
    ...mapState(["contentVisible"])
  },
methods: {
    changeColor: function (color) {
      this.color = color
    },
    async logout() {
      this.$store.commit('changeContentVisibility')
      this.$store.dispatch('changeOnline',{bool:false,axios:this.$axios,lastActivity:new Date()})
      await this.$auth.logout();
      location.replace(`${this.$url}/`)
    }
  },
  
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
  width: 100vw;
  background: #4a76a8;
  z-index: 1000;

}

.item {
  font-size: 20px;
  height: 20px;
  display: inline-block;
  flex-wrap: nowrap;
  white-space: nowrap;

}
.middle {
  margin: 0 auto;
  text-align: center;
  height: 45px;
  background: #4a76a8;
  flex-wrap: nowrap;
  white-space: nowrap;
  width: 1000px;
  min-width: 1000px;

}
.v-input__control{
  height: 10px !important;
}
.v-text-field {
    padding-top: 6px !important;
   
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
  width: 100%;
  
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
#vk-logo{
  font-size: 35px;
}
</style>