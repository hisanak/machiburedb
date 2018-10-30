args = process.argv;
if (args.length != 5) {
  console.log('usge: ' + args[0] + ' ' + args[1] + ' <source item db> <source quest db> <target quest db>');
  process.exit(1);
}

var items = require(args[2]);
var stages = require(args[3]);

var search_quest_in_item = function(quest, item) {
  var re = new RegExp(quest + '-[NHE]+');
  for (let i = 0; i < item.quest.length; i++) {
    let q = item.quest[i];
    if (q.match(re)) {
      return true;
    }
  }
  return false;
}

for (let i = 0; i < stages.length; i++) {
  let quests = stages[i].quest;
  for (let j = 0; j < quests.length; j++) {
    let quest = quests[j];
    quest.items = [];
    for (let k = 0; k < items.length; k++) {
      let item = items[k];
      if (search_quest_in_item(quest.id, item)) {
        quest.items.push(item.id);
      }
    }
  }
}

var fs = require('fs');
fs.writeFile(args[4], JSON.stringify(stages, null, 4), function(err) {
  if (err) throw err;
  //console.log('complete');
});


