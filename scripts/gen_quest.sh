#!/bin/bash
set -x

TARGETS='world1 week event unknown'

for TARGET in $TARGETS;
do
  node scripts/gen_item.js '../db/item.json' '../db/orig_'$TARGET'.json' 'db/'$TARGET'.json'
done

