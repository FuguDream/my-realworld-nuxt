<template>
  <div class="article-page">

    <div class="banner">
      <div class="container">

        <h1>{{article.title}}</h1>

        <div class="article-meta">
          <nuxt-link :to="{ name:'profile', params: { username: article.author.username } }"><img :src="article.author.image" /></nuxt-link>
          <div class="info">
            <nuxt-link :to="{ name:'profile', params: { username: article.author.username } }" class="author">{{article.author.username}}</nuxt-link>
            <span class="date">{{article.createdAt | dateFilter('MMM DD,YYYY') }}</span>
          </div>
          <template v-if="isUser">
            <button class="btn btn-outline-secondary btn-sm" @click="editArticle">
              <i class="ion-edit"></i>&nbsp;Edit Article
            </button>
            &nbsp;&nbsp;
            <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
              <i class="ion-trash-a"></i>&nbsp;Delete Article
            </button>
          </template>
          <template v-else>
            <button class="btn btn-sm action-btn" :class="article.author.following ? 'btn-secondary' : 'btn-outline-secondary' " :disabled="article.favoritedBtnDisabled"
            @click="switchFollowing">
            <i class="ion-plus-round"></i>
            &nbsp;
            <template v-if="!article.author.following">Follow {{article.author.username}}</template>
            <template v-else>Unfollow {{article.author.username}}</template>
          </button>
          &nbsp;&nbsp;
          <button class="btn btn-sm" :class="article.favorited ? 'btn-primary' : 'btn-outline-primary' " :disabled="article.followingBtnDisabled"
            @click="switchFavorited">
            <i class="ion-heart"></i>
            &nbsp;
            <template v-if="!article.favorited">
              Favorite Aritcle <span class="counter">({{article.favoritesCount}})</span>
            </template>
            <template v-else>
              Unfavorite Aritcle <span class="counter">({{article.favoritesCount}})</span>
            </template>
            
          </button>
          </template>
          
        </div>

      </div>
    </div>

    <div class="container page">

      <div class="row article-content">
        <div class="col-md-12">
          <div><div v-html="article.bodyFormatted"></div></div>
          <ul class="tag-list">
            <li v-for="tag in article.tagList" :key="tag" class="tag-default tag-pill tag-outline">{{tag}}</li>
          </ul>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <div class="article-meta">
          <nuxt-link :to="{ name:'profile', params: { username: article.author.username } }"><img :src="article.author.image" /></nuxt-link>
          <div class="info">
            <nuxt-link :to="{ name:'profile', params: { username: article.author.username } }" class="author">{{article.author.username}}</nuxt-link>
            <span class="date">{{article.createdAt | dateFilter('MMM DD,YYYY') }}</span>
          </div>
          <template v-if="isUser">
            <button class="btn btn-outline-secondary btn-sm" @click="editArticle">
              <i class="ion-edit"></i>&nbsp;Edit Article
            </button>
            &nbsp;&nbsp;
            <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
              <i class="ion-trash-a"></i>&nbsp;Delete Article
            </button>
          </template>
          <template v-else>
            <button class="btn btn-sm action-btn" :class="article.author.following ? 'btn-secondary' : 'btn-outline-secondary' " :disabled="article.favoritedBtnDisabled"
            @click="switchFollowing">
            <i class="ion-plus-round"></i>
            &nbsp;
            <template v-if="!article.author.following">Follow {{article.author.username}}</template>
            <template v-else>Unfollow {{article.author.username}}</template>
          </button>
          &nbsp;&nbsp;
          <button class="btn btn-sm" :class="article.favorited ? 'btn-primary' : 'btn-outline-primary' " :disabled="article.followingBtnDisabled"
            @click="switchFavorited">
            <i class="ion-heart"></i>
            &nbsp;
            <template v-if="!article.favorited">
              Favorite Aritcle <span class="counter">({{article.favoritesCount}})</span>
            </template>
            <template v-else>
              Unfavorite Aritcle <span class="counter">({{article.favoritesCount}})</span>
            </template>
            
          </button>
          </template>
          
        </div>
      </div>

      <div class="row">

        <div class="col-xs-12 col-md-8 offset-md-2">

          <form v-if="isLogin" class="card comment-form">
            <div class="card-block">
              <textarea v-model="newComment" class="form-control" placeholder="Write a comment..." rows="3"></textarea>
            </div>
            <div class="card-footer">
              <img :src="user.image" class="comment-author-img" />
              <button @click.prevent="postComment" :disabled="postCommentDisabled" class="btn btn-sm btn-primary">
              Post Comment
              </button>
            </div>
          </form>
          <p v-else style="display: inherit;">
            <nuxt-link to="/login">Sign in</nuxt-link> or <nuxt-link to="/register">sign up</nuxt-link> to add comments on this article.
          </p>

          <comment-card v-for="comment in comments" :key="comment.id" :comment="comment" :slug="article.slug" @commitDeleted="deleteCommit"></comment-card>
          
        </div>

      </div>

    </div>

  </div>
</template>

<script>
import CommentCard from '@/components/commentCard'
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt()

export default {
  name: 'articlepage',
  components: {
    CommentCard
  },
  async asyncData ({ params, query, store, $request }) {
    const [articleRes, commentsRes] = await Promise.all([$request.getArticle(params.slug), $request.getComments(params.slug)])
    const articleInfo = articleRes.data
    const commentsInfo = commentsRes.data
    // 文章
    const { article } = articleInfo
    article.bodyFormatted = md.render(article.body)
    article.favoritedBtnDisabled = false
    article.followingBtnDisabled = false
    // 评论
    const { comments } = commentsInfo
    // 操作用户状态
    let isUser = false
    let user = {}
    let isLogin = false
    if (store.state.user.user) {
      user = store.state.user.user
      isUser = user.username === article.author.username
      isLogin = true
    }
    return {
      article,
      comments,
      isUser,
      user,
      isLogin
    }
  },
  data() {
    return {
      postCommentDisabled: false,
      newComment: ''
    }
  },
  methods: {
    editArticle() {
      this.$router.push({name: 'updateeditor', params: {slug: this.$route.params.slug}})
    },
    async deleteArticle() {
      await this.$request.deleteArticle(this.article.slug)
      this.$router.push('/')
    },
    deleteCommit(id) {
      const index = this.comments.findIndex((comment) => {
        return comment.id === id
      })
      this.comments.splice(index, 1)
    },
    async postComment() {
      if (this.newComment.trim()) {
        this.postCommentDisabled = true
        const slug = this.$route.params.slug
        const commentParams = {comment: {body: this.newComment}}
        const { data: commentInfo } = await this.$request.addComment(slug, commentParams)
        this.comments.unshift(commentInfo.comment)
        this.newComment = ''
        this.postCommentDisabled = false
      }
    },
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
    },
    switchFollowing() {
      if (!this.article.author.following) {
        this.followProfile()
      } else {
        this.unfollowProfile()
      }
    },
    async followProfile() {
      this.article.followingBtnDisabled = true
      await this.$request.followProfile(this.article.author.username)
      this.article.author.following = !this.article.author.following
      this.article.followingBtnDisabled = false
    },
    async unfollowProfile() {
      this.article.followingBtnDisabled = true
      await this.$request.unfollowProfile(this.article.author.username)
      this.article.author.following = !this.article.author.following
      this.article.followingBtnDisabled = false
    }
  },
  head() {
    return {
      title: `${this.article.title} - realworldByFugu`,
      meta: [
        { hid: 'description', name: 'description', content: this.article.description}
      ]
    }
  }
}
</script>

<style>

</style>