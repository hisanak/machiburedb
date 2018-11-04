args = process.argv;
if (args.length != 4) {
  console.log('usge: ' + args[0] + ' ' + args[1] + ' <source item db> <target item db>');
  process.exit(1);
}

var parse_quest_level = function(quest) {
  var re = new RegExp(/^([\-0-9a-zA-z]+)\-([NHE]+)$/);
  var m = quest.match(re);
  if (m === null) {
    console.log('quest:', quest, 'does not match to pattern');
    return [];
  }
  var l = m[2].split('').map(x => m[1] + '-' + x);
  return l;
}

var find_quest_for_each_item = function(items, output) {
  for (var i = 0; i < output.length; i++) {
    var item = output[i];
    var ex_quest = [];
    for (var j = 0; j < item.quest.length; j++) {
      var quest = item.quest[j];
      var q = parse_quest_level(quest);
//      console.log("check", quest, q);
      ex_quest = ex_quest.concat(q);
    }
    item.ex_quest = ex_quest;
//    console.log("result", item.ex_quest);
  }
}


var items = require(args[2]);
var result = require(args[2]);

find_quest_for_each_item(items, result);

var fs = require('fs');
fs.writeFile(args[3], JSON.stringify(result, null, 4), function(err) {
  if (err) throw err;
});




