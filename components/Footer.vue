<template>
    <v-footer
      height="80"
      padless
      class="font-weight-medium"
    >
      <v-row
        justify="space-around"
        align="center"
        class="flex-nowrap"
      > 
        <v-col
            cols="4"
         >
         <div class="content">
             <v-icon style="color:#6690C0;">fab fa-vk</v-icon>
             <v-icon style="color:#6690C0;font-size:14px;" class="ml-4 mr-1">far fa-copyright</v-icon>
             <span class="font-weight-light caption">2006-2020</span>
             </div>
         </v-col>

        <v-col
            cols="4"
         >
         <div class="content">
              <a class="font-weight-light caption">About VK</a>
               <a class="font-weight-light caption">Terms</a>
                <a class="font-weight-light caption">Developers</a>
             </div>
         </v-col>

        <v-col
            cols="4"
         >
                <div class="content">
              <a class="font-weight-light caption">Русский</a>
               <a class="font-weight-light caption">English</a>
                <a class="font-weight-light caption">All languages</a>
             </div>
         </v-col>

        </v-row>
    </v-footer>
</template>

<script>
export default {
  data() {
    return {
       
    };
},
methods: {
    
  }
};
</script>
<style scoped>
.content{
    
    display:table;
margin:0 auto;
}
.content a{
    color: #2A5885;
    padding-left:10px ;
}
.theme--dark.v-footer {
border-top: #DFE2E8 1px solid;
background-color: #EDEEF0;
color: black;
}
.v-footer font-weight-medium v-sheet v-sheet--tile theme--dark v-footer--padless{
border-top: #DFE2E8 1px solid;
background-color: #EDEEF0;
color: black;
}


</style>