<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent>
            <fieldset>
              <fieldset class="form-group">
                  <input v-model="article.title" :disabled="isDisabled" type="text" class="form-control form-control-lg" placeholder="Article Title">
              </fieldset>
              <fieldset class="form-group">
                  <input v-model="article.description" :disabled="isDisabled" type="text" class="form-control" placeholder="What's this article about?">
              </fieldset>
              <fieldset class="form-group">
                  <textarea v-model="article.body" :disabled="isDisabled" class="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
              </fieldset>
              <fieldset class="form-group">
                  <input v-model="tagWillAdd" :disabled="isDisabled" type="text" class="form-control" @keydown.enter="addTag" placeholder="Enter tags"><div class="tag-list"></div>
                  <div class="tag-list">
                    <span v-for="tag in article.tagList" :key="tag" class="tag-default tag-pill"><i @click="removeTag(tag)" class="ion-close-round"></i>&nbsp;{{tag}}</span>
                  </div>
              </fieldset>
              <button type="button" @click.prevent="submitArticle" class="btn btn-lg pull-xs-right btn-primary">
                  Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>


<script>
export default {
  middleware: 'authenticated',
  data() {
    return {
      isDisabled: false,
      isUpdate: false,
      tagWillAdd: '',
      article: {
        title: '',
        description: '',
        body: '',
        tagList: []
      }
    }
  },
  created() {
    this.isUpdate = this.$route.name === 'updateeditor'
    if (this.isUpdate) {
      this.getArticle()
    }
  },
  methods: {
    addTag() {
      if(this.tagWillAdd.trim()) {
        this.article.tagList.push(this.tagWillAdd.trim())
        this.tagWillAdd = ''
      }
    },
    removeTag(tag) {
      const index = this.article.tagList.findIndex((item) => {
        return item === tag
      })
      this.article.tagList.splice(index, 1)
    },
    submitArticle() {
      if (this.isUpdate) {
        this.editArticle()
      } else {
        this.createArticle()
      }
    },
    async createArticle() {
      this.isDisabled = true
      const { data: articleInfo } = await this.$request.addArticle(this.article)
      const { article } = articleInfo
      this.$router.push({ name:'article', params: { slug: article.slug } })
      this.isDisabled = false
    },
    async editArticle() {
      this.isDisabled = true
      const { data: articleInfo } = await this.$request.updateArticle(this.$route.params.slug, {article: this.article})
      const { article } = articleInfo
      this.$router.push({ name:'article', params: { slug: article.slug } })
      this.isDisabled = false
    },
    async getArticle() {
      console.log('get article:', this.$route.params.slug)
      const { data: articleInfo } = await this.$request.getArticle(this.$route.params.slug)
      this.article = articleInfo.article
    }
  }
}
</script>

<style>

</style>