<template>
  <div class="content">
    <h1>質問 Q&A</h1>
    <div class="mb-2">
      <b-field label="絞り込み">
        <b-input v-model="keyword"></b-input>
      </b-field>
    </div>

    <div>
      <div class="mb-2 qa" v-for="(list, id) in filterdata" :key="id">
        <div class="question mb-1">
          <b-icon icon="help" size="is-small"> </b-icon>
          {{ list.q }}
        </div>
        <div class="answer">
          <b-icon icon="exclamation" size="is-smaill"></b-icon>
          {{ list.a }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Q&A',
    }
  },
  data() {
    return {
      keyword: '',
      question: [
        { q: '利用は無料ですか?', a: '利用は完全無料です。' },
        { q: '利用するには?', a: 'Googleアカウントが必要です' },
        {
          q: '辞書はSNS等を使って他者と共有できますか?',
          a: 'いいえ、できません。どうしても共有したい場合は、スクリーンショット等を使用してください。',
        },
        {
          q: 'ユーザーの情報や辞書は他人に見えますか?',
          a: 'いいえ、見えません。',
        },
        {
          q: 'アカウントの名の変更のメリットは?',
          a: 'アカウント名は外部に知られる事はありませんが、それでも本名の表示に抵抗がある人向けです。',
        },
        {
          q: '退会できますでしょうか?',
          a: '設定にて可能です。',
        },
        {
          q: '退会した場合、データを復元できますでしょうか?',
          a: 'いいえ、できません',
        },
      ],
    }
  },
  computed: {
    filterdata: function () {
      var question = []

      for (var i in this.question) {
        var data = this.question[i]

        if (
          data.q.indexOf(this.keyword) !== -1 ||
          data.a.indexOf(this.keyword) !== -1
        ) {
          question.push(data)
        }
      }

      return question
    },
  },
}
</script>

<style>
.qa {
  border: 1px solid black;
}

.question {
  color: white;
  background: black;
  padding: 10px;
}

.answer {
  padding: 10px;
}
</style>
