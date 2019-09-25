FROM node:10.15.3
ENV HOME=/home/app/
RUN mkdir $HOME && chmod -R 0777 $HOME
WORKDIR $HOME
COPY \
  package.json \
  angular.json \
  tsconfig.json \
  $HOME
COPY dist $HOME/dist
RUN npm i express
RUN npm i body-parser
COPY server $HOME/server
EXPOSE 8080
CMD ["npm", "start"]
