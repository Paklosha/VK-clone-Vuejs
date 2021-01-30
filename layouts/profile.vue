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
  methods: {
    changeOnline : function(bool){
    this.$store.dispatch('changeOnline',{bool,axios:this.$axios,lastActivity:new Date()})
    },
    setupTimers : function(){
    document.addEventListener("mousemove", this.resetTimer, false);
    document.addEventListener("mousedown", this.resetTimer, false);
    document.addEventListener("keypress", this.resetTimer, false);
     
    this.startTimer();
    },
    resetTimer : function(){
          window.clearTimeout(this.timeoutId)
          this.changeOnline(true)
          this.startTimer();
    },
    startTimer: function(){
      this.timeoutId = window.setTimeout(() => this.changeOnline(false), 10000)
    }

  },
    data: function () {
    return {
      timeoutId: null
    };
    },
   beforeMount(){
      window.addEventListener('load',(e) =>{
        this.setupTimers()
        this.$store.commit('changeContentVisibility')
   
        this.changeOnline(navigator.onLine)

        window.addEventListener("online",() => this.changeOnline(true));

       window.addEventListener("offline",() => this.changeOnline(false));
      })

    },
  name: "ProfileLayout",
  
  components: {
    profileToolbar
  },
};
</script>

<style>


</style>