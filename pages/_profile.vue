<template>

    <v-card
      class="d-flex justify-center container"
      flat
      tile
    >
      <div id="loader" v-show="isLoader"></div>
      <v-card
        class="menu"
        outlined
        tile
      >
    
      <ul class="no-bullets">
        <li>
          <NuxtLink :to="loggedInUser._id">
          <v-icon color="#99b0c6">fas fa-house-user</v-icon>
          <span style="color: #4f759a;">My profile</span>
          </NuxtLink>
        </li>
        <li>
          <v-icon color="#99b0c6">fas fa-newspaper</v-icon>
          <div class="my-space-between">
            <span>News</span>
            <span class="notification"
                  v-bind:class="{'d-none': notifications.news == 0}">
              {{notifications.news}}
            </span>
          </div>
        </li>
        <li>
          <v-icon>fas fa-envelope</v-icon>
          <div class="my-space-between">
            <span>Messenger</span>
            <span class="notification"
            v-bind:class="{'d-none': notifications.messages == 0}">
              {{notifications.messages}}
            </span>
          </div>
        </li>
        <li>
          <v-icon color="#99b0c6" >fas fa-user-friends</v-icon>
          <div class="my-space-between">
            <span>Friends</span>
            <span class="notification"
            v-bind:class="{'d-none': notifications.friends == 0}">
              {{notifications.friends}}
            </span>
          </div>
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
      >
            <v-dialog
               v-model="uploadPhotoDialog"
               width="650px"
               height="300px"
               style="overflow: hidden;"
            >
                <template v-slot:activator="{ on, attrs }">
                  <div class="avatar-container">
                 <img 
                  src="~/assets/avatar.png"
                  alt=""
                  class="profilePhoto"
                  v-bind="attrs"
                  v-on="on"
                 >
                 <span v-bind="attrs" v-on="on" >Upload a profile photo</span>
                 </div>
               </template>
            
               <v-card class="white">
        <v-card-title class="headline lighten-2 upload-photo-title" style="background-color:#edeef0;">
          Upload new photo
        </v-card-title>

        <div class="upload-photo-text">
        Please upload a real photo of yourself so your friends can recognize you.
                          We support JPG, GIF or PNG files.
        </div>
        
            <input type="file" 
                   name="file" 
                   id="myFileInput" 
                   v-on:change="upload($event)" 
                    />
            <button class="send-file-btn"
             type="button" 
             onclick="document.getElementById('myFileInput').click()"
            @click="uploadPhotoDialog = false"
            >
            Select file
            </button>
         
        <v-divider class="grey lighten-2"></v-divider>

        <v-card-actions style="background-color:#FAFBFC;">
          <v-spacer></v-spacer>
          <span class="upload-photo-bottom">
            If you have any problems with your upload, try using a smaller picture.
          </span>
        </v-card-actions>
      </v-card>
            </v-dialog>
      </v-card>

       <v-card
        class="pa-2 info d-flex flex-column"
        outlined
        tile
      >
        <div class="d-flex flex-row justify-space-between">
          <h1 class="username">{{publicUser.firstname +' '+publicUser.lastname}}</h1>
          <span class="status">Last seen 10 minutes ago</span>
        </div>
        
          <span class="status-message" @click="changeStatus()">
            set a status message</span>

        <hr class="divider">

        <div class="d-flex flex-column justify-start info-about-user">
          <span class="">information is not specified</span>
        </div>
        <button class="show-info-btn" @click="openFullUserInfo()">
          <span >{{hideShowUserInfoBtn}}</span>
        </button>
        <div class="user-info-container" 
          v-bind:class="{'d-flex':InfoIsActive}">
         
        <div>Personal information<hr class="separator" /></div>
          
        </div>
        <hr class="divider">
        <div class="d-flex flex-row justify-space-around data">
            <div class="data-item">
              <div class="data-item-number">21</div>
              <div class="data-item-label">mutual friends</div>
            </div>
            <div class="data-item">
               <div class="data-item-number">60</div>
              <span class="data-item-label">friends</span>
            </div>
            <div class="data-item">
               <div class="data-item-number">119</div>
              <span class="data-item-label">followers</span>
            </div>
            <div class="data-item">
               <div class="data-item-number">3</div>
              <span class="data-item-label">photos</span>
            </div>
            <div class="data-item">
               <div class="data-item-number">4</div>
              <span class="data-item-label">tags</span>
            </div>
            <div class="data-item">
               <div class="data-item-number">32</div>
              <span class="data-item-label">videos</span>
            </div>
            <div class="data-item">
               <div class="data-item-number">775</div>
              <span class="data-item-label">tracks</span>
            </div>
        </div>

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
     changeStatus: function (){

     },
      upload(event){
    //enabling loader
    this.isLoader = !this.isLoader
    let data = new FormData();
    let file = event.target.files[0];

    data.append('userId', this.$store.state.auth.user._id)
    data.append('file', file)

    let config = {
      header : {
       'Content-Type' : 'multipart/form-data'
     }
    }

    this.$axios.post('/uploadPhoto', data, config).then(() => window.location.reload(true))
  }
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
    //get amount of notifications
       let notifications = await context.app.$axios.$post('/getNotifications', {id: context.store.state.auth.user._id})
 
    try{   
      var publicUser = await context.app.$axios.$post('/getPublicUserById', {id: context.route.params.profile})
    }catch(error){
      return context.error({ statusCode: 404, message: error.message })
    }

      let isCurrentUserProfile = context.store.state.auth.user._id == context.route.params.profile ? true : false

      return {publicUser,isCurrentUserProfile,notifications}

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
#loader {
  border: 16px solid #d9e2e9;
  border-radius: 50%;
  border-top: 16px solid #4a76a8;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  position: fixed;
  margin: 25vh auto;
  z-index: 1;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}





#myFileInput {
    display:none;
}
.send-file-btn{
  height: 30px;
  width: 170px;
  background-color: #5281b8;
  margin: 0 auto 40px auto;
  display: block;
  border-radius: 4px;
  font-size: 13px;
  border: none;
  outline:none;
}
.send-file-btn:active{
  padding-top:2px ;
}
.upload-photo-title{
  color: #000000;
  font-size: 14px !important;
}
.upload-photo-text{
  color: #000000;
  font-size: 14px;
  margin: 40px auto 40px auto;
  width: 450px;
  text-align: center;
}
.upload-photo-bottom{
  color: #000000;
  position: relative;
  margin-right: 110px;
  font-size: 13px;
  margin-top: 5px;
  margin-bottom: 5px;
}
.v-application .pa-2[data-v-6e8758e3] {
    padding: 15px!important;
}
.avatar-container {
    position: relative;
    color: #2A5885;
    font-size: 12.5px;
}
.avatar-container span:hover {
    cursor: pointer;
    text-decoration: underline;
}
.avatar-container span {
    position: absolute;
    right:38px;
    top: 160px;

}
.notification{
  background-color: #D3D9DE;
  padding: 0px 6px 1px 6px;
  font-size: 12px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
}
.my-space-between{
display: flex;
justify-content: space-between;
width: 100%;
}
.statusBLock{
  background-color: white;
}
.v-dialog__content {
align-self: flex-end;
}
.separator{
  display:inline-block; 
  width:369px;
  margin-left: 10px;
  margin-bottom: 2px;
}

.data{
  margin-top: 10px;
  margin-bottom: 20px;
}
.data-item{
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 35px;
}
.data-item:hover > .data-item-label{
  color: #2A5885;
}
.data-item-label{
  height: 13px;
font-size: 13px;
color: #828282;
}
.data-item-number{
  margin: auto;
 
font-size: 19px;
color: #2A5885;

}
.user-info-container{
  display: none;
  font-size: 14px;
  margin: 20px 20px 20px 20px;
}
.info-about-user{
  margin: 20px 20px 10px 20px;

  color: #939393;
  font-size: 14px;
}
.divider{
  margin-left: 20px;
  margin-right: 20px;
  background-color: #f8f8f9;
  margin-top: 10px;
}
#likeBtn{
  cursor: pointer;
  margin-left: 15px;
}
.nameAndDate{
font-size: 13px;
font-weight: 500;
}
#infoCol{
  height: 80vh;
}

.username{
    display: block;
    margin-left: 20px;
    margin-top: 20px;
    font-size: 19px;
    line-height: 25px;
    font-weight: 400;
}
.status{
  margin-right: 20px;
  margin-top: 20px;
  color: #939393;
  font-size: 14px;
}
.status-message:hover{
  background:#EDEEF0;
  cursor: pointer;
}
.show-info-btn{
  margin-right: 20px;
  margin-left: 20px;
  color: #4a76a8;
  font-size: 14px;
  height: 30px;
}
.show-info-btn:hover{
    background:#EDEEF0;
  cursor: pointer;
}
.show-info-btn:focus{
    outline: none;
    border: none;
}
.status-message{
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 4px;
    color: #939393;
  font-size: 14px;
}
.v-application .pa-2 {
    padding: 0px!important;
}
.profilePhoto{
  width: 200px;
  min-width: 200px;
  height: 200px;
      display:block;
    margin:auto;

}
.profilePhotoSmall{
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-top: 5px;
  margin-left: 15px;
}
.profilePhotoDialog{
height: 80vh;
width: 89vh;
}
.v-icon{
  margin-right: 10px;
  width: 27px;
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
  margin-bottom: 10px;
  width: 150px;
  display: flex;
  flex-direction: row;
}
ul.no-bullets > *:hover{
  background-color: #dce1e6;
  cursor: pointer;
  border-radius: 3px;
}
.container{
  width: 1020px;
  min-width: 1020px;
  padding: 0;
  margin-top: 20px;
  background:#EDEEF0;
  padding-left: 18px;
}
.menu{
  font-size: 14px;

  min-width: 180px;
  background:#EDEEF0;
  color: #4f759a;
}

.photo{
    display: flex;
  align-items: center;
  width: 230px;
  height: 230px;
  background-color: #ffffff;
 
  margin-right: 35px;
  min-width: 230px;
}
.info{
  color: #000000;
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