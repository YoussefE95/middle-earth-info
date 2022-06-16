# Lord of the Rings API and Client Application
This project was done as a class assignment and it's NodeJS based. I chose to work with [the one api](https://the-one-api.dev/) to rule them all; it provides data, in json format, about The Lord of the Rings books, movies, and all the characters

## lotr-api
* *index.js* is a module which contains the functions for interacting with the one api using [superagent](https://www.npmjs.com/package/superagent)
  * **searchFor** searches for all *type* (book, character, or movie) containing *phrase* in its name
  * **getInfo** is used to search for a specific *type* (book, character, or movie) with *id*. Since the one api separates quotes from characters and chapters from books, this function also pulls that data from the separate endpoints and combines them for convenience. Movies get all the respective data from one endpoint so no further work is required for that search.

## lotr-app 
* A cli app which allows the user to search for books, characters, and movies pertaining to the Lord of the Rings universe from the convenience of their terminal
* *app.js* uses lotr-api for performing searches and [inquirer](https://www.npmjs.com/package/inquirer) for displaying the initial search results in a scrollable list
  * **_selectionPrompt** performs the initial search given *type* and *phrase*. If the search has results, a scrollable list is displayed and the user can select a specific result. This function returns the id of the selected result or 0 if there wasn't results to the initial search
  * ***print** will organize and display the specific result
  * **searchMiddleEarth** first calls **_selectionPrompt**. If there's a valid *id*, a specific search is done and then displayed with **print**
* *cli.js* uses [yargs](https://www.npmjs.com/package/yargs) to parse the given arguments and to validate their types. It also prints information about what is expected, in terms of arguments, if the given argument is "help"

## How to use
* Clone this repository:
    ```bash
    git clone http://github.com/YoussefE95/lotr-info
    cd lotr-info
    ```

* Install dependencies
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