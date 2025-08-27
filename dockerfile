FROM debian:bullseye

RUN apt-get update && apt-get install -y ghostscript nodejs npm

WORKDIR /app
COPY . .

RUN npm install

EXPOSE 3000
CMD ["node", "server.js"]
