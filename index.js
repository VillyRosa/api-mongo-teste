// Config inicial
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Forma de ler json / middlewares
app.use(
    express.urlencoded({
        extended: true
    }),
);

app.use(express.json());

// Rotas da api
const personRoutes = require('./routes/personRoutes');

app.use('/person', personRoutes);

// Rota inicial / endpoint
app.get('/', (req, res) => {

    // Mostrar req

    res.json({message: 'Hello Express!'});

});

// Entregar uma porta
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@learning.bqgnwqc.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
    .then(() => {

        console.log('Conectamos ao MongoDB!');
        app.listen(3000);

    })
    .catch(err => console.log(err))
