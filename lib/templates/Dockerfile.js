module.exports = `
FROM node:8.12

# Create app directory
ENV APP_HOME /srv/app/
ENV NODE_ENV development

WORKDIR $APP_HOME
RUN apt-get update

COPY package.json $APP_HOME
# ADD ./node_modules /srv/app/node_modules
RUN npm install

COPY . $APP_HOME

# Set Environment variables at the end before running
ENV PORT 3000
EXPOSE $PORT

CMD ["npm", "start"]
`;
