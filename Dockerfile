# STEP 1
FROM node:19 AS builder

WORKDIR /app

COPY . .

RUN npm install --silent

RUN npm run build

EXPOSE 3000

# STEP 2
FROM node:19-alpine

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app ./

CMD ["node","dist/main"]