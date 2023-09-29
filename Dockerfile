FROM node:18.13.0-bullseye-slim AS builder
WORKDIR /app
ADD package.json /app/package.json
ADD package-lock.json /app/package-lock.json
RUN npm install
ADD . /app
RUN npm run build

FROM node:18.13.0-bullseye-slim
WORKDIR /app
ADD package.json /app/package.json
ADD package-lock.json /app/package-lock.json
RUN npm install --omit=dev --ignore-scripts
COPY --from=builder /app/dist ./dist
EXPOSE 5000
ENTRYPOINT [ "npm", "start" ]




