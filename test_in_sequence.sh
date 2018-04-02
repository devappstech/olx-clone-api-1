#!/usr/bin/env bash
for file in ./test/*test.js
do
echo $file
NODE_ENV=test jest $file -u --forceExit
done