FROM node:14.19.3-buster-slim
RUN mkdir -p /BigIS/templates
#Configure working directory
COPY ./templates/package.json /BigIS/templates/package.json
COPY ./templates/node_modules/ /BigIS/templates/node_modules/
WORKDIR /BigIS/templates
#RUN curl -sL https://deb.nodesource.com/setup_14.x |bash -
#RUN apt-get install -y nodejs
#RUN npm config set registry https://registry.npm.taobao.org
RUN npm install -g npm --force
RUN npm install -g yarn --force
#RUN yarn config set registry https://registry.npm.taobao.org
RUN yarn install
EXPOSE 8080
