#!/bin/bash

rm -rf dist && \
  npm run build:examples && \
  cp -r examples/* dist && \
  cd dist && \
  git init && \
  git remote add origin git@github.com:meriadec/react-mortal.git && \
  git add . && \
  git commit -m 'deploy' && \
  git push -f origin master:gh-pages && \
  printf '\n> everything has been deployed\n'
