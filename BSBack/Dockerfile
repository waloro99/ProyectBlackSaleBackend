FROM node:10-slim
WORKDIR /index
COPY package.json /index
COPY package-lock.json /index
RUN npm install
COPY . /index
CMD ["npm", "start"]