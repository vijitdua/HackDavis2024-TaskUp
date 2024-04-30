FROM node:21

ENV REACT_APP_BACKEND=http://taskup-server.vijitdua.xyz

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 3000

CMD ["npm", "start"]

#TODO: If time left, figure out why is run npm run BUILD, and serving build isn't working. Leave to dev mode otherwise
