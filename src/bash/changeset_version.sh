#!/usr/bin/env bash

HEADER="/* Generated in pre-commit hook. Do not edit. */";

echo "$HEADER const result = '$(cat src/graphql/.changeset_version)'; export default result;" > src/generated/changesetVersion.ts
