FROM node:10.15.3
ENV HOME=/home/app/
RUN mkdir $HOME && chmod -R 0777 $HOME
WORKDIR $HOME
COPY \
  package.json \
  angular.json \
  tsconfig.json \
  $HOME
RUN npm i express
RUN npm i path
RUN npm i body-parser
RUN npm i request
RUN npm install
COPY dist $HOME/dist
COPY server $HOME/server
EXPOSE 8080
CMD ["npm", "start"]
