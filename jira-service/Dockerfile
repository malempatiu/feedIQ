FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm uninstall @confluentinc/kafka-javascript
RUN npm install @confluentinc/kafka-javascript --no-package-lock

COPY . .

CMD ["npm", "run", "dev"]