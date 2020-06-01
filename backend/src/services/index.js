const axios = require('axios');

const api = axios.create({
    baseURL: 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/'
});


module.exports = api;
