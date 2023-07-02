<template>
  <div>
    <h1 class="title">辞書の作成</h1>

    <b-field label="タイトル">
      <b-input v-model="title" maxlength="30"></b-input>
    </b-field>

    <b-field label="タグ">
      <b-taginput
        v-model="tags"
        ellipsis
        icon="label"
        placeholder="タグを追加する"
        aria-close-label="タグを削除する"
        maxlength="20"
      >
      </b-taginput>
    </b-field>

    <b-field label="説明文">
      <b-input
        v-model="explain"
        maxlength="1000"
        type="textarea"
        :rows="rows"
      ></b-input>
    </b-field>

    <b-button
      type="is-success"
      v-bind:disabled="check"
      expanded
      @click="create()"
      >投稿</b-button
    >
  </div>
</template>

<script>
let count

export default {
  middleware: 'Check',
  head() {
    return {
      title: '新規辞書の作成',
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }],
    }
  },
  data() {
    return {
      title: '',
      tags: [],
      explain: '',
      error: false,
    }
  },
  computed: {
    rows() {
      count = this.explain.split(/\r\n|\r|\n/)

      if (count.length > 5) {
        return count.length
      } else {
        return 5
      }
    },
    check: function () {
      if (
        !this.title ||
        this.tags.length === 0 ||
        !this.explain ||
        this.title.length > 30 ||
        this.tags.length > 20 ||
        this.explain.length > 1000
      ) {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    create: function () {
      let formData = new FormData()

      formData.append('title', this.title)
      formData.append('tags', this.tags)
      formData.append('explain', this.explain)

      this.$axios
        .$post('/api/dictionary/create', formData)
        .then((res) => {
          this.$router.push('/dictionary/edit/' + res)
        })
        .catch((error) => {
          this.error()
        })
    },
    error: function () {
      if (error.response.status === 422) {
        this.$buefy.snackbar.open({
          duration: 5000,
          message: '入力内容に誤りがありました。',
          type: 'is-danger',
          position: 'is-top',
          actionText: '閉じる',
          queue: false,
        })
      } else {
        this.$buefy.snackbar.open({
          duration: 5000,
          message: '作成に失敗しました。',
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
