#!/usr/bin/env bash
export $(cat ./env/variables.env | xargs)
pm2 start ./env/scripts/ecosystem.config.js --update-env --ignore-watch="recv;scripts;.idea;log;tests"
