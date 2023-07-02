<template>
  <div>
    <h1 class="title">お問い合わせ</h1>
    <p>
      動画・画像をアップロードしたい場合は、<a
        href="https://docs.google.com/forms/d/e/1FAIpQLSdbDvzrcoho77-Ww2x8IaxIzeSk8Hi3WG97dWyQbp2lvJxejQ/viewform?usp=sf_link"
        target="_blank"
        >こちら</a
      >からお問い合わせください。
    </p>
    <div>
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSeJX3GNtoHuyPgQygvZ3PqhGTsV5Uepf6_SOMdiyo6CHaxWxw/viewform?embedded=true"
        width="640"
        height="586"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        >読み込んでいます…</iframe
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  head() {
    return {
      title: 'お問い合わせ',
    }
  },
}
</script>
