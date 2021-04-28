<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <nuxt-link class="navbar-brand" to="/">conduit</nuxt-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <nuxt-link class="nav-link" to="/">Home</nuxt-link>
        </li>
        <li v-if="isLogin" class="nav-item">
          <nuxt-link class="nav-link" to="/editor">
            <i class="ion-compose"></i>&nbsp;New Post
          </nuxt-link>
        </li>
        <li v-if="isLogin" class="nav-item">
          <nuxt-link class="nav-link" to="/settings">
            <i class="ion-gear-a"></i>&nbsp;Settings
          </nuxt-link>
        </li>
        <li v-if="!isLogin" class="nav-item">
          <nuxt-link class="nav-link" to="/login">
            Sign in
          </nuxt-link>
        </li>
        <li v-if="!isLogin" class="nav-item">
          <nuxt-link class="nav-link" to="/register">
            Sign up
          </nuxt-link>
        </li>
        <li v-if="isLogin" class="nav-item">
          <nuxt-link class="nav-link" :to="'/profile/' + user.username">
            <img class="user-pic" :src="user.image">
            {{ user.username }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  name: 'Header',
  data() {
    return {
      isLogin: false,
      user: {}
    }
  },
  mounted() {
    if(this.$store.state.isLogin) {
      this.getUser()
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  },
  methods: {
    getUser() {
      this.user = JSON.parse(Cookie.get('user'))
    }
  }
}
</script>