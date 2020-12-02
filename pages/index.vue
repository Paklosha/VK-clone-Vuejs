<template>
  <v-row
    class="flex-nowrap justify-center"
  > 

        <v-snackbar
      v-model="snackbarLogin"
      top
      color="error"
    >
      <span style="font-size: 17px;">Login failed!</span>
        <v-btn
          color="#de0417"
          text
          @click="snackbarLogin = false"
        >
          Close
        </v-btn>
    </v-snackbar>
      <v-snackbar
      v-model="snackbarRegistration"
      top
      color="error"
    >
      <span style="font-size: 17px;">User with this email already exists!</span>
        <v-btn
          color="#de0417"
          text
          @click="snackbarRegistration = false"
        >
          Close
        </v-btn>
    </v-snackbar>

    

    <v-col cols="6" class="mt-10 hidden-sm-and-down">
      <h1 class="">VK for mobile devices</h1>
      <p class="mobAppText">Install our official mobile app and stay in touch
         with your friends anytime and anywhere.</p>
        <img src="~/assets/phone.png">
    </v-col>
    <v-col cols="auto" class="mt-10 mb-10">
      <v-card
        max-width="340"
        color="white"
        class="mb-10"
      >


        <v-card-text>
          <v-form
          ref="formLogin"
          @submit.prevent="submitLogin"
          >
          <v-text-field
            name="emailLogin"
            v-model="emailLogin"
            :rules="emailRulesLogin"
            placeholder="Email"
            requared
            color="#4a76a8"
            label="Email"
            prepend-inner-icon="far fa-envelope"
            single-line
            solo
            background-color="white"
          ></v-text-field>
             <v-text-field
              :append-icon="showLoginPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
              @click:append="() => (showLoginPassword = !showLoginPassword)"
              :type="showLoginPassword ? 'text' : 'password'"
              name="passwordLogin"
              v-model="passwordLogin"
              :rules="passwordRulesLogin"
              placeholder="Password"
              color="#4a76a8"
              label="Last name"
              prepend-inner-icon="fas fa-key"
              single-line
              solo
              background-color="white"
              Required
          ></v-text-field>

            <v-btn
              color="#6690C0"
              class="mt-3"
              type="submit"
              style="text-transform: capitalize;"
            >
              Log in
            </v-btn>
            <span class="forgotPass"><a href="#">Forgot your password?</a></span>
          </v-form>
        </v-card-text>
      </v-card>

      <v-card
        max-width="340"
        color="white"
        pb-10
      >


        <p class="font-weight-black text-center pt-4">First time on VK?</p>
        <p class="font-weight-light text-center">Sign up for VK</p>
        <v-card-text>
          <v-form
          ref="formRegistration"
          @submit.prevent="submitRegistration"
          >
          
          <v-text-field
          name="firstname"
          v-model="firstname"
          :rules="firstnameRules"
          dark
          placeholder="First name"
          color="#4a76a8"
            label="First name"
            prepend-inner-icon="far fa-address-card"
                      single-line
            solo
            background-color="white"
            Required
          ></v-text-field>
             <v-text-field
             name="lastname"
             :rules="lastnameRules"
             v-model="lastname"
             placeholder="Last name"
             color="#4a76a8"
            label="Last name"
            prepend-inner-icon="far fa-address-card"
                      single-line
            solo
            background-color="white"
            Required
          ></v-text-field>

           <v-text-field
             name="emailRegistration"
             v-model="emailRegistration"
             :rules="emailRulesRegistration"
             placeholder="Email"
             color="#4a76a8"
             label="Last name"
             prepend-inner-icon="far fa-envelope"
             single-line
             solo
             background-color="white"
             Required
          ></v-text-field>
           <v-text-field
            :append-icon="showRegistrationPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
            @click:append="() => (showRegistrationPassword = !showRegistrationPassword)"
            :type="showRegistrationPassword ? 'text' : 'password'"
            name="passwordRegistration"
            v-model="passwordRegistration"
            :rules="passwordRulesRegistration"
            placeholder="Password"
            color="#4a76a8"
            label="Last name"
            prepend-inner-icon="fas fa-key"
            single-line
            solo
            background-color="white"
            Required
          ></v-text-field>
          <span style="color:#939393;" class="font-weight-light">Birthday</span>


   <v-tooltip top max-width="200" color="#828282">
      <template v-slot:activator="{ on }">
        <v-icon v-on="on">far fa-question-circle</v-icon>
      </template>
      <span><b>By providing your birthday</b>, your friends will be able to find you more easily and help us select interesting content to recommend to you.<br>You can edit your profile to manage who can view your birthday.</span>
    </v-tooltip>
<v-row align="center" class="mySelect">
<v-col class="d-flex" cols="4">
        <v-select
        clear-icon
        item-color="green"
        color="blue"
        background-color="#6690C0"
        class="black--text"
          :items="days"
          label="Day"
          dense
          solo
          :rules="[(v) => !!v || 'Required']"
          v-model="day"
        ></v-select>
</v-col>
      <v-col class="d-flex" cols="4">
        <v-select
        background-color="#6690C0"
          :items="months"
          label="Month"
          dense
          solo
          Required
          :rules="[(v) => !!v || 'Required']"
          v-model="month"
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="4">
        <v-select
        background-color="#6690C0"
          :items="years"
          label="Year"
          dense
          solo
          Required
          :rules="[(v) => !!v || 'Required']"
          v-model="year"
        ></v-select>
      </v-col>
</v-row>
<span style="color:#939393;" class="font-weight-light">Your gender</span>
    <v-radio-group 
    v-model="gender" 
    row 
    :rules="[v => !!v || 'Gender is required']" 
    required>
      <v-radio  name="gender" label="Female" value="female" color="#2A6CAB" required></v-radio>
      <v-radio  name="gender" label="Male" value="male" color="#2A6CAB" required></v-radio>
    </v-radio-group>

            <v-btn
              color="success"
              class="mt-3"
              type="submit"
              style="text-transform: capitalize;width:100%;"
            >
              Sign up
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";
import Snackbar from "@/components/Snackbar";


