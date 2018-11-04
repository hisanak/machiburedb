args = process.argv;
if (args.length != 5) {
  console.log('usge: ' + args[0] + ' ' + args[1] + ' <source item db> <source quest db> <target quest db>');
  process.exit(1);
}


var parse_stages = function(input, output) {
  for (var i = 0; i < input.length; i++) {
    var stage = input[i];
    var t = [];
    for (var j = 0; j < stage.quest.length; j++) {
      var quest = stage.quest[j];
      var t = output[i].quest[j].level = {};
      var levels = output[i].quest[j].levels;
      if (levels == undefined) {
        levels = output[i].quest[j].levels = "NH";
      }
      for (var k = 0; k < levels.length; k++) {
        var l = levels[k];
        t[l] = {id: `${stage.id}-${j+1}-${l}`, items: []};
      }
    }
  }
}

var search_quest_in_item = function(quest, item) {
  var ret = [];
//  var re = new RegExp(quest);
  for (let i = 0; i < item.quest.length; i++) {
    /*
    let q = item.quest[i].match(re);
    if (q) {
      let t = q[2].split('').map(x => q[1] + x);
      console.log(t);
      return t;
    }
    */
    var iq = new Set(parse_quest_level(item.quest[i]));
    if (iq.has(quest)) {
      ret.push(item);
      console.log(ret);
      continue;
    }
  }
  return ret;
}

var find_quest_for_each_item = function(items, output) {
  for (var i = 0; i < output.length; i++) {
    var stage = output[i];
    for (var j = 0; j < stage.quest.length; j++) {
      var quest = stage.quest[j];
      for (var k = 0; k < quest.levels.length; k++) {
        var level = quest.level[quest.levels[k]];
        for (var l = 0; l < items.length; l++) {
          var item = items[l];
          for (var m = 0; m < item.ex_quest.length; m++) {
            var iq = item.ex_quest[m];
            if (iq === level.id) {
              level.items.push(item.id);
            }
          }
        }
      }
    }
  }
}

var items = require(args[2]);
var stages = require(args[3]);
var result = JSON.parse(JSON.stringify(stages));

parse_stages(stages, result);
find_quest_for_each_item(items, result);


var fs = require('fs');
fs.writeFile(args[4], JSON.stringify(result, null, 4), function(err) {
  if (err) throw err;
});


