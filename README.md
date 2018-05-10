# Android Mentorhsip Banking API

## Backend Service
____________________________________________________________________________________________________________________________________________

This project is based on providing nice and standard convention of API services for the ongoing Android Mentorship.

This serves the mobile banking app and communicates with a database of [postgres](https://www.postgresql.org/) dialet vai an ORM [Sequelize](http://docs.sequelizejs.com/)



### Continuous Integration
_____________________________________________________________________________________________________________________________________________
[Travic CI](https://about.travis-ci.com/) is implemented as the Continuous integration service  for builds and test on all activities

This project is built in NodeJs and the JavaScript [standard](https://www.npmjs.com/package/standard) coding style convention is being followed.


[![Build Status](https://travis-ci.com/tonespy/android-mentorship-bank-api.svg?token=WzkNsx4y8921z7L47McZ&branch=master)](https://travis-ci.com/tonespy/android-mentorship-bank-api)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


### Testing
_____________________________________________________________________________________________________________________________________________
The testing frameworks used in this projects are:

[mocha](https://www.npmjs.com/package/mocha)

[chai](https://www.npmjs.com/package/chai)

And a random generator module is being used also to make the tests params dynamic on running `npm test` command:

[chance](https://www.npmjs.com/package/chance)

Unit test was written for each of the endpoints



### API Documentation
_____________________________________________________________________________________________________________________________________________
The Documentation of this API service can be seen [here](https://documenter.getpostman.com/view/812352/android-mentorship-bank-api/RVuAA69u) 



### About Mentorship Program
_____________________________________________________________________________________________________________________________________________
A mentorship program setup by [Damilola Akapo](https://github.com/helios66)

This mentorship program is to bring up passionate and aspiring android developers together that will co-develop and co-publish:grin: some apps to PlayStore.

Thus, this project stands as the backend service for one of the apps being built

The mentorship is being co-facilitated by:

[Oladeji Abubakar](https://github.com/tonespy) and

[Oluwapelumi Olaoye](https://github.com/OluwapelZ)

alongside [Damilola Akapo](https://github.com/helios66)


### Setup Node.js 
If this is your first time encountering **Node.js**, please follow [the instructions](https://nodejs.org/en/download/package-manager/)

After installing Node, run the following commands to download and install this starter kit:

```
# Clone the repository
git clone <repo-url>

# Run this in the project's root directory 
npm install
```

## Project Setup
_____________________________________________________________________________________________________________________________________________
```
To run this project locally, run `node -v` to verify that you have a 8.* node version.
If not update your node version to 8.* or above

Also ensure that your node is es6 compatible

If you have a node version less than this, the project might not get started on you machine due to the project configuration

Also ensure that you have the latest version of node module bcrypt(https://www.npmjs.com/package/bcrypt)

Finally :grin: to start this project run `npm start` and you're good to go.
```


### Setup Postgres
Quick Setup For Mac Users:
Utilize [Postico Setup Instruction](https://eggerapps.at/postico/docs/v1.0.3/install-postgresapp.html)

Or utilize [CodeMentor Guide](https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb)

##### Quick Setup for Ubuntu Users
###### Install postgress
Run the following commands

`sudo apt-get update` //To refresh your local package index
`sudo apt-get install postgresql postgresql-contrib` //Install postgress

###### Now, over to how to use it:
The installation procedure created a user account called `postgres` that is associated with the default Postgres role
You can log into that default account by running `sudo -i -u postgres` in your terminal

You can then access Postgres prompt by typing `psql`

###### Create a new postgres db on your local
Create a postgres db that you will run your migrations the existing tables in the project to.

You can create the db with this command `createdb dbname` 
P.S: You must be logged in as a user in postgres server

You can then run the Squelize migrations with `node_modules/.bin/sequelize db:migrate` and voila, you'll see the tables in your db

Cheers!!!

### Environmental Variable
```
# Postgres url in the format "postgres://username:password@address/database_name"
# E.g: postgres://postgres:password@127.0.0.1/mentor-bank-test-db
# Note: If there is no password set for the user, do this instead:
# E.g: postgres://postgres@127.0.0.1/mentor-bank-test-db
MENTOR_POSTGRES_TEST

# Create a Paystack account and get your API Keys
MENTOR_PAYSTACK_DEBUG_SK
MENTOR_PAYSTACK_DEBUG_PK

# Node environment:
# Always set it to development
NODE_ENV=development

# Provide a randomly generated JWT Secret, and add it to your environmental variable
JWT_SECRET
```





#### Project Credits
_____________________________________________________________________________________________________________________________________________

##### Akapo Damilola
##### Oladeji Abubakar
##### Oluwapelumi Olaoye




### License
_____________________________________________________________________________________________________________________________________________
This project is licensed under the [MIT license](https://opensource.org/licenses/MIT).

<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/license.svg" alt="License"></a>
