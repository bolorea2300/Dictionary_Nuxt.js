<template>
  <div class="content">
    <h1 class="has-text-danger">{{ title }}</h1>
    <p>メッセージ：{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: Object,
      default: null,
    },
    message: {
      type: Object,
      default: null,
    },
  },
}
</script>
