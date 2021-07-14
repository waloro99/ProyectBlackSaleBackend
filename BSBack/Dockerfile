FROM node:10-slim
WORKDIR /index
COPY package.json /index
COPY package-lock.json /index
RUN npm install
COPY . /index
EXPOSE 3306
CMD ["npm", "run", "dev"]