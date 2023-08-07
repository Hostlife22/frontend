#!/usr/bin/env bash

# https://graphql-ruby.org/javascript_client/sync.html#sync-utility

graphql-ruby-client sync \
  --path="src/{graphql/fragments,graphql/mutations,graphql/queries,generated/fragments,generated/queries}/**/*.graphql" \
  --url="$1" \
  --secret="$2" \
  --client=frontend \
  --add-typename \
  --outfile="src/generated/OperationStoreClient.js" \
  --header="changeset-version: $(cat src/graphql/.changeset_version)";

