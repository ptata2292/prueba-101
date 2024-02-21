# pull official base image
FROM node:lts
# Maintainer
Anil Kumar <anilkumar.golla@bostonlogix.com>

RUN apt-get update -y && apt-get upgrade -y
# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN  npm install -g @angular/cli

# add app
COPY . ./

RUN ng build --prod
# start app
CMD ng serve --port 8080 --host 0.0.0.0
EXPOSE 8080

