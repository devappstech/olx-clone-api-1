FROM node:6-alpine

RUN mkdir -p /app
ADD ./package.json /app/package.json
ADD ./package-lock.json /app/package-lock.json

WORKDIR /app/

RUN npm install --production -q

ADD ./ /app/

EXPOSE 3000

#Command to Run
CMD [ "npm", "start" ]
