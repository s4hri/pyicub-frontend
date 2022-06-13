FROM node:14.16.1
ARG DOCKER_SRC

RUN mkdir /app
WORKDIR /app

# Create react app
RUN npx create-react-app pyicub-frontend

# Define work directory
WORKDIR /app/pyicub-frontend

RUN npm ci
RUN npm install @mui/material @emotion/react @emotion/styled
RUN npm install bootstrap@3
RUN npm install react-iframe
RUN npm install react-router-dom@6
RUN npm i react-icons
RUN npm install http-proxy-middleware --save

RUN mkdir -p /root/.vscode-server /root/.vscode-server-insiders
RUN git clone https://github.com/s4hri/pyicub-frontend -b master tmp
RUN cd tmp && git checkout ${RELEASE}
RUN cp -a tmp/. /app/pyicub-frontend/
RUN rm -rf tmp

CMD ["npm", "start"]
