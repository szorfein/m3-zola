#!/usr/bin/env sh

set -o errexit

version="3.2.4"

echo "update script"

create_dir() {
  [ -d "$1" ] || {
    echo "Creating dir $1"
    mkdir -p "$1"
  }
}

create_dir "static/css"
create_dir "static/js"

echo "Download vuetify.min.css"
curl -o static/css/vuetify.min.css "https://cdn.jsdelivr.net/npm/vuetify@$version/dist/vuetify.min.css"
echo "Download vue.global.js"
curl -o static/js/vue.global.js -sL https://unpkg.com/vue@3/dist/vue.global.prod.js
echo "Download vuetify.min.js"
curl -o static/js/vuetify.min.js "https://cdn.jsdelivr.net/npm/vuetify@$version/dist/vuetify.min.js"
