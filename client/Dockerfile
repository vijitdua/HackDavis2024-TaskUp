FROM node:21

ENV REACT_APP_BACKEND=taskup-server.vijitdua.xyz

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "build"]
