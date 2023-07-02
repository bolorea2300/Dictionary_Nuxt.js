<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item class="dictionary" tag="nuxt-link" :to="{ path: '/' }">
        ひみつ辞書
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-dropdown label="辞書" v-if="$store.state.auth === true">
        <b-navbar-item tag="nuxt-link" to="/dictionary">一覧</b-navbar-item>
        <b-navbar-item tag="nuxt-link" to="/dictionary/create"
          >作成</b-navbar-item
        >
      </b-navbar-dropdown>
      <b-navbar-dropdown label="サポート">
        <b-navbar-item tag="nuxt-link" to="/support/question"
          >質問</b-navbar-item
        >
        <b-navbar-item tag="nuxt-link" to="/support/policy">
          プライバシーポリシー
        </b-navbar-item>
        <b-navbar-item tag="nuxt-link" to="/support/contact">
          お問い合わせ
        </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-dropdown label="ユーザー設定" v-if="$store.state.auth === true">
        <b-navbar-item tag="nuxt-link" to="/setting/user"
          >ユーザーの情報</b-navbar-item
        >
        <b-navbar-item tag="nuxt-link" to="/setting/name"
          >ユーザー名の変更</b-navbar-item
        >
        <b-navbar-item
          class="has-text-danger"
          tag="nuxt-link"
          to="/setting/delete"
          >退会</b-navbar-item
        >
      </b-navbar-dropdown>
    </template>

    <template #end>
      <b-navbar-item
        tag="nuxt-link"
        to="/login"
        v-if="$store.state.auth !== true"
      >
        <b-button
          class="is-info"
          label="Googleアカウントでログイン"
          icon-left="google"
        />
      </b-navbar-item>
      <b-navbar-item tag="nuxt-link" to="/logout" v-else>
        <b-button class="is-primary" label="ログアウト" icon-left="logout" />
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<style>
.dictionary {
  font-size: 24px;
}
</style>

<script>
export default {
  data() {
    return {
      keyword: '',
    }
  },
  methods: {
    search: function () {
      this.$router.push('/search?keyword=' + this.keyword)
    },
  },
  computed: {
    check: function () {
      if (this.keyword.length < 2) {
        return true
      } else {
        return false
      }
    },
  },
}
</script>
