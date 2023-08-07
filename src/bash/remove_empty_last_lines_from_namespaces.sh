#!/usr/bin/env bash

# Pre-commit hook will pass a list of paths to translation files as argument

for arg; do
  gsed -z 's/\n*$//g' $arg > temp.json && mv temp.json $arg
done
