<template>
  <div>
    <b-button
      type="is-info"
      icon-left="google"
      expanded
      @click="login('google')"
    >
      Googleアカウントでログインする
    </b-button>
  </div>
</template>

<script>
export default {
  middleware: 'Login',
  head() {
    return {
      title: 'ログインページ',
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }],
    }
  },
  data() {
    return {}
  },
  methods: {
    login: async function (provider) {
      try {
        const response = await this.$axios.$get('/api/login/' + provider)
        window.location.href = response
      } catch (err) {
        this.$buefy.snackbar.open({
          duration: 5000,
          message: 'エラーが発生しました。しばらくしてからお試しください。',
          type: 'is-danger',
          position: 'is-top',
          actionText: '閉じる',
          queue: false,
        })
      }
    },
  },
}
</script>
