#!/bin/bash

set -eu
set -o pipefail

REQUEST_JSON=$(cat << EOS
{
  "private": false,
  "src_image_id": "ShGjDA",
  "captions_attributes": [
    {
      "text": "Suck it",
      "top_left_x_pct": 0.0,
      "top_left_y_pct": 0.0,
      "width_pct": 0.9,
      "height_pct": 0.25
    },
    {
      "text": "Joel",
      "top_left_x_pct": 0.05,
      "top_left_y_pct": 0.75,
      "width_pct": 0.9,
      "height_pct": 0.25
    }
  ]
}
EOS)

# To make an authenticated request add:
# --header "Authorization: Token token=\"<your API token>\""
CREATE_RESPONSE=$(
  echo "$REQUEST_JSON" | \
  curl \
    --data @- \
    --header 'Content-Type: application/json' \
    --fail \
    http://memecaptain.com/api/v3/gend_images
)

STATUS_URL=$(echo "$CREATE_RESPONSE" | jq --raw-output '.status_url')

i=0
while true; do
  RESPONSE=$(curl --fail $STATUS_URL)
  IN_PROGRESS=$(echo "$RESPONSE" | jq --raw-output '.in_progress')
  if [ "$IN_PROGRESS" = "false" ]; then
    ERROR=$(echo "$RESPONSE" | jq --raw-output '.error')
    if [ "$ERROR" = "null" ]; then
      echo "$RESPONSE" | jq --raw-output '.url'
      exit 0
    else
      echo "$ERROR"
      exit 1
    fi
  fi
  i=$(( $i + 1 ))
  if [ "$i" -ge 10 ]; then
    echo "$RESPONSE" | jq .
    exit 1
  fi
  sleep 3
done