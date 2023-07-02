<template>
  <div class="content">
    <b-modal v-model="preview" :width="700">
      <img :src="url" alt="プレビュー" />
    </b-modal>
    <h1>ひみつ辞書へようこそ!</h1>

    <div @click="image_on('辞書.png')">
      <b-image class="img" :src="'/image/辞書.png'" alt="画像"></b-image>
    </div>

    <h2>ひみつ辞書とは?</h2>
    <ul>
      <li>ひみつ辞書は『自分だけの辞書』を作れるサイトです。</li>
      <li>Googleアカウントがあれば、簡単にログイン可能です。</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Index',
  head() {
    return {
      title: 'ひみつ辞書',
      titleTemplate: null,
      meta: [
        {
          hid: 'description',
          property: 'description',
          content: '自分だけの辞書を作って楽しむサイトです。',
        },
      ],
    }
  },
  data() {
    return {
      preview: false,
      url: '',
    }
  },
  methods: {
    image_on: function (image_url) {
      this.url = '/image/' + image_url
      this.preview = true
    },
  },
}
</script>

<style>
.img {
  border: 1px solid black;
  max-width: 700px;
}
</style>
