<template>
  <div class="mbc-items">
    <h1>賢者の入手方法</h1>
    <div class="sel_list">
      <div class="sel_pundit" v-for="pundit in pundits" :key="pundit.id">
        <div class="item_bundle">
          <input type="radio" class="chkbox_group" :id="pundit" :value="pundit" v-model="checked_pundit" />
          <label class="" :for="pundit">{{ pundit }}</label>
        </div>
      </div>
    </div>
    <br />
    <div class="way_list" v-if="showHow">
      <div v-for="way in ways" :key="way.id">
        <p class="way">{{ way }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'マチブレ素材集め -賢者の入手方法-',
      description: 'マチガイブレイカーの非公式攻略Webページです。賢者を選ぶことで入手する方法を表示します。',
      pundits: undefined,
      pundit_data: require('../db/pundit.json'),
      checked_pundit: null,
      ways: ['賢者を選択してください'],
      showHow: false,
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'items-description', name: 'description', content: this.description },
        { hid: 'items-twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'items-twitter:title', name: 'twitter:title', content: 'マチブレ素材ドロップ検索' },
        { hid: 'items-twitter:description', name: 'twitter:description', content: this.description },
        { hid: 'items-twitter:image', name: 'twitter:image', content: 'http://mbc.hisana.me/img/pundits_thumb.png' } 
      ]
    }
  },
  watch: {
    checked_pundit: {
      handler: function(newValuse) {
        this.showHow = false;
        this.ways = this.gatherHow();
        this.showHow = true;
      }
    },
  },
  mounted() {
    this.pundits = Object.keys(this.pundit_data);
    this.showHow = true;
  },
  methods: {
    gatherHow: function() {
      console.log(this.checked_pundit);
      if (this.checked_pundit === undefined) {
        return ['賢者を選択してください'];
      }
      var raw_ways = this.pundit_data[this.checked_pundit];
      console.log(raw_ways);
      if (raw_ways === undefined) {
        return ['賢者を選択してください'];
      }
      var ways = [];
      for (var i = 0; i < raw_ways.length; i++) {
        var way = raw_ways[i];
        var t = 'x' + way.num + ' ' + way.expl;
        if (way.reset !== undefined) {
          t += '(回数リセット)';
        }
        if (way.price !== undefined) {
          t += ' ' + way.price + '円';
        }
        if (way.remark !== undefined) {
          t += ' ※' + way.remark;
        }
        ways.push(t);
      }
      return ways;
    }
  }
}
</script>

<style>
div.sel_list {
  align: center;
  margin: 0 auto;
  width: 95%;
  height: auto;
}
div.sel_list:after {
  display: block;
  clear: both;
  height: 0px;
  visibility: hidden;
  content: ".";
}
div.sel_pundit {
  width: 25%;
  height: auto;
  float: left;
  vertical-align: middle;
  display: table-cell;
  border: 0px #C0C0C0 solid;
}
div.item_bundle {
  display: inline-block;
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
}
div.way_list {
  align: center;
  width: 95%;
  margin: 10px auto;
  height: auto;
  border: 2px #000000 solid;
  padding: 4px;
}
p.way {
  font-size: 2.6vw;
}
</style>

