# pyicub-frontend

## How to build

> docker build . -t pyicubgui:latest

## How to run

> docker run -e PORT=7000 -e REACT_APP_API=pyicub -e REACT_APP_PROXY=http://localhost:5000 -e REACT_APP_NAME="appname" pyicubgui:latest
