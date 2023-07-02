<template>
  <div>
    <div class="mb-2">
      <h1 class="title">ユーザー名の変更</h1>
      <h2 class="subtitle">現在のユーザー名:{{ $store.state.user.name }}</h2>
      <b-field label="ユーザー名">
        <b-input v-model="name" maxlength="30"></b-input>
      </b-field>

      <div>
        <b-notification
          title="成功しました!"
          type="is-success"
          has-icon
          v-model="success"
        >
          ユーザー名の変更に成功しました!<br />
          あなたの名前は{{ $store.state.user.name }}です。
        </b-notification>
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
      </div>

      <div class="content">
        <ul>
          <li v-bind:class="{ 'has-text-success': !check }">
            名前は1～30文字です。
          </li>
          <li>偽名・ニックネームなどでも構いません。</li>
          <li>名前は第三者に公開されません。</li>
        </ul>
      </div>

      <b-button
        type="is-info"
        v-bind:disabled="check"
        expanded
        @click="change()"
        >変更</b-button
      >
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'Check',
  head() {
    return {
      title: 'ユーザー名の変更',
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }],
    }
  },
  data() {
    return {
      error: false,
      error_text: '',
      success: false,
    }
  },
  async asyncData({ store }) {
    const name = store.state.user.name

    return { name: name }
  },
  computed: {
    check: function () {
      if (!this.name || this.name.length > 30) {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    change: function () {
      this.error = false

      let formData = new FormData()

      formData.append('name', this.name)

      this.$axios
        .$post('/api/setting/name', formData)
        .then((res) => {
          this.$store.commit('setAuth', {
            token: res.access_token,
            user: res.user,
          })

          this.success = true
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
