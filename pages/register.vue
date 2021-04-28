<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <nuxt-link to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(errorDetails, errorType) in errors">
              <li v-for="errorDetail in errorDetails" :key="errorDetail">{{errorType}}: {{errorDetail}}</li>
            </template>
          </ul>

          <form @submit.prevent="regist">
            <fieldset class="form-group">
              <input v-model="user.username" required class="form-control form-control-lg" type="text" placeholder="Your Name">
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.email" required class="form-control form-control-lg" type="email" placeholder="Email">
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.password" required minlength="8" class="form-control form-control-lg" type="password" placeholder="Password">
            </fieldset>
            <button type="submit" class="btn btn-lg btn-primary pull-xs-right">
              Sign up
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
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
      },
      errors: {}
    }
  },
  methods: {
    async regist() {
      try {
        const { data } = await this.$request.regist({user: this.user})
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