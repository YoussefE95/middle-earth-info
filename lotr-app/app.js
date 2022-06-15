const inquirer = require('inquirer');
const middleEarth = require('lotr-api');

const _selectionPrompt = async (type, phrase) => {
    const searchResults = await middleEarth.searchFor(type, phrase);

    if (searchResults.total === 0) {
        console.log(`No ${type} results for ${phrase}`);
        return 0;
    }

    return inquirer.prompt({
        type: 'list',
        name: 'objectID',
        message: `select a ${type}`,
        choices: searchResults.docs.map((obj) => {
            return { name: obj.name, value: obj._id};
        })
    });
};

const _print = (type, obj) => {
    console.log();
    if (type === 'movie') {
        console.log(`Name: ${obj.name}`);
        console.log(`Runtime: ${obj.runtimeInMinutes} minutes`);
        console.log(`Budget: ${obj.budgetInMillions} million`);
        console.log(`Revenue: ${obj.boxOfficeRevenueInMillions} million`);
        console.log(`Nominated for ${obj.academyAwardNominations} academy awards`);
        console.log(`Won ${obj.academyAwardWins} academy awards`);
        console.log(`Score on Rotten Tomatoes: ${obj.rottenTomatoesScore}`);
    } else if (type === 'character') {
        console.log(`Name: ${obj.name}`);
        console.log(`Gender: ${obj.gender}`);
        console.log(`Race: ${obj.race}`);
        console.log(`Birth: ${obj.birth}`);
        console.log(`Death: ${obj.death}`);
        if (obj.randomQuote){
            console.log(`Random Quote:\n"${obj.randomQuote}"`);
        }
    } else if (type === 'book') {
        console.log(`Name: ${obj.name}`);
        console.log('Chapters:');
        obj.chapters.forEach((chapter) => {
            console.log(`  ${chapter.chapterName}`);
        });
    }
    console.log();
};

const searchMiddleEarth = async (type, phrase) => {
    const userInput = await _selectionPrompt(type, phrase);
    if (userInput) {
        const selection = (await middleEarth.getInfo(type, userInput.objectID)).docs[0];

        if (type === 'character') {
            const quotes = (await middleEarth.getInfo('quote', userInput.objectID)).docs;
            if (quotes.length > 0) {
                const random = Math.floor(Math.random()*quotes.length);
                selection.randomQuote = quotes[random].dialog;
            }
        } else if (type === 'book') {
            selection.chapters = (await middleEarth.getInfo('chapter', userInput.objectID)).docs;
        }

        _print(type, selection);
    }
};

module.exports = {
    searchMiddleEarth
};