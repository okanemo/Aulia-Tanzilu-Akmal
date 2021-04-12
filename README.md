# Nozomu Invesment RESTful API
Nozomu Investment RESTful API created by Aulia Tanzilu Akmal using ExpressJS and MongoDB as Database. 

## Requirement
- [NodeJS](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/get-npm)
- [POSTMAN](https://www.postman.com/)
- [MongoDb Atlas](https://www.mongodb.com/cloud/atlas)

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
npm run dev

```

## List Endpoints

1. API to add a new user

```bash
/api/v1/user/add

```

example input 

```bash
{
    "name" : "Aulia Tanzilu Akmal",
    "username" : "akmal"
}

```

2. API to get all user

```bash
/api/v1/ib/member

```

3. API to update total balance

```bash
/api/v1/ib/updateTotalBalance

```

example input 

```bash
{
    "current_balance" : 2800000
}

```


4. API to get all NAB

```bash
/api/v1/ib/listNAB

```

5. API to deposit balance

```bash
/api/v1/ib/topup

```

example input 

```bash
{
    "user_id" : "606ff6cc54377216b0946621",
    "amount_rupiah" : 50000
}

```

6. API to withdraw balance

```bash
/api/v1/ib/withdraw

```

example input

```bash
{
    "user_id" : "606ef4d0f29f9328b09f835c",
    "amount_rupiah" : 100
}
```

7. API to get history transaction

```bash
/api/v1/ib/history

```

example input

```bash
{
    "user_id" : "606ef4d0f29f9328b09f835c",
}

```