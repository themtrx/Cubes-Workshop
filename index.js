require('dotenv').config()
const env = process.env.NODE_ENV
const config = require('./config/config')[env];

const mongoose = require('mongoose')
const express = require('express');
const indexRouter = require('./routes');
const cubeRouter = require('./routes/cube')
const accessoriesRouter = require('./routes/accessories')
const authRouter = require('./routes/auth')

const app = express();

mongoose.connect(config.databseUrl, { 
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true 
     },
     (err)=> {
    if(err) {
        console.error(err)
        throw err
    }

    console.log('Database is connected');
    
})

require('./config/express')(app);


app.use('/', indexRouter);
app.use('/', cubeRouter);
app.use('/', accessoriesRouter);
app.use('/', authRouter);

app.get('*', (req, res) =>{
    res.render('404', {
        title: 'Oh nooo!'
    })
})

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));