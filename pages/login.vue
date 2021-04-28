<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <nuxt-link to="/register">Need an account? </nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(errorDetails, errorType) in errors">
              <li v-for="errorDetail in errorDetails" :key="errorDetail">{{errorType}}: {{errorDetail}}</li>
            </template>
          </ul>

          <form @submit.prevent="signin">
            <fieldset class="form-group">
              <input v-model="user.email" required class="form-control form-control-lg" type="email" placeholder="Email">
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.password" required class="form-control form-control-lg" type="password" placeholder="Password">
            </fieldset>
            <button type="submit" class="btn btn-lg btn-primary pull-xs-right">
              Sign in
            </button>
          </form>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  middleware: 'unauthenticated',
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      errors: {}
    }
  },
  methods: {
    async signin() {
      try {
        const { data } = await this.$request.login({user: this.user})
        this.recordUser(data.user)
        this.login()
        this.$router.push('/')
      } catch (error) {
        this.errors = error.response && error.response.data.errors
      }
    },
    ...mapMutations('user', ['recordUser']),
    ...mapMutations(['login'])
  }
}
</script>

<style>

</style>