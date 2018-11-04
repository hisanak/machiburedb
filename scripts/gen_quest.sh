#!/bin/bash
set -x

node scripts/parse_quest_levels_in_each_item.js '../db/orig_item.json' 'db/item.json'

TARGETS='world1 week event unknown'
for TARGET in $TARGETS;
do
  node scripts/find_items_drops_in_each_quest.js '../db/item.json' '../db/orig_'$TARGET'.json' 'db/'$TARGET'.json'
done

