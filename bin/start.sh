#!/usr/bin/env bash

BASE=$(dirname $0)
cd ${BASE}/..
pm2 start ./env/ecosystem.config.js --update-env --ignore-watch="recv;bin;.idea;log" --env production
