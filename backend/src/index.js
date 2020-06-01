const express = require('express');
const app = express();
const api = require('./services/index');


function urlBase() {

    return api.get(api.baseURL).then(function (resposta) {
        
        return resposta.data;
    }).catch(function (error) {
        console.log(error)
    })

}

function getCoinsBetweenDate(){
    const usd = 'USD';
    const dateI ='11-11-2017';
    const dateF ='12-12-2018';

    return api.get(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial='11-11-2017'&@dataFinalCotacao='12-12-2018'&$top=100&$format=json`).then(function (resposta) {
        
        return resposta.data;
    }).catch(function (error) {
        console.log(error)
    })

}


app.get('/', (req, res) => {

    urlBase().then(data => {
        res.json({
          response: data
        })
    })

});

app.get('/moeda', (req, res) => {
    getCoinsBetweenDate().then(data => {
        res.json({
           data
        })
    })
})


app.listen(3000);