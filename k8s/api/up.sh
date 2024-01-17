#!/bin/bash

kubectl apply -f api-service.yml
kubectl apply -f api-secrets.yml
kubectl apply -f api-hpa.yml
kubectl apply -f api-deployment.yml