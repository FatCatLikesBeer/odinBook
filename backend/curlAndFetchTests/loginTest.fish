#!/usr/local/bin/fish

echo Login
curl 'localhost:3001/apiv0/login' \
    --header "Content-Type: application/json" \
    --request POST \
    --data '{
      "email":"itisbilly@gmail.co",
      "password":"greenbottle"
      }'
