const handlebars = require('express-handlebars');
const express = require('express');
const { urlencoded } = require('express');

module.exports = (app) => {
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.engine('.hbs', handlebars({
        extname: '.hbs',
        partialsDir: './views/components'
    }));

    app.set('view engine', '.hbs');

    app.use('/static', express.static('static'))
};