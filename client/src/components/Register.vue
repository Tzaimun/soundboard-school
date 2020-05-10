<template>
  <div class="fullsection">
    <div>
      <div class="sign-up-form section">
        <div class="container">
          <div class="columns is-mobile">
            <div class="column is-8 is-offset-2">
              <h1>Sign up:</h1>
            </div>
          </div>
          <div class="columns is-mobile">
            <b-field class="column is-8 is-offset-2" label="Name">
              <b-input type="text" placeholder="Firstname Lastname" v-model="name"></b-input>
            </b-field>
          </div>
          <div class="columns is-mobile">
            <b-field class="column is-8 is-offset-2" label="Email">
              <b-input type="email" placeholder="example@email.com" v-model="email"></b-input>
            </b-field>
          </div>
          <div class="columns is-mobile">
            <b-field class="column is-8 is-offset-2" label="Password">
              <b-input type="password" placeholder="password" v-model="password"></b-input>
            </b-field>
          </div>
        </div>
      </div>
      <div>
        <div class="error" v-html="error" />
        <div class="register columns is-mobile">
          <b-button v-on:click="register" class="column is-half is-offset-one-quarter registerlabel"expanded>Register</b-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      console.log('Clicked on register button')
      try {
        console.log('trying')
        const response = await AuthenticationService.register({
          name: this.name,
          email: this.email,
          password: this.password
        })
        console.log(response.data)
      } catch (err) {
        console.log('Failed')
        this.error = err.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .error {
    color: red;
  }
  .title {
    color: white;
    border-radius: 6px;
    background-color: #9fc5f8;
  }
  .section {
    padding: 5rem 1.5rem 3.5rem 1.5rem;
  }
  h1{
    color:  black;
    font-weight: bold;
    font-size: 35px;
  }
  .fullsection{
    padding-bottom: 500px;
    background-color:#9fc5f8;
  }
  .column{
    margin-bottom: 10px;
    font-family: 'Poppins', sans-serif;
    background-color:#9fc5f8;
    color: white;
    font-size: 17px;
  }
  .registerlabel{
    background-color:#2f3f53;
    background-color: #2f3f53;
    border: double;
    border-style: solid;
    border-color: black;
    
  }
</style>
