<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <ul class="error-messages">
            <template v-for="(errorDetails, errorType) in errors">
              <li v-for="errorDetail in errorDetails" :key="errorDetail">{{errorType}}: {{errorDetail}}</li>
            </template>
          </ul>

          <form @submit.prevent="updateUser">
            <fieldset>
                <fieldset class="form-group">
                  <input v-model="user.image" class="form-control" type="text" placeholder="URL of profile picture">
                </fieldset>
                <fieldset class="form-group">
                  <input v-model="user.username" required class="form-control form-control-lg" type="text" placeholder="Your Name">
                </fieldset>
                <fieldset class="form-group">
                  <textarea v-model="user.bio" class="form-control form-control-lg" rows="8" placeholder="Short bio about you"></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input v-model="user.email" required class="form-control form-control-lg" type="email" placeholder="Email">
                </fieldset>
                <fieldset class="form-group">
                  <input v-model="user.password" required minlength="8" class="form-control form-control-lg" type="password" placeholder="Password">
                </fieldset>
                <button type="submit" class="btn btn-lg btn-primary pull-xs-right">
                  Update Settings
                </button>
            </fieldset>
          </form>
          <hr />
          <button @click.prevent="exit" class="btn btn-outline-danger">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'authenticated',
  data() {
    return {
      user: {},
      errors: {}
    }
  },
  mounted() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = JSON.parse(Cookie.get('user'))
    },
    async updateUser() {
      try {
        const { data } = await this.$request.updateUser({user: this.user})
        this.recordUser(data.user)
      } catch (error) {
        this.errors = error.response && error.response.data.errors
      }
    },
    exit () {
      this.removeUser()
      this.logout()
      this.$router.push('/')
    },
    ...mapMutations('user', ['recordUser', 'removeUser']),
    ...mapMutations(['logout'])
  }
}
</script>

<style>

</style>