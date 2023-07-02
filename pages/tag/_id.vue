<template>
  <div>
    <div v-if="!error">
      <h1 class="title">タグ名:{{ $route.params.id }}</h1>
      <div>
        <div class="card mb-3" v-for="(data, id) in list" :key="id">
          <div class="card-content">
            <p class="title">
              <nuxt-link :to="'/dictionary/' + data.id">{{
                data.title
              }}</nuxt-link>
            </p>
            <div class="tags">
              <b-taglist>
                <b-tag type="is-info" v-for="(list, id) in data.tags" :key="id">
                  <nuxt-link class="white" :to="'/tag/' + list">{{
                    list
                  }}</nuxt-link>
                </b-tag>
              </b-taglist>
            </div>
          </div>
          <footer class="modal-card-foot">
            <b-button
              label="編集"
              type="is-info"
              expanded
              tag="nuxt-link"
              :to="'/dictionary/edit/' + data.id"
            />
          </footer>
        </div>
      </div>
      <b-pagination :total="total" :per-page="perPage" v-model="page">
        <template #default="props">
          <b-pagination-button
            :page="props.page"
            :id="'page' + props.page.number"
            tag="nuxt-link"
            :to="'/dictionary?page=' + props.page.number"
          >
            {{ props.page.number }}
          </b-pagination-button>
        </template>
      </b-pagination>
    </div>
    <div v-else>
      <b-notification type="is-danger" role="alert" :closable="false">
        辞書の取得に失敗しました。<br />
        時間を置いてから再度お試しください。<br />
        いつまでも解決しない場合は、<nuxt-link to="/support/contact"
          >お問い合わせ</nuxt-link
        >にてお伝えしていただけると幸いです。
      </b-notification>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'Check',
  head() {
    return {
      title: 'タグ「' + this.$route.params.id + '」を含む辞書',
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }],
    }
  },
  data() {
    return {
      error: false,
      perPage: 12,
    }
  },
  async asyncData({ route, $axios, error }) {
    const tag = route.params.id
    let page = 1
    if (route.query.page) {
      page = route.query.page
    }

    const url = '/api/tag/' + tag + '?page=' + page

    try {
      const dictionary = await $axios.$get(url)

      return {
        list: dictionary.data,
        total: dictionary.total,
        page: parseInt(page),
      }
    } catch {
      error({})
    }
  },
}
</script>
