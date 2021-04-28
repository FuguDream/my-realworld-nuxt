export default ({ $axios }, inject) => {
  const request = {
    login: (user) => {
      return $axios.post('/api/users/login', user)
    },
    regist: (user) => {
      return $axios.post('/api/users', user)
    },
    updateUser: (user) => {
      return $axios.put('/api/user', user)
    },
    getProfile: (username) => {
      return $axios.get(`/api/profiles/${username}`)
    },
    followProfile: (username) => {
      return $axios.post(`/api/profiles/${username}/follow`)
    },
    unfollowProfile: (username) => {
      return $axios.delete(`/api/profiles/${username}/follow`)
    },
    getFeedArticles: (params) => {
      return $axios.get('/api/articles/feed', params)
    },
    getArticles: (params) => {
      return $axios.get('/api/articles', params)
    },
    getArticle: (slug) => {
      return $axios.get(`/api/articles/${slug}`)
    },
    addArticle: (article) => {
      return $axios.post('/api/articles', article)
    },
    updateArticle: (slug, article) => {
      return $axios.put(`/api/articles/${slug}`, article)
    },
    deleteArticle: (slug) => {
      return $axios.delete(`/api/articles/${slug}`)
    },
    favoriteArticle: (slug) => {
      return $axios.post(`/api/articles/${slug}/favorite`)
    },
    unfavoriteArticle: (slug) => {
      return $axios.delete(`/api/articles/${slug}/favorite`)
    },
    getComments: (slug) => {
      return $axios.get(`/api/articles/${slug}/comments`)
    },
    addComment: (slug, comment) => {
      return $axios.post(`/api/articles/${slug}/comments`, comment)
    },
    deleteComment: (slug, id) => {
      return $axios.delete(`/api/articles/${slug}/comments/${id}`)
    },
    getTags: () => {
      return $axios.get('/api/tags')
    }
  }

  inject('request', request)
}