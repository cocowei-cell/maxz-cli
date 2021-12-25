#!/bin/bash/env
set -e

#Your Commander
kill -9 `lsof -t -i:$1`