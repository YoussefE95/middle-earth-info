const superagent = require('superagent');
const config = require('./config.json');

const searchFor = async (type, phrase) => {
    try {
        const url = `${config.url}/${type}?name=/${phrase}/i`;
        const response = await superagent
            .get(url)
            .auth(config.auth, {type: 'bearer'});

        return response.body;
    } catch(error) {
        console.log(error);
    }
};

const getInfo = async (type, id) => {
    try {
        let url = `${config.url}/${type}/${id}`;
        const response = await superagent
            .get(url)
            .auth(config.auth, {type: 'bearer'});

        if (type === 'book') {
            url = `${config.url}/${type}/${id}/chapter`;
            const chapterResponse = await superagent
            .get(url)
            .auth(config.auth, {type: 'bearer'});

            response.body.docs[0].chapters = chapterResponse.body.docs;
        } else if (type === 'character') {
            url = `${config.url}/${type}/${id}/quote`;
            const quotesResponse = await superagent
            .get(url)
            .auth(config.auth, {type: 'bearer'});

            response.body.docs[0].quotes = quotesResponse.body.docs;
        }

        return response.body.docs[0];
    } catch(error) {
        console.log(error);
    }
};

module.exports = {
    searchFor,
    getInfo
};