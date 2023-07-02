<template>
  <div>
    <div v-if="dictionary">
      <div class="mb-3">
        <b-button
          label="プレビュー"
          type="is-success"
          expanded
          tag="nuxt-link"
          :to="'/dictionary/' + $route.params.id"
        />
      </div>

      <Dictionary-Edit :edit="dictionary"></Dictionary-Edit>

      <div>
        <b-button type="is-danger" expanded @click="dialog = true"
          >単語を追加する</b-button
        >
      </div>

      <div class="mt-3">
        <b-table
          :data="word"
          :opened-detailed="OpenedDetails"
          detailed
          detail-key="id"
          :bordered="true"
        >
          <template #detail="props">
            <article class="media">
              <div class="media-content">
                <div class="content text">{{ props.row.explain }}</div>
              </div>
            </article>
          </template>

          <b-table-column id="title" label="タイトル" v-slot="props">
            {{ props.row.title }}
          </b-table-column>

          <b-table-column label="編集" v-slot="props">
            <b-button
              size="is-small"
              type="is-info"
              @click="confirm_edit(props.row)"
              >編集</b-button
            >
            <b-button
              size="is-small"
              type="is-danger"
              @click="confirm_del(props.row)"
              >削除</b-button
            >
          </b-table-column>
        </b-table>
      </div>

      <div class="mt-100p">
        <b-button type="is-danger" expanded @click="dictionary_modal()"
          >辞書を削除する</b-button
        >
      </div>

      <b-modal v-model="dialog">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">単語を追加する</p>
          </header>
          <div class="card-content">
            <b-field label="タイトル">
              <b-input v-model="word_title"></b-input>
            </b-field>

            <b-field label="説明文">
              <b-input
                v-model="word_explain"
                maxlength="10000"
                type="textarea"
                :rows="explain_rows"
              ></b-input>
            </b-field>

            <b-button
              type="is-info"
              expanded
              v-bind:disabled="add_check"
              @click="word_create()"
              >追加する</b-button
            >
          </div>
          <footer class="modal-card-foot">
            <b-button label="閉じる" expanded @click="dialog = false" />
          </footer>
        </div>
      </b-modal>

      <b-modal v-model="del_confirm">
        <div class="card">
          <div v-if="del_data">
            <header class="card-header">
              <p class="card-header-title">
                <span class="red">{{ del_data.title }}</span
                >を削除する
              </p>
            </header>
            <div class="card-content">
              <div>
                <b-button type="is-danger" expanded @click="word_delete()"
                  >削除する</b-button
                >
              </div>
              <p>一度削除した単語は<span class="red">削除できません</span>。</p>
              <p>削除前にタイトルをご確認ください。</p>
            </div>
            <footer class="modal-card-foot">
              <b-button
                label="削除しない"
                type="is-info"
                expanded
                @click="del_confirm = false"
              />
            </footer>
          </div>
        </div>
      </b-modal>

      <b-modal v-model="edit_confirm">
        <div class="card">
          <div v-if="edit_data">
            <header class="card-header">
              <p class="card-header-title">{{ edit_data.title }}を編集する</p>
            </header>
            <div class="card-content">
              <b-field label="タイトル">
                <b-input v-model="edit_data.title" maxlength="30"></b-input>
              </b-field>

              <b-field label="説明文">
                <b-input
                  v-model="edit_data.explain"
                  maxlength="1000"
                  type="textarea"
                  :rows="rows"
                ></b-input>
              </b-field>

              <b-button
                type="is-success"
                expanded
                @click="word_edit()"
                v-bind:diabled="edit_check"
                >編集する</b-button
              >
            </div>
            <footer class="modal-card-foot">
              <b-button
                label="閉じる"
                type="is-info"
                expanded
                @click="edit_confirm = false"
              />
            </footer>
          </div>
        </div>
      </b-modal>

      <b-modal v-model="dictionary_confirm">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">辞書を編集する</p>
          </header>
          <div class="card-content">
            <p>一度、削除した辞書は<span class="red">削除できません</span>。</p>
            <div>
              <b-field label="辞書のタイトルを入力してください">
                <b-input v-model="confirm_title" maxlength="30"></b-input>
              </b-field>
              <b-button
                type="is-danger"
                expanded
                @click="dictionary_delete()"
                v-bind:disabled="dictionary_check"
                >削除する</b-button
              >
            </div>
          </div>
          <footer class="modal-card-foot">
            <b-button
              label="閉じる"
              type="is-info"
              expanded
              @click="dictionary_confirm = false"
            />
          </footer>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
let count
let explain
import DictionaryEdit from '@/components/Another/Dictionary_Edit.vue'

export default {
  middleware: 'Check',
  components: {
    DictionaryEdit,
  },
  head() {
    return {
      title: this.dictionary.title + 'の編集',
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }],
    }
  },
  data() {
    return {
      error_text: '',
      toggle: false,
      word: [],
      dialog: false,
      OpenedDetails: [],
      //追加
      word_title: '',
      word_explain: '',
      //削除
      del_data: null,
      del_confirm: false,
      //編集
      edit_data: null,
      edit_confirm: false,
      //辞書削除
      dictionary_confirm: false,
      confirm_title: '',
    }
  },
  async asyncData({ redirect, route, $axios }) {
    const id = route.params.id

    const url = '/api/dictionary/' + id

    try {
      const dictionary = await $axios.$get(url)

      return {
        dictionary: dictionary,
        edit: dictionary,
      }
    } catch {
      redirect('/dictionary')
    }
  },
  methods: {
    tagsplit: function (str) {
      return str.split(',')
    },
    confirm_edit: function (data) {
      this.edit_data = data
      this.edit_confirm = true
    },
    confirm_del: function (data) {
      this.del_data = data
      this.del_confirm = true
    },
    word_create: function () {
      let formData = new FormData()

      formData.append('dictionary_id', this.$route.params.id)
      formData.append('title', this.word_title)
      formData.append('explain', this.word_explain)

      this.$axios
        .$post('/api/word/create', formData)
        .then((res) => {
          this.word_title = ''
          this.word_explain = ''
          this.dialog = false
          this.word = res
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.error('入力内容に誤りがありました。')
          } else {
            this.error('作成に失敗しました。')
          }
        })
    },
    word_edit: function () {
      let formData = new FormData()

      formData.append('word_id', this.edit_data.id)
      formData.append('dictionary_id', this.$route.params.id)
      formData.append('title', this.edit_data.title)
      formData.append('explain', this.edit_data.explain)

      this.$axios
        .$post('/api/word/update', formData)
        .then((res) => {
          this.word = res
          this.edit_data = null
          this.edit_confirm = false
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.error('入力内容に誤りがありました。')
          } else {
            this.error('更新に失敗しました。')
          }
        })
    },
    word_delete: function () {
      let formData = new FormData()

      formData.append('word_id', this.del_data.id)
      formData.append('dictionary_id', this.$route.params.id)

      this.$axios
        .$post('/api/word/delete', formData)
        .then((res) => {
          this.word = res
          this.del_data = null
          this.del_confirm = false
        })
        .catch((error) => {
          this.error('削除に失敗しました。')
        })
    },
    dictionary_modal: function () {
      this.dictionary_confirm = true
    },
    dictionary_delete: function () {
      let formData = new FormData()
      formData.append('dictionary_id', this.$route.params.id)

      this.$axios
        .$post('/api/dictionary/delete', formData)
        .then((res) => {
          this.dictionary_confirm = false
          this.$router.push('/dictionary')
        })
        .catch((error) => {
          this.error('削除に失敗しました。')
        })
    },
    error: function (text) {
      this.error_text = text
      this.$buefy.snackbar.open({
        duration: 5000,
        message: this.error_text,
        type: 'is-danger',
        position: 'is-top',
        actionText: '閉じる',
        queue: false,
      })
    },
  },
  computed: {
    rows() {
      count = this.edit.explain.split(/\r\n|\r|\n/)

      if (count.length > 5) {
        return count.length
      } else {
        return 5
      }
    },
    explain_rows() {
      explain = this.word_explain.split(/\r\n|\r|\n/)

      if (explain.length > 5) {
        return explain.length
      } else {
        return 5
      }
    },
    add_check: function () {
      if (
        !this.word_title ||
        !this.word_explain ||
        this.word_title.length > 30 ||
        this.word_explain.length > 10000
      ) {
        return true
      } else {
        return false
      }
    },
    edit_check: function () {
      if (
        !this.edit_data.title ||
        !this.edit_data.explain ||
        this.edit_data.title.length > 30 ||
        this.edit_data.explain.length > 10000
      ) {
        return true
      } else {
        return false
      }
    },
    dictionary_check: function () {
      if (this.confirm_title === this.dictionary.title) {
        return false
      } else {
        return true
      }
    },
  },
  mounted() {
    this.$axios
      .$get('/api/word/list/' + this.$route.params.id)
      .then((res) => {
        this.word = res
      })
      .catch((error) => {
        this.error('削除に失敗しました。')
      })
  },
}
</script>

<style>
.white {
  color: white;
}

.text {
  white-space: pre-wrap;
}

.red {
  color: red;
}

.mt-100p {
  margin-top: 100px;
}
</style>