export default {
  middleware: 'loggedIn',
  name: "Home",
  layout: "login",
  components: {
    Snackbar
  },
  data: () => ({
    showLoginPassword: false,
    showRegistrationPassword: false,
    firstname: '',
    lastname: '',
    emailRegistration: '',
    emailLogin: '',
    passwordRegistration: '',
    passwordLogin: '',
    gender:'female',
    day:'',
    month:'',
    year:'',
    days:[
      1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
      21,22,23,24,25,26,27,28,29,30,31
    ],
    months:[
      'January','February','March','April','May','June',
      'July','August','September','November','December'
    ],
    years:[
      2006,2005,2004,2003,2002,2001,2000,1999,1998,1997,
      1996,1995,1994,1993,1992,1991,1990
    ],
    isValid: true,
    firstnameRules: [
      v => !!v || "First name is required",
      v => (v && v.length <= 16) || "Name must be less than 16 characters",
      v => (v && v.length >= 1) || "Name must be more than 1 characters",

        v => (v.charAt(0).toUpperCase() + v.slice(1) == v) || "First name in the incorrect form"
    ],
    lastnameRules: [
      v => !!v || "Last name is required",
      v => (v && v.length <= 16) || "Name must be less than 16 characters",
      v => (v && v.length >= 1) || "Name must be more than 1 characters",
  v => (v.charAt(0).toUpperCase() + v.slice(1) == v) || "Last name in the incorrect form"
    ],
      passwordRulesLogin: [
      v => !!v || "Password is required",
      v => (v && v.length <= 16) || "Password must be less than 16 characters",
      v => (v && v.length >= 4) || "Password must be more than 4 characters"
    ],
      emailRulesLogin: [ 
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
            passwordRulesRegistration: [
      v => !!v || "Password is required",
      v => (v && v.length <= 16) || "Password must be less than 16 characters",
      v => (v && v.length >= 4) || "Password must be more than 4 characters"
    ],
      emailRulesRegistration: [ 
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
    snackbarLogin: false,
    snackbarRegistration: false
  }),
  computed: {
    message() {
    },
  },
  mounted() {
  },

  methods: {
   async submitRegistration() {

    if(this.$refs.formRegistration.validate()){ 

      try {
        await this.$axios.post('/reg', {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.emailRegistration,
            password: this.passwordRegistration,
            gender: this.gender,
            day: this.day,
            month: this.month,
            year: this.year
        })

        let response = await this.$auth.loginWith('local', {
          data: {
          email: this.emailRegistration,
          password: this.passwordRegistration
          }
        })
        
        this.$router.push(response.data.id)
      } catch (e) {
        //this.error = e.response.data.message
       alert('reg error is ' + e.response.data.message)
       this.snackbarRegistration = true
       this.emailRegistration = ''
       this.passwordRegistration = ''
      }
   }
   
    },
      async submitLogin() {

        if(this.$refs.formLogin.validate()){
            try {
              let response = await this.$auth.loginWith('local', {
                  data: {
                  email: this.emailLogin,
                  password: this.passwordLogin
                  }
              })

              this.$router.push(response.data.id)
            } catch (e) {
                //this.error = e.response.data.message
                this.snackbarLogin = true
                this.passwordLogin = ''
             }
        }
     }
  },

  head: {
    
  },
};
</script>
<style>


.v-input--selection-controls__ripple {
    border-radius: 50%;
    cursor: pointer;
    height: 34px;
    position: absolute;
    transition: inherit;
    width: 34px;
    left: -12px;
    top: calc(50% - 24px);
    margin: 7px;
}


*{
  font-family: 'Montserrat', sans-serif;
}
.d-flex.col.col-4{
  margin-bottom: 0;
  padding-bottom: 0;
}
.v-text-field.v-text-field--enclosed .v-text-field__details {
    margin-bottom: 0px;
}
.v-select.v-input--dense .v-select__selection--comma {
    margin: 5px 4px 3px 0;
    max-width:80px;
}

.mySelect .v-input__icon {
    align-items: center;
    display: inline-flex;
    height: 1px;
    flex: 1 0 auto;
    justify-content: center;
    min-width: 2px;
    width: 2px;
}
.fa-caret-down:before {
    content: "\f0d7";
    display: none;
}

#input-239::placeholder ,#input-243::placeholder,#input-253::placeholder ,#input-257::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color:  #828282;
  padding-left:6px;
}
.forgotPass{
  position: absolute;
  margin-top: 18px;
  margin-left: 8px;
  color: #2A6CAB;
}
.forgotPass a{
   color: #2A6CAB;
}
.v-application p {
    margin-bottom: 0;
}
  p{
    color: black;   
  }
  h1{
    color: black;
  }
  .mobAppText{
    color: #736D7A;
    width: 70%;
    padding-bottom: 20px;
  }
 .theme--dark.v-input, .theme--dark.v-input input, .theme--dark.v-input textarea {
    color: black;
    border-bottom: #4a76a8;
}

.v-input input {
    border-bottom: #4a76a8;
    color: black;
}
.fa-envelope:before {
    content: "\f0e0";
    color: #4a76a8;
}
.fa-key:before {
    content: "\f084";
    color: #4a76a8;
}
.fa-address-card:before {
    content: "\f2bb";
    color: #4a76a8;
}
.fa-question-circle:before {
    content: "\f059";
    color: #D3D9DE;
    font-size: 15px;
}


.theme--dark.v-label {
    color: black;
}
#input-47,#input-43,#input-23,#input-27,#input-39,#input-35{
  margin-left:6px;
}
#input-47::placeholder,#input-43::placeholder,#input-23::placeholder,#input-27::placeholder,#input-39::placeholder,#input-35::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: grey;
  opacity: 1; /* Firefox */
}


</style>
