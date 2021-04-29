# MERN Todo App


## Requirements

- [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/) (quick install: install Homebrew and `run brew update && brew tap mongodb/brew && brew install mongodb-community@4.2`)
  - `brew update`
  - `brew tap mongodb/brew`
  - `brew install mongodb-community@4.2`

## Setup

NOTE: A SendGrid API key is required for email notifications.

```
$ git clone git@github.com:wyncode/todo-mern-api.git
$ cd todo-mern-api
$ yarn
$ mkdir config
$ cp .env.sample config/dev.env
$ cp .env.sample config/test.env
```

Fill in your environment variables in your `.env` files.

To reset and seed your database:

```
$ yarn db:reset
```

To run your API in a local environment:

```
$ yarn dev
```

To run the endpoint testing suites (using jest and supertest)

```
$ yarn test
```

To format your code

```
$ yarn prettier
```

---

Add collection to your Postman account for more in-depth API documentation: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/9736846b31eae2710b6c)

---

## Deployment

```
$ heroku create

# replace value strings with your own values
$ heroku config:set JWT_SECRET=neverstoplearning
$ heroku config:set MONGODB_URL=yourconnectionstring
$ heroku config:set SENDGRID_API_KEY=yourapikey
$ git push heroku master
```
