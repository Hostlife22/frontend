#!/usr/bin/env bash

# Deletes NS in secondary languages, if NS was deleted in reference language
# See https://app.clickup.com/t/2179883/MP-4432

delete_ns_in_secondary_languages () {
  echo "Deleted NS found in reference language: $1"
  ns=$(ls src/locales | grep -v 'en' | sed "s/\(.*\)/src\/locales\/\1\/$1/")
  rm -f $ns
  echo $ns | xargs git add
}

git status --porcelain \
  | grep -E 'D\s+src\/locales\/en\/.*\.json' \
  | sed 's/^D\(.*\)src\/locales\/en\/\(.*\.json\)/\2/' \
  | while read -r line
    do
      delete_ns_in_secondary_languages "$line"
    done

# Prevents deleting NS only in secondary language

check_presence_of_deleted_ns_in_reference_language () {
  echo "Deleted NS found in secondary language: $1"
  find src/locales/en -name "$1" | grep -q "$1" && echo "Only deleted in secondary language: $1" && exit 1 || echo "OK"
}

git status --porcelain \
  | grep -E 'D\s+src\/locales\/.*\.json' \
  | grep -E -v 'D\s+src\/locales\/en' \
  | sed 's/\(.*\)D\(.*\)src\/locales\/\(.*\)\/\(.*\.json\)/\4/' \
  | while read -r line
    do
      check_presence_of_deleted_ns_in_reference_language "$line"
    done
