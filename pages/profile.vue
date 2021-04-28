<template>
  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <button v-if="isUser" class="btn btn-sm btn-outline-secondary action-btn" @click="goSetting">
              <i class="ion-gear-a"></i>
              &nbsp;
               Edit Profile Settings
            </button>
            <button v-else-if="!profile.following" class="btn btn-sm btn-outline-secondary action-btn" @click="followProfile">
              <i class="ion-plus-round"></i>
              &nbsp;
              Follow {{ profile.username }}
            </button>
            <button v-else class="btn btn-sm btn-outline-secondary action-btn" @click="unfollowProfile">
              <i class="ion-plus-round"></i>
              &nbsp;
              Unfollow {{ profile.username }}
            </button>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link :to="{ name:'profile', params: { username: profile.username }, query: { tab:'author'}}" 
                  class="nav-link" :class="{active: tab === 'author'}">
                  My Articles
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link :to="{ name:'profile', params: { username: profile.username }, query: { tab:'favorited'}}" 
                  class="nav-link" :class="{active: tab === 'favorited'}">
                  Favorited Articles
                </nuxt-link>
              </li>
            </ul>
          </div>
          <div v-for="article in articles" :key="article.slug" class="article-preview">
            <article-meta :article="article" />
          </div>


        </div>

      </div>
    </div>

  </div>
</template>

<script>
import ArticleMeta from '@/components/articleMeta'

export default {
  name: 'profile',
  components: {
    ArticleMeta
  },
  async asyncData ({ params, query, store, $request }) {
    // profile用户
    const { data: profileInfo } = await $request.getProfile(params.username)
    const { profile } = profileInfo
    // profile用户articles
    const tab = query.tab || 'author'
    const articlesParams = {params: {}}
    articlesParams.params[tab] = profile.username
    const { data: articleInfo } = await $request.getArticles({params: {[tab]: profile.username}})
    const articles = articleInfo.articles.map((article) => {
      article.favoritedBtnDisabled = false
      return article
    })
    // 操作用户
    let isUser = false
    if (store.state.user.user) {
      const user = store.state.user.user
      isUser = user.username === profile.username
    }
    return {
      // articlesCount: articleInfo.articlesCount,
      articles,
      tab,
      profile,
      isUser
    }
  },
  watchQuery: ['tab'],
  methods: {
    goSetting() {
      this.$router.push('/settings')
    },
    async followProfile() {
      await this.$request.followProfile(this.profile.username)
      this.profile.following = !this.profile.following
    },
    async unfollowProfile() {
      await this.$request.unfollowProfile(this.profile.username)
      this.profile.following = !this.profile.following
    }
  }
}
</script>

<style>

</style>