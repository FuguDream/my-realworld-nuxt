<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="isLogin" class="nav-item">
                <nuxt-link :to="{name: 'home', query: {tab: 'yourfeed', page: page}}" class="nav-link" :class="{active: tab === 'yourfeed'}">Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link :to="{name: 'home', query: {tab: 'globalfeed', page: page}}" class="nav-link" :class="{active: tab === 'globalfeed'}" >Global Feed</nuxt-link>
              </li>
              <li v-if="tag" class="nav-item">
                <nuxt-link :to="{name: 'home', query: {tab: 'tag', tag: tag, page: page}}" class="nav-link" :class="{active: tab === 'tag'}" >#{{tag}}</nuxt-link>
              </li>
            </ul>
          </div>

          <div v-for="article in articles" :key="article.slug" class="article-preview">
            <article-meta :article="article" />
          </div>

          <nav>
            <ul v-show="totalPage > 1" class="pagination">
              <li v-for="item in totalPage" :key="item" class="page-item" :class="{active: item === page }">
                <nuxt-link :to="{name: 'home', query: {tab: 'tag', page: item, tag: $route.query.tag}}" class="page-link">{{item}}</nuxt-link>
              </li>
            </ul>
          </nav>

        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link :to="{name: 'home', query: {tab: 'tag', tag}}" v-for="tag in tags" :key="tag" class="tag-pill tag-default">{{ tag }}</nuxt-link>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import ArticleMeta from '@/components/articleMeta'

export default {
  name: 'home',
  components: {
    ArticleMeta
  },
  async asyncData({ store, query, $request }) {

    // 页签
    const tab = query.tab || 'globalfeed'
    // 用户状态
    let isLogin = false
    if (store.state.user.user) {
      isLogin = true
    }
    // 分页
    const limit = 10
    const page = query.page || 1
    const offset = (page - 1) * limit

    const getArticles = tab === 'yourfeed' ? $request.getFeedArticles : $request.getArticles

    const tag = query.tag

    const [articlesRes, tagsRes] = await Promise.all([getArticles({params: {limit, offset, tag}}), $request.getTags()])
    // 标签
    const { tags } = tagsRes.data
    // 文章
    const {articles, articlesCount} = articlesRes.data

    const totalPage = Math.ceil(articlesCount / limit)

    return {
      isLogin,
      tab,
      tags,
      tag,
      articles,
      page,
      totalPage
    }

    try {
      
    } catch (error) {
    }
  },
  watchQuery: ['tab', 'tag', 'page']
}
</script>

<style>

</style>