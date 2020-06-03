const api = require('./services/index');


const getDateToday = () => {

    const data = new Date();
    var myData = { today: null, lastDays: null };


    if ((data.getMonth().valueOf() < 10) && data.getDate().valueOf() < 10) {
        myData.today = '0' + (1 + data.getMonth()) + '-0' + data.getDate() + '-' + data.getFullYear();
    }
    else if ((1 + data.getMonth().valueOf()) < 10) {
        myData.today = '0' + (1 + data.getMonth()) + '-' + data.getDate() + '-' + data.getFullYear();
    }
    else if (data.getDate().valueOf() < 10) {
        myData.today = (1 + data.getMonth()) + '-0' + data.getDate() + '-' + data.getFullYear();
    } else {
        myData.today = (1 + data.getMonth()) + '-' + data.getDate() + '-' + data.getFullYear();
    }

    return myData;

}


const urlBase = () => {

    return api.get(api.baseURL).then(function (resposta) {

        return resposta.data;
    }).catch(function (error) {
        console.log(error)
    })

}

const getCoinsBetweenDate = () => {

    const dateI = '11-11-2017'
    const dateF = '12-12-2018'

    return api.get(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial='${dateI}'&@dataFinalCotacao='${dateF}'&$top=100&$format=json`).then(function (resposta) {
        return resposta.data;
    }).catch(function (error) {
        console.log(error);
    })

}

const getDolarLessDays = () => {
    var myData = getDateToday();



    console.log('COMPLETO: ', myData.today);


    return api.get(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${myData.today}'&$top=100&$format=json`).then(function (resposta) {
        return resposta.data;
    }).catch(function (error) {
        console.log(error);
    })

}

module.exports =  {getCoinsBetweenDate, getDolarLessDays, urlBase};