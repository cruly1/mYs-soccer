FROM node:22-alpine

RUN groupadd -r appgroup && useradd -r -g appgroup mysuser

WORKDIR /app

RUN chown -R mysuser:appgroup /app

COPY package*.json ./

RUN mkdir -p /app/node_modules && chown -R mysuser:appgroup /app

RUN npm install --omit=dev

COPY . .

EXPOSE 3000

USER mysuser

ENTRYPOINT ["npm", "run", "start"]