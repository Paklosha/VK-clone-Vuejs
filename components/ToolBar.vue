<template>
     <div>
    <v-app-bar
      color="#4a76a8"
      dense
      dark
    >
      <nuxt-link to="/">
        <v-icon>fab fa-vk</v-icon>
        <span class="pl-5 font-weight-medium stayHome">#stayhome</span>
      </nuxt-link>
      <v-col cols="8"  sm="5" md="4" lg="3" class="qwerty">
                
      <v-text-field
      placeholder="Search"
      height="30"
      style="font-size:5px;"
      color="#7ab4f5"
      rounded
      prepend-inner-icon="fas fa-search small"
      class="pt-5 ml-10 subtitle-2 blue--text"
        @focus="changeColor('#FFFFFF')"
        @blur="changeColor('#224B7A')"
        :background-color="color"
      ></v-text-field>
        </v-col>
       

      
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
        color : '#224B7A'
    };
},
methods: {
    changeColor: function (color) {
      this.color = color
    }
  }
};
</script>
<style>
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