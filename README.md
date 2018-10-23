# マチガイブレイカー素材検索(非公式)
[liica](http://www.liica.co.jp/) 社が提供する「[ツッコミクイズ RPG マチガイブレイカー](https://machibure.jp/)」の攻略を促進させるためのツールです。  
素材別にドロップクエスト名と、クエスト別にドロップする素材名の情報を提供します。  


## 環境構築
Vue.js 系のフレームワーク Nuxt.js を使用しています。  
実環境では static な html を吐いてます。  
Vue.js 系を使う理由はその思想が好きだとかそういうことではなく、  
Single File Components の .vue が好きなだけです。  

初回のみ環境をインストールしてください。  
テストする場合は、原則 1. の方法でサーバを起動してください。  

``` bash
# 環境インストール
$ npm install # Or yarn install

# 1. dynamic な Web を構築
# ソースコードの変更が逐一反映されるモードです。
# マシンスペックが足りない場合は 2. の方法を使ってください。
# 実行後 Web ブラウザで [localhost:3000](http://localhost:3000) を開いてください。
$ npm run dev

# 2. dynamic な Web を構築
# ソースコードの変更は、build をするまで反映されません。
# Web ブラウザで [localhost:3000](http://localhost:3000) を開いてください。
$ npm run build
$ npm start

# 3. static な Web を構築
# 主に本番環境用で使います。
# dist/ 以下に html や js などを生成します。
# root を dist/ に設定した Web ブラウザを別途立ち上げてください。
$ npm run generate
$ sudo systemctl start nginx #example
```
環境についてのその他の説明は [Nuxt.js docs](https://github.com/nuxt/nuxt.js) を参照してください。

