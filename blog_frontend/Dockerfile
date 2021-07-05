FROM node

WORKDIR /home/blog/frontend
COPY package.json /home/blog/frontend
COPY . .
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]