<template>
  <div>
    <div class="article-meta">
      <nuxt-link :to="{ name:'profile', params: { username: article.author.username } }"><img :src="article.author.image" /></nuxt-link>
      <div class="info">
        <nuxt-link :to="{ name:'profile', params: { username: article.author.username } }" class="author">{{article.author.username}}</nuxt-link>
        <span class="date">{{article.createdAt | dateFilter('MMM DD, YYYY') }}</span>
      </div>
      <button class="btn btn-outline-primary btn-sm pull-xs-right" :class="{active: article.favorited}" @click="switchFavorited" :disabled="article.favoritedBtnDisabled">
        <i class="ion-heart"></i> {{article.favoritesCount}}
      </button>
    </div>
    <nuxt-link :to="{ name:'article', params: { slug: article.slug } }" class="preview-link">
      <h1>{{article.title}}</h1>
      <p>{{article.description}}</p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li v-for="tag in article.tagList" :key="tag" class="tag-default tag-pill tag-outline">{{tag}}</li>
      </ul>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  methods: {
    switchFavorited() {
      if (this.article.favorited) {
        this.unfavoriteProfile()
      } else {
        this.favoriteProfile()
      }
    },
    async favoriteProfile() {
      this.article.favoritedBtnDisabled = true
      await this.$request.favoriteArticle(this.article.slug)
      this.article.favorited = !this.article.favorited
      this.article.favoritesCount++
      this.article.favoritedBtnDisabled = false
    },
    async unfavoriteProfile() {
      this.article.favoritedBtnDisabled = true
      await this.$request.unfavoriteArticle(this.article.slug)
      this.article.favorited = !this.article.favorited
      this.article.favoritesCount--
      this.article.favoritedBtnDisabled = false
    }
  }
}
</script>

<style>

</style>