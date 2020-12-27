FROM alpine:3.10
FROM isagarmandakki/shift-mbti

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3001
EXPOSE 3000

CMD ["npm", "start"]