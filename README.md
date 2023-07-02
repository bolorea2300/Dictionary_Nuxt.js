# ひみつ辞書(フロントエンド側)

## 概要
- Laravel+Nuxt.jsにて開発した**会員制個人用辞書サイト**です。
- Googleアカウントにてログインして、個人で辞書を作って楽しむサイトです。
- SSRなので快適に各ページを移動できます。
- Vuexのactionsとmiddlewareによりページ生成前にログインチェックを行えます。

## 使用したフレームワークなど
- Nuxt.js、Buefy、Day.js、@nuxtjs/sitemap、@nuxtjs/axios、Vuex

## 画像一覧
- ログイン画面(Googleアカウントが必要です)
![ログイン画面](https://github.com/bolorea2300/Dictionary_Nuxt.js/blob/master/GitHub%E7%94%A8%E7%94%BB%E5%83%8F/%E3%83%AD%E3%82%B0%E3%82%A4%E3%83%B3.png?raw=true)

- あなたが作成した辞書の一覧を閲覧できます。
![辞書一覧](https://github.com/bolorea2300/Dictionary_Nuxt.js/blob/master/GitHub%E7%94%A8%E7%94%BB%E5%83%8F/%E8%BE%9E%E6%9B%B8%E9%96%B2%E8%A6%A7.png?raw=true)

- 辞書を作成できます。(タグにより探すのも楽です。)
![辞書作成](https://github.com/bolorea2300/Dictionary_Nuxt.js/blob/master/GitHub%E7%94%A8%E7%94%BB%E5%83%8F/%E8%BE%9E%E6%9B%B8%E8%BF%BD%E5%8A%A0.png?raw=true)

- 編集画面で単語を追加できます。
![単語追加](https://github.com/bolorea2300/Dictionary_Nuxt.js/blob/master/GitHub%E7%94%A8%E7%94%BB%E5%83%8F/%E5%8D%98%E8%AA%9E%E8%BF%BD%E5%8A%A0.png?raw=true)

- 編集や削除も容易に可能です。(APIによる処理なので、データの編集・削除に画面の移動を伴いません)
![編集・削除](https://github.com/bolorea2300/Dictionary_Nuxt.js/blob/master/GitHub%E7%94%A8%E7%94%BB%E5%83%8F/%E5%8D%98%E8%AA%9E%E3%83%AA%E3%82%B9%E3%83%88.png?raw=true)

- ログイン履歴にて不正なログインを確認できます。
![ログイン履歴](https://github.com/bolorea2300/Dictionary_Nuxt.js/blob/master/GitHub%E7%94%A8%E7%94%BB%E5%83%8F/%E3%83%AD%E3%82%B0%E3%82%A4%E3%83%B3%E5%B1%A5%E6%AD%B4.png?raw=true)
