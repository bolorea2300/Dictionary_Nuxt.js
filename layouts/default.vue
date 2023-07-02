<template>
  <div>
    <div class="container">
      <Header></Header>
      <div class="p-10">
        <Nuxt></Nuxt>
      </div>
    </div>
    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered w-100">
          <p>©2023　ひみつ辞書</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style></style>

<script>
import Header from '@/components/Header.vue'

export default {
  data() {
    return {}
  },
  components: {
    Header,
  },
}
</script>

<style>
.w-100 {
  width: 100%;
}
</style>
