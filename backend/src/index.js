const express = require('express');
const app = express();
const api = require('./services/index');


function axiosTeste() {

    return api.get('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/').then(function (resposta) {
        console.log(resposta.data);
        return resposta.data;
    }).catch(function (error) {
        console.log(error)
    })

}


app.get('/', (req, res) => {

    axiosTeste().then(data => {
        res.json({
          response: data
        })
    })

});


app.listen(3000);