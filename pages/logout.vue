<template>
  <div>
    <h1 class="title" v-if="error === false">ログアウト中・・・</h1>
    <div v-else>
      <h1 class="title red">ログアウトに失敗しました</h1>
      <p>
        何度やってもログアウトできない場合は、<nuxt-link to="/support/contact"
          >お問い合わせ</nuxt-link
        >にてご報告してくださると幸いです。
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: false,
    }
  },
  mounted() {
    this.$axios
      .$get('/api/logout')
      .then((res) => {
        this.$store.commit('logout')
        this.$router.replace('/')
      })
      .catch((err) => {
        this.error = true
      })
  },
}
</script>

<style>
.red {
  color: red;
}
</style>
