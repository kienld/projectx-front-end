# Getting Started with Create React App Using Docker, Before you start, you must install docker
File configuration: .env for dev, .env.prod for prod
## Available Scripts
In the project directory, you can run for dev -port: 5000 -- webserver default reactjs: 3000:
### `docker-compose  -f docker-compose.yml  up --build`
In the project directory, you can run for prod -port: 5000 -- webserver default nginx: 80:
### `docker-compose  -f docker-compose-prod.yml  up --build`
