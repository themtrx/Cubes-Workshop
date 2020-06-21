const env = process.env.NODE_ENV || 'development';
const mongoose = require('mongoose')
const config = require('./config/config')[env];
const express = require('express');
const indexRouter = require('./routes');

const app = express();

mongoose.connect(config.databseUrl, { 
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
app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));