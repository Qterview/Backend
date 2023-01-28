# STEP 1
FROM node:19 AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

# STEP 2
FROM node:19-alpine

WORKDIR /app

ENV BUILD_ENV production

COPY --from=builder /app ./

CMD ["node","dist/main"]