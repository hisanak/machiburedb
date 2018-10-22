<template>
  <div class="mbc-items">
    <h1>素材名から検索</h1>
    <div class="sel_list">
      <div class="sel_item" v-for="group in groups" :key="group.id">
        <div class="item_bundle">
          <input type="checkbox" :id="group.id" :value="group.id" v-model="checked_groups" />
          <label :for="group.id">{{ group.name }}</label>
        </div>
      </div>
    </div>
    <div class="sel_list" v-if="showItems">
      <div class="sel_item" v-for="item in items" :key="item.item_id">
        <div class="item_bundle">
          <input type="checkbox" :id="item.sel_id" :value="item.sel_id" v-model="checked_items" />
          <label :for="item.sel_id">{{ item.item_name }}</label>
        </div>
      </div>
    </div>
    <div class="quest_list">
      <div class="seled_quest" v-if="showQuests">
        <div v-if="showNotCompleted">
          <p><strong>※未完成(更新中)</strong></p>
        </div>
        <div v-if="quest_ids.length == 0">
          <p>No Result</p>
        </div>
        <div v-else v-for="quest in quests" :key="quest.id">
            <p>{{ quest.name }}（<span v-if="quest.n" style="color: #606060;">{{ quest.n }}</span>{{ quest.n_h }}<span v-if="quest.h" style="color: #C00000;">{{ quest.h }}</span>{{ quest.h_e }}<span v-if="quest.e" style="color: #800080;">{{ quest.e }}</span>）</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'マチブレ素材集め -素材名から検索-',
      description: 'マチガイブレイカーの非公式攻略Webページです。素材を選ぶことでドロップするクエストを検索できます。',
      item_data: [],
      quest_world1_data: [],
      quest_week_data: [],
      quest_event_data: [],
      groups: [{name: 'ブキ素材', id: 'W'}, {name: 'スピリット素材', id: 'S'}, {name: '玉素材', id: 'B'}, {name: 'イベント素材', id: 'E'}],
      checked_groups: [],
      items: [],
      checked_items: [],
      quests: [],
      quest_ids: [],
      showItems: false,
      showQuests: false,
      showNotCompleted: false,
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
        { hid: 'items-twitter:image', name: 'twitter:image', content: 'http://mbc.hisana.me/img/items_thumb.png' } 
      ]
    }
  },
  watch: {
    checked_items: {
      handler: function(newValue) {
        this.showQuests = false;
        this.narrowQuests();
        this.parseQuests();
        this.showQuests = true;
      }
    }
  },
  mounted() {
    this.item_data = require('../db/item.json');
    this.quest_world1_data = require('../db/world1.json');
    this.quest_week_data = require('../db/week.json');
    this.quest_event_data = require('../db/event.json');
    this.quest_unknown_data = require('../db/unknown.json');
    this.parseItems();
    this.showItems = true;
    this.showQuests = true;
  },
  methods: {
    parseItems: function() {
      for (let i = 0; i < this.item_data.length; i++) {
        const item = this.item_data[i];
//        console.log(item.name);
        if (item.quest.length > 0) {
          this.items.push({sel_id: 'sel' + i, item_id: item.num, item_name: item.name});
        }
      }
    },
    narrowQuests: function() {
      if (this.checked_items.length == 0) {
        this.quest_ids = [];
        return;
      }
      this.quest_ids = this.getQuests(0);
      for (let i = 1; i < this.checked_items.length; i++) {
        const b = new Set(this.getQuests(i));
        const a = new Set(this.quest_ids);
        const a_and_b = new Set([...a].filter(e => (b.has(e))));
        this.quest_ids = [...a_and_b];
      }
//      console.log(this.quests);
    },
    getQuests: function(index) {
      // 'selXYZ' -> int('XYZ')
      const id = parseInt(this.checked_items[index].slice(3), 10);
      const raw_quests = this.item_data[id].quest;
      const quests = raw_quests.map(x => x.split(':')[0]);
      return quests;
    },
    parseQuests: function() {
      this.showNotCompleted = false;
      this.quests = [];
      var quests = [];
      for (let i = 0; i < this.quest_ids.length; i++) {
        const quest_id = this.quest_ids[i];
        const qid = quest_id.split('-');
        try {
          if (qid[0] == '1') {
            const l1 = parseInt(qid[1], 10) - 1;
            const l2 = parseInt(qid[2], 10) - 1;
            let quest = {name: this.quest_world1_data[l1].name + ': ' + this.quest_world1_data[l1].quest[l2].name};
            this.parseLevels(quest, qid[3]);
            quests.push(quest);
          }
          else if (qid[0] == 'E') {
            const l1 = parseInt(qid[1], 10) - 1;
            let quest = {name: this.quest_event_data[l1].name};
            this.parseLevels(quest, qid[2]);
            quests.push(quest);
          }
          else if (qid[0] == 'W') {
            const l2 = parseInt(qid[2], 10) - 1;
            let quest = {name: this.quest_week_data[qid[1]].name + ': ' + this.quest_week_data[qid[1]].quest[l2].name};
            this.parseLevels(quest, qid[3]);
            quests.push(quest);
          }
          else if (qid[0] == 'U') {
            const l1 = parseInt(qid[1], 10) - 1;
            let quest = {name: "不明: " + this.quest_unknown_data[l1].name};
            this.parseLevels(quest, qid[2]);
            quests.push(quest);
          }
          else if (qid[0] == 'M') {
            this.showNotCompleted = true;
          }
          else {
            throw 'Unknown Class';
          }
        }
        catch (e) {
          console.log("parsing:", qid, "(orig:", quest_id);
          console.log(e);
        }
      }
      this.quests = quests;
    },
    parseQuest: function(quest_id) {
      if (Object.keys(quest_id).length == 0) {
        return 'No Result';
      }
      const qid = quest_id.split('-');
      try {
        if (qid[0] == '1') {
          const l1 = parseInt(qid[1], 10) - 1;
          const l2 = parseInt(qid[2], 10) - 1;
          let quest = {name: this.quest_world1_data[l1].name + ': ' + this.quest_world1_data[l1].quest[l2].name}
          this.parseLevels(quest, qid[3]);
//            + this.parseLevels(qid[3]);
        }
        else if (qid[0] == 'E') {
          const l1 = parseInt(qid[1], 10) - 1;
          return this.quest_event_data[l1].name + this.parseLevels(qid[2]);
        }
        else if (qid[0] == 'W') {
          const l2 = parseInt(qid[2], 10) - 1;
          return this.quest_week_data[qid[1]].name + ': ' + this.quest_week_data[qid[1]].quest[l2].name + this.parseLevels(qid[3]);
        }
        else if (qid[0] == 'U') {
          const l1 = parseInt(qid[1], 10) - 1;
          return "不明: " + this.quest_unknown_data[l1].name + this.parseLevels(qid[2]);
        }
        else if (qid[0] == 'M') {
          this.showNotCompleted = true;
          return null;
        }
        else {
          throw e;
        }
      }
      catch (e) {
        console.log("parsing:", qid, "(orig:", quest_id);
        console.log(e);
      }
      return 'Not Found';
    },
    /*
    parseLevels(levels) {
      let larr = [...levels].map(x => this.parseLevel(x));
      return '(' + larr + ')';
    },
    */
    parseLevels(quest, desc) {
      const l2j = {N: 'ノーマル', H: 'ハード', E: 'エクストラ'};
      for (let i = 0; i < desc.length; i++) {
        if (desc[i] == 'N') {
          quest.n = 'ノーマル';
        }
        else if (desc[i] == 'H') {
          quest.h = 'ハード';
        }
        else if (desc[i] == 'E') {
          quest.e = 'エクストラ';
        }

        quest.n_h = quest.h_e = null;
        if (quest.n && quest.h) {
          quest.n_h = '、';
        }
        if (quest.h && quest.e) {
          quest.h_e = '、';
        }
        if (quest.n && quest.h && quest.n_h == null && quest.h_e == null) {
          quest.n_h = '、';
        }
      }
    },
    parseLevel(level) {
      const l2j = {N: 'ノーマル', H: 'ハード', E: 'エクストラ'};
      if (l2j[level]) {
        return l2j[level];
      }
      return 'Unknown';
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
div.sel_item {
  width: 25%;
  height: auto;
  float: left;
  vertical-align: middle;
  display: table-cell;
  border: 1px #C0C0C0 solid;
}
div.item_bundle {
  width: auto;
  height: auto;
  padding-left: 5px;
}
div.quest_list {
  align: center;
  width: 95%;
  margin: 10px auto;
  height: auto;
  border: 2px #000000 solid;
  padding: 4px;
}
div.seled_quest {
}
</style>

