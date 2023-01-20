# STEP 1
FROM node:19 AS builder

WORKDIR /app
COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["node","dist/main"]