<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">{{comment.body}}</p>
    </div>
    <div class="card-footer">
      <nuxt-link :to="'/profile/' + comment.author.username" class="comment-author">
        <img :src="comment.author.image" class="comment-author-img" />
      </nuxt-link>
      &nbsp;
      <nuxt-link :to="'/profile/' + comment.author.username" class="comment-author">{{comment.author.username}}</nuxt-link>
      <span class="date-posted">{{comment.createdAt | dateFilter('MMM DD, YYYY')}}</span>
      <span class="mod-options">
        <!-- <i class="ion-edit"></i> -->
        <i @click="deleteComment" class="ion-trash-a"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true
    },
    slug: {
      type: String,
      required: true
    }
  },
  methods: {
    deleteComment() {
      this.$request.deleteComment(this.slug, this.comment.id)
      this.$emit('commitDeleted', this.comment.id)
    }
  }
}
</script>

<style>

</style>