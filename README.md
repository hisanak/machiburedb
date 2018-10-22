# マチガイブレイカー素材検索(非公式)
[liica](http://www.liica.co.jp/) 社が提供する「[ツッコミクイズ RPG マチガイブレイカー](https://machibure.jp/)」の攻略を促進させるためのツールです。
素材別にドロップクエスト名と、クエスト別にドロップする素材名の情報を提供します。


## 環境構築
Vue.js 系のフレームワーク Nuxt.js を使用しています。
実環境では static な html を吐いてます。
Vue.js 系を使う理由はその思想が好きだとかそういうことではなく、
Single File Components の .vue が好きなだけです。

一度環境をインストールした後は、
テストする場合は、原則 dynamic な方法でサーバを起動してください。

``` bash
# 環境インストール
$ npm install # Or yarn install

# 1. dynamic な Web を構築
# Web ブラウザで [localhost:3000](http://localhost:3000) を開いてください。
$ npm run dev

# 2. static な Web を構築
$ npm run generate

# build for production and launch server
$ npm run build
$ npm start
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

