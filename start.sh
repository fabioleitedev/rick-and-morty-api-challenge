#!/bin/bash
docker build -t fabioleitedev/simpleclubtest:latest .
docker-compose -f docker-compose.yaml up