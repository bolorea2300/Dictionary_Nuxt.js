<template>
  <div class="content">
    <h1>プライバシーポリシー</h1>
    <ul>
      <li>このサイトを利用する前に</li>
      <ul>
        <li>
          このサイトは、企業ではなく<span class="red">個人が開発した</span
          >サイトです。
        </li>
      </ul>
    </ul>
    <ul>
      <li>取得した個人情報について</li>
      <ul>
        <li>
          登録された個人情報は利用者の同意なしに第三者に開示しません。
          ただし、法的な開示請求を求められた場合、利用者に同意を得ることなく開示する場合があります。
        </li>
      </ul>
    </ul>
    <ul>
      <li>個人情報に伴う責任</li>
      <ul>
        <li>
          個人情報の『漏洩』や第三者による『改ざん』等により生じた損害について、一切の責任を負いかねます。
        </li>
      </ul>
    </ul>
    <ul>
      <li>サイトの利用に伴う責任</li>
      <ul>
        <li>
          本サイトを利用した事で生じた損害等に関しては、一切の責任を負いかねます。
        </li>
      </ul>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Policy',
  head() {
    return {
      title: 'プライバシーポリシー',
    }
  },
}
</script>

<style>
.red {
  color: red;
}
</style>
