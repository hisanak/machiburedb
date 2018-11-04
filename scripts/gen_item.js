args = process.argv;
if (args.length != 5) {
  console.log('usge: ' + args[0] + ' ' + args[1] + ' <source item db> <source quest db> <target quest db>');
  process.exit(1);
}

var items = require(args[2]);
var stages = require(args[3]);
var result = require(args[3]);

var parse_quest_level = function(quest) {
  var re = new RegExp(/^([0-9\-a-zA-z]+)\-([NHE]+)$/);
  var m = quest.match(re);
  if (m === null) {
    console.log('quest:', quest, 'does not match to pattern');
    return [];
  }
  var l = m[2].split('').map(x => m[1] + '-' + x);
  return l;
}

var parse_stages = function(input, output) {
  for (var i = 0; i < input.length; i++) {
    var stage = input[i];
    var t = [];
    for (var j = 0; j < stage.quest.length; j++) {
      var quest = stage.quest[j];
      if (!quest.level) {
        quest.level = "NH";
      }
      var quests = quest.level.split('').map(x => new Object({id: `${stage.id}-${j+1}-${x}`, name: quest.name}));
      t = t.concat(quests);
    }
    output[i].ex_quest = t;
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
    for (var j = 0; j < stage.ex_quest.length; j++) {
      var quest = stage.ex_quest[j];
      quest.items = [];
      for (var k = 0; k < items.length; k++) {
        var item = items[k];
        for (var l = 0; l < item.quest.length; l++) {
          var iq = parse_quest_level(item.quest[l]);
          for (var m = 0; m < iq.length; m++) {
//            console.log(iq[m], quest.id);
            if (iq[m] === quest.id) {
              quest.items.push(item.id);
            }
          }
        }
      }
    }
  }
}

parse_stages(stages, result);
find_quest_for_each_item(items, result);


var fs = require('fs');
fs.writeFile(args[4], JSON.stringify(result, null, 4), function(err) {
  if (err) throw err;
});


