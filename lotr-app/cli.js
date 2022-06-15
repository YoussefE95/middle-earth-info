const yargs = require('yargs');
const app = require('./app.js');
const supportedSearches = ['movie', 'character', 'book'];

yargs(process.argv.slice(2))
    .usage('$0: Usage <cmd> [options]')
    .command(
        'search <type> <phrase>',
        'get information about lord of the rings',
        (yargs) => {
            return yargs
                .positional('type', {
                    describe: 'what to search for in relation to lord of the rings',
                    type: 'string',
                    choices: supportedSearches
                })
                .positional('phrase', {
                    describe: 'a phrase to filter what we\'re searching for by name\n' + 
                    'if no phrase is given, all results of type will be returned',
                    type: 'string'
                });
        },
        (args) => { 
            if (supportedSearches.includes(args.type)) {
                app.searchMiddleEarth(args.type, args.phrase);
            } else {
                console.log(`Searches for ${args.type} is not supported.`);
            }
        }
    )
    .help().argv;