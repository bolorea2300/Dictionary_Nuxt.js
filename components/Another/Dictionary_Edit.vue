<template>
  <div>
    <div class="frame">
      <b-field label="タイトル">
        <b-input v-model="edit.title" maxlength="30"></b-input>
      </b-field>

      <b-field label="タグ">
        <b-taginput
          v-model="edit.tags"
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
          v-model="edit.explain"
          maxlength="1000"
          type="textarea"
          :rows="rows"
        ></b-input>
      </b-field>

      <div class="mb-3">
        <p>作成時間:{{ time(edit.created_at) }}</p>
        <p>更新時間:{{ time(edit.updated_at) }}</p>
      </div>

      <b-button
        type="is-success"
        v-bind:disabled="check"
        expanded
        @click="update()"
        >投稿</b-button
      >
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

let count
export default {
  props: ['edit'],
  data() {
    return {
      toggle: false,
    }
  },
  methods: {
    update: function () {
      let formData = new FormData()

      formData.append('dictionary_id', this.$route.params.id)
      formData.append('title', this.edit.title)
      formData.append('tags', this.edit.tags)
      formData.append('explain', this.edit.explain)

      this.$axios
        .$post('/api/dictionary/update', formData)
        .then((res) => {
          this.edit = res
          this.success('成功しました!')
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.error('入力内容に誤りがありました。')
          } else {
            this.error('更新に失敗しました。')
          }
        })
    },
    success: function (text) {
      this.$buefy.snackbar.open({
        duration: 5000,
        message: text,
        type: 'is-success',
        position: 'is-top',
        actionText: '閉じる',
        queue: false,
      })
    },
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
  computed: {
    check: function () {
      if (
        !this.edit.title ||
        this.edit.tags.length === 0 ||
        !this.edit.explain ||
        this.edit.title.length > 30 ||
        this.edit.tags.length > 20 ||
        this.edit.explain.length > 1000
      ) {
        return true
      } else {
        return false
      }
    },
    rows() {
      count = this.edit.explain.split(/\r\n|\r|\n/)

      if (count.length > 5) {
        return count.length
      } else {
        return 5
      }
    },
  },
}
</script>

<style>
.frame {
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 30px;
}
</style>
