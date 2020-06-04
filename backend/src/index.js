const api = require('./services/index');


const getDateToday = () => {

    const data = new Date();
    const dataAux = new Date();

    var myData = { today: null, lastDays: null };
    var aux = new Date( ( Math.abs(dataAux.setDate((dataAux.getDate() - 30)* 1000 )) ) );

    // Colocando a data ATUAL no padrao que a API aceita
    if ((1+ data.getMonth().valueOf()) < 10 && data.getDate().valueOf() < 10) {
        myData.today = '0' + (1 + data.getMonth()) + '-0' + data.getDate() + '-' + data.getFullYear();
    }
    else if ((1 + data.getMonth().valueOf()) < 10) {
        myData.today = '0' + (1 + data.getMonth()) + '-' + data.getDate() + '-' + data.getFullYear();
    }
    else if (data.getDate().valueOf() < 10) {
        myData.today = (1 + data.getMonth()) + '-0' + data.getDate() + '-' + data.getFullYear();
    }else {
        myData.today = (1 + data.getMonth()) + '-' + data.getDate() + '-' + data.getFullYear();
    }

    //Botando a data com -30 dias no formato da API.
    if(aux.getDate().valueOf() < 10 && (data.getMonth().valueOf()) < 10 ) {
        myData.lastDays = '0' + (data.getMonth()) + '-0' + aux.getDate() + '-' + data.getFullYear();
    }
    else if(data.getMonth().valueOf() < 10) {
        myData.lastDays = '0' + data.getMonth() + '-' + aux.getDate() + '-' + data.getFullYear();
    }
    else if(data.getMonth().valueOf() === 0) {
        myData.lastDays = '12-' + aux.getDate() + '-' + (data.getFullYear() - 1)
    }
    else if(data.getMonth().valueOf() === 0 && aux.getDate().valueOf() < 10) {
        myData.lastDays = '12-' + '0' + aux.getDate() + '-' + (data.getFullYear() - 1)
    }else {
        myData.lastDays = (data.getMonth()) + '-' + aux.getDate() + '-' + data.getFullYear();
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

const getCoinsBetweenDate = (req) => {

    return api.get(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial='${req.query.dataI}'&@dataFinalCotacao='${req.query.dataF}'&$top=100&$format=json`).then(function (resposta) {
        return resposta.data;
    }).catch(function (error) {
        console.log(error);
    })

}

const getDolarLessDays = () => {
    var myData = getDateToday();

    return api.get(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial='${myData.lastDays}'&@dataFinalCotacao='${myData.today}'&$top=100&$format=json`).then(function (resposta) {
        return resposta.data;
    }).catch(function (error) {
        console.log(error);
    })

}

module.exports =  {getCoinsBetweenDate, getDolarLessDays, urlBase};