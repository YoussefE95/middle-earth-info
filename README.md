# Lord of the Rings API and Client Application
This project was done as a class assignment and it's NodeJS based. I chose to work with [the one api](https://the-one-api.dev/) to rule them all; it provides data, in json format, about The Lord of the Rings books, movies, and all the characters

## lotr-api
* *index.js* is a module which contains the methods for interacting with the one api

## lotr-app 
* A cli app which uses lotr-api. This provides the user the ability to search for books, characters, and movies in the Lord of the Rings universe from the convenience of their terminal

## How to use
* Clone this repository:
    ```bash
    git clone http://github.com/YoussefE95/lotr-info
    cd lotr-info
    ```

* Install dependencies for the module and application
    ```bash
    cd lotr-api && npm install
    cd ../lotr-app && npm install
    ```

* Register an account for [the one api](https://the-one-api.dev/) and get your authentication key. In lotr-api, copy *sample.config.json* to a new a file *config.json* and add your key from the one api.

* Now we can use the cli application
    ```bash
    node cli.js search book 'fellow'
    node cli.js search character 'baggins'
    node cli.js search movie 'of the king'
    ```