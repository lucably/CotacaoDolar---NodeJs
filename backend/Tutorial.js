const express = require('express');

const app = express();


//Querry Params => Que vem com o "?" exp: http://localhost:3000/?name=Carlos
app.get('/', (req, res) => {

    return res.send(`Bem-Vindo, ${req.query.name}`);

});

app.get('/login',(req,res) => {
    return res.send('Login');
});

//:name => nome da variavel que decidimos.
app.get('/nome/:name', (req, res) => {
    //params.name => params pq vem do link, e name pq colocamos assim.
    return res.send(`Bem-Vindo, ${req.params.name}`) 
});

//res.json => Retorna o JSON   exp: http://localhost:3000/nomeJASON/Lucas
app.get('/nomeJASON/:name', (req, res) => {

    return res.json({
        message: `Bem-Vindo, ${req.params.name}`
    })

});


app.listen(3000);