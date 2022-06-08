FROM node:14.16.1
ARG DOCKER_SRC

RUN mkdir /app
WORKDIR /app

# Create react app
RUN npx create-react-app pyicub

# Define work directory
WORKDIR /app/pyicub

RUN npm ci
RUN npm install @mui/material @emotion/react @emotion/styled
RUN npm install bootstrap@3
RUN npm install react-iframe
RUN npm install react-router-dom@6
RUN npm i react-icons
RUN npm install http-proxy-middleware --save
COPY ./src /app/pyicub/src
CMD ["npm", "start"]
