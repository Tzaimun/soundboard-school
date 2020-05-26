<template>

  <div class="fullsection">
    <div>
      <div class="sign-up-form section">
        <div class="container">
          <div class="columns is-mobile">
            <div class="column is-8 is-offset-2">
              <h1>Welcome!</h1>
            </div>
          </div>
          <div class="columns is-mobile">
            <b-field class="column is-8 is-offset-2" label="Email">
              <b-input type="email" placeholder="example@email.com" v-model="email"></b-input>
            </b-field>
          </div>
          <div class="columns is-mobile">
            <b-field class="column is-8 is-offset-2" label="Password">
              <b-input v-on:keydown.enter="login" type="password" placeholder="password" v-model="password"></b-input>
            </b-field>
          </div>
        </div>
      </div>
      <div>
        <div class="error" v-html="error" />
        <div class="register columns is-mobile">
          <b-button v-on:click="login" class="column is-half is-offset-one-quarter loginlabel" expanded>Login</b-button>
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
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        console.log(response)
      } catch (err) {
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
    background-color:#9fc5f8;
    padding-bottom: 500px;
  }
  .column{
    margin-bottom: 10px;
    font-family: 'Poppins', sans-serif;
    background-color:#9fc5f8;
    color: white;
    font-size: 17px;
  }
  .loginlabel{
    background-color: #2f3f53;
    border: double;
    border-style: solid;
    border-color: black;
  }
</style>
