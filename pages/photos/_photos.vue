<template>

    <v-card
      class="d-flex justify-center container"
      flat
      tile
    >
  
      <v-card
        class="general"
        outlined
        tile
      >
    
      <ul class="no-bullets mr-11">
        <li>
          <NuxtLink :to="'/'+loggedInUser._id">
          <v-icon color="#99b0c6">fas fa-house-user</v-icon>
          <span style="color: #4f759a;margin-right:5px;margin-right:5px;">My profile</span>
          </NuxtLink>
        </li>
        <li>
          <v-icon color="#99b0c6">fas fa-newspaper</v-icon>
          <div class="my-space-between">
            <span style="margin-left:4px;">News</span>
            <span class="notification"
                  v-bind:class="{'d-none': notifications.news == 0}">
              {{notifications.news}}
            </span>
          </div>
        </li>
        <li>
          <v-icon>fas fa-envelope</v-icon>
          <div class="my-space-between">
            <span style="margin-left:7px;">Messenger</span>
            <span class="notification"
            v-bind:class="{'d-none': notifications.messages == 0}">
              {{notifications.messages}}
            </span>
          </div>
        </li>
        <li>
          <v-icon color="#99b0c6" >fas fa-user-friends</v-icon>
          <div class="my-space-between">
            <span style="margin-left:2px;">Friends</span>
            <span class="notification"
            v-bind:class="{'d-none': notifications.friends == 0}">
              {{notifications.friends}}
            </span>
          </div>
        </li>
        <li>
          <NuxtLink :to="'/photos/'+loggedInUser._id">
          <v-icon color="#99b0c6">fas fa-images</v-icon>
             <span style="margin-left:1px;color: #4f759a;">Photos</span>
          </NuxtLink>
        </li>
        <li>
          <v-icon color="#99b0c6">fas fa-music</v-icon>
            <span style="margin-left:6px;">Music</span>
        </li>
      </ul>
       
      </v-card>

    <v-card class="white photos-container">
        <v-card-title class="photos-title">
        <span class="title">
            My photos
            <span id="number-of-photos">{{numberOfPhotos}}</span>
        </span>
      </v-card-title>
    </v-card>

  
    </v-card>
  
</template>

<script>

import { mapGetters } from 'vuex'
import { mapState } from 'vuex'
export default {
   layout: "profile",
  methods:{
     openFullUserInfo: function (){
       if(this.hideShowUserInfoBtn == 'Show full information'){
         this.InfoIsActive = true
         this.hideShowUserInfoBtn = 'Hide full information'
       }else{
         this.hideShowUserInfoBtn = 'Show full information'
         this.InfoIsActive = false
       }
     },

  },
    computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  head() {
    return {
      title: `My profile`,
    };
  },
  async asyncData(context) {

    //get the number of notifications
       let notifications = await context.app.$axios.$post('/getNotifications', {id: context.store.state.auth.user._id})
       // get the number of user's photos
       let numberOfPhotos = await context.app.$axios.$post('/getNumberOfPhotos', {id: context.store.state.auth.user._id})
      return {notifications,numberOfPhotos}

},
    data: function () {
    return {
     isLoader: false,
     uploadPhotoDialog: false,
     statusDialog: false,
     isLiked: true,
     hideShowUserInfoBtn: 'Show full information',
     isStatusChanging: false,
     InfoIsActive: false
    }
  },
  middleware: 'notLoggedIn'
};
</script>

<style scoped>



#number-of-photos{
  color: #939393;
  font-size: 14px;
  padding-left: 3px;
}

.photos-container{
  width: 800px;
}
.photos-title{
  background-color: #FAFBFC;
  border-bottom: #E7E7EC 1px solid;
  height: 60px;
  
}
.title{
  color: black;
  font-size: 16px !important;
  font-weight: normal;
}

.my-space-between{
display: flex;
justify-content: space-between;
width: 100%;
}

.notification{
  background-color: #D3D9DE;
  padding: 0px 6px 1px 6px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
  align-items: center;
  height: 80%;
  
}

.v-icon{
  margin-right: 10px;
  font-size: 20px;
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
ul.no-bullets > li{
  padding-bottom: 7px;
  padding-top: 7px;
  padding-left: 5px;
  width: 150px;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
}
ul.no-bullets > *:hover{
  background-color: #dce1e6;
  cursor: pointer;
  border-radius: 3px;
}
ul.no-bullets > *:hover + .notification{
  height: 100%;
}




#a:hover + #b {
    background: #ccc
}
.container{
  width: 1020px;
  min-width: 1020px;
  padding: 0;
  margin-top: 20px;
  background:#EDEEF0;
  padding-left: 18px;
}
.general{
  font-size: 14px;

  min-width: 180px;
  background:#EDEEF0;
  color: #4f759a;
}









</style>