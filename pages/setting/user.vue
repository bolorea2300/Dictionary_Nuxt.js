<template>
  <div>
    <h1 class="title">あなたの情報</h1>
    <div class="card mb-3">
      <div class="card-content">
        <p class="title">ユーザー名:{{ user.name }}</p>
        <p class="subtitle">メールアドレス:{{ user.email }}</p>
      </div>
    </div>

    <div>
      <div class="content">
        <h2>ログイン履歴</h2>
        <ul>
          <li>
            第三者がログインしている場合、<span class="has-text-danger"
              >Googleアカウントが乗っ取られている可能性</span
            >があります。
          </li>
        </ul>
      </div>

      <div class="card mb-3" v-for="(list, id) in history" :key="id">
        <div class="card-content">
          <p class="title">IPアドレス:{{ user.ip_address }}</p>
          <p class="subtitle">ログイン時間:{{ time(user.created_at) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export default {
  middleware: 'Check',
  head() {
    return {
      title: 'ユーザー情報',
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }],
    }
  },
  data() {
    return {
      history: [],
    }
  },
  methods: {
    error: function (text) {
      this.$buefy.snackbar.open({
        duration: 5000,
        message: text,
        type: 'is-danger',
        position: 'is-top',
        actionText: '閉じる',
        queue: false,
      })
    },
    time: function (str) {
      var view = dayjs
        .utc(new Date(str))
        .tz('Asia/Tokyo')
        .format('YYYY-MM-DD HH:mm:ss')

      return view
    },
  },
  async asyncData({ store }) {
    const user = store.state.user

    return { user: user }
  },
  mounted() {
    this.$axios
      .$get('/api/user/history')
      .then((res) => {
        this.history = res
      })
      .catch((error) => {
        this.error('ログイン履歴の取得に失敗しました。')
      })
  },
}
</script>
