# Nozomu Invesment RESTful API
Nozomu Investment RESTful API created by Aulia Tanzilu Akmal using ExpressJS and MongoDB as Database. 

## Requirement
- [NodeJS](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/get-npm)
- [POSTMAN](https://www.postman.com/)
- [MongoDb Atlas](https://www.mongodb.com/cloud/atlas)\

## Project Setup
```sh
# clone it
git clone https://github.com/okanemo/Aulia-Tanzilu-Akmal.git

cd Aulia-Tanzilu-Akmal

# Install dependencies
npm install

# Install nodemon
npm install -g nodemon

# Then setting your database in folder config/db.js
# change the uri with your mongodb connection
var uri = "mongodb+srv://<username>:<password>@cluster0.b6yer.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

```

## Project Run
```sh
# Run the project with nodemon
npx nodemon server.js

```
