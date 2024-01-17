#!/bin/bash

kubectl apply -f db-service.yml
kubectl apply -f db-secrets.yml
kubectl apply -f db-pvc.yml
kubectl apply -f db-pv.yml
kubectl apply -f db-deployment.yml