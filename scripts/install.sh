#!/bin/bash

docker pull viruskin/pong:latest
docker stop pong_container || true
docker rm pong_container || true
docker run -d --name pong_container -p 2024:2024 viruskin/pong:latest

echo "Контейнер успешно запущен!"