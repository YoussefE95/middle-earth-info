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
        let url;
        if (type === 'quote') {
            url = `${config.url}/character/${id}/${type}`;
        } else if (type === 'chapter') {
            url = `${config.url}/book/${id}/${type}`;
        } else {
            url = `${config.url}/${type}/${id}`;
        }

        const response = await superagent
            .get(url)
            .auth(config.auth, {type: 'bearer'});

        return response.body;
    } catch(error) {
        console.log(error);
    }
};

module.exports = {
    searchFor,
    getInfo
};