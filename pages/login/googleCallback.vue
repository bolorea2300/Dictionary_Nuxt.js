<template>
  <div>認証中</div>
</template>

<script>
export default {
  middleware: 'Login',
  head() {
    return {
      title: '認証中',
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }],
    }
  },
  async mounted() {
    try {
      const response = await this.$axios.$get('/api/login/google/callback', {
        params: this.$route.query,
      })
      this.$store.commit('setAuth', {
        token: response.access_token,
        user: response.user,
      })
      window.location.href = '/'
    } catch (error) {
      alert('ログインに失敗しました。')
      this.$router.push('/')
    }
  },
}
</script>
