<template>
  <div>
    <div class="content mb-2">
      <h1>{{ dictionary.title }}</h1>
      <div class="tags">
        <b-taglist>
          <b-tag v-for="(list, id) in dictionary.tags" :key="id" type="is-info">
            <nuxt-link class="white" :to="'/tag/' + list">{{ list }}</nuxt-link>
          </b-tag>
        </b-taglist>
      </div>
      <div>
        <p class="text">{{ dictionary.explain }}</p>
      </div>
    </div>

    <div>
      <div class="mb-3">
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
        </b-table>
      </div>

      <div class="mb-3">
        <b-button
          label="編集"
          type="is-info"
          expanded
          tag="nuxt-link"
          :to="'/dictionary/edit/' + dictionary.id"
        />
      </div>

      <div>
        <p>作成時間:{{ time(dictionary.created_at) }}</p>
        <p>更新時間:{{ time(dictionary.updated_at) }}</p>
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
      title: this.dictionary.title,
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }],
    }
  },
  data() {
    return {
      word: [],
      OpenedDetails: [],
    }
  },
  async asyncData({ redirect, route, $axios }) {
    const id = route.params.id

    const url = '/api/dictionary/' + id

    try {
      const dictionary = await $axios.$get(url)

      return {
        dictionary: dictionary,
      }
    } catch {
      redirect('/dictionary')
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
</style>
