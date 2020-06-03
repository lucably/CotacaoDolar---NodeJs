const express = require('express');
const Router = express();
const {getCoinsBetweenDate, getDolarLessDays, urlBase} = require('./index');

Router.get('/', (req, res) => {

    urlBase().then(data => {
        res.json({
            response: data
        })
    })

});


Router.get('/moedaBetween', (req, res) => {
    getCoinsBetweenDate().then(data => {
        res.json({
            data
        })
    })
})

Router.get('/moeda', (req, res) => {
    getDolarLessDays().then(data => {
        res.json({
            data
        })
    })
})


Router.listen(3000);
