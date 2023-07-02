<template>
  <div>
    <h1 class="title has-text-danger">ユーザーを退会する</h1>

    <b-field label="あなたのメールアドレス">
      <b-input type="email" v-model="email"> </b-input>
    </b-field>

    <b-field label="あなたのユーザー名">
      <b-input v-model="name"> </b-input>
    </b-field>

    <div class="content">
      <ul>
        <li v-bind:class="{ 'has-text-success': !check }">
          あなたのメールアドレスと本サイトでのユーザー名を入力してください。
        </li>
        <li>
          退会した場合、<span class="has-text-danger"
            >復元する事はできません</span
          >ので、注意してください。
        </li>
        <li>
          質問がある場合は、<nuxt-link to="/support/contact"
            >お問い合わせフォーム</nuxt-link
          >をご利用ください。
        </li>
      </ul>
    </div>

    <div>
      <b-checkbox v-model="agreement"> 同意します </b-checkbox>
    </div>

    <b-notification
      title="失敗しました"
      type="is-danger"
      has-icon
      v-model="error"
    >
      {{ error_text }}<br />
      いつまでも解決しない場合は、<nuxt-link to="/support/contact"
        >お問い合わせ</nuxt-link
      >にてお伝えしていただけると幸いです。
    </b-notification>

    <b-button
      type="is-danger"
      v-bind:disabled="check"
      expanded
      @click="user_delete()"
      >退会する</b-button
    >
  </div>
</template>

<script>
export default {
  middleware: 'Check',
  head() {
    return {
      title: '退会',
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }],
    }
  },
  data() {
    return {
      email: '',
      name: '',
      agreement: false,
      error: false,
      error_text: '',
    }
  },
  computed: {
    user: function () {
      return this.$store.state.user
    },
    check: function () {
      if (
        !this.email ||
        !this.name ||
        this.email !== this.user.email ||
        this.name !== this.user.name ||
        this.agreement !== true
      ) {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    user_delete: function () {
      this.error = false

      let formData = new FormData()

      formData.append('email', this.email)
      formData.append('name', this.name)

      this.$axios
        .$post('/api/user/delete', formData)
        .then((res) => {
          this.$store.commit('logout')
          this.$router.replace('/')
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.error_text = '入力内容に誤りがあります。修正してください。'
          } else {
            this.error_text = '時間を置いてお試しください。'
          }

          this.error = true
        })
    },
  },
}
</script>
