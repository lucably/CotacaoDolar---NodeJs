const express = require('express');
const app = express();
const api = require('./services/index');


const urlBase = () => {

    return api.get(api.baseURL).then(function (resposta) {
        
        return resposta.data;
    }).catch(function (error) {
        console.log(error)
    })

}

const getCoinsBetweenDate = () =>{
    
    const dateI ='11-11-2017'
    const dateF ='12-12-2018'

    return api.get(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial='${dateI}'&@dataFinalCotacao='${dateF}'&$top=100&$format=json`).then(function (resposta) {
        return resposta.data;
    }).catch(function (error) {
        console.log(error);
    })

}

const getDolarLessDays = () => {

    const date = '11-27-2018'

    const data = new Date();

    const myData = '0'+(1+data.getMonth())+'-0'+data.getDate()+'-'+data.getFullYear();

    console.log('Data: ',data);


    return api.get(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${myData}'&$top=100&$format=json`).then(function (resposta) {
        return resposta.data;
    }).catch(function (error) {
        console.log(error);
    })

}


app.get('/', (req, res) => {

    urlBase().then(data => {
        res.json({
          response: data
        })
    })

});

app.get('/moedaBetween', (req, res) => {
    getCoinsBetweenDate().then(data => {
        res.json({
           data
        })
    })
})

app.get('/moeda', (req, res) => {
    getDolarLessDays().then(data => {
        res.json({
           data
        })
    })
})


app.listen(3000);