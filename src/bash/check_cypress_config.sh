#!/usr/bin/env bash

grep -F "pauseForVideo: 0," cypress.config.ts
grep -F "pauseForVideo: 0," cypress.test.e2e.config.ts
grep -F "pauseForVideo: 0," cypress.test.stubbed.config.ts