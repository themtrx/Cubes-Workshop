module.exports = {
    development: {
        port: process.env.PORT || 3000,
        databseUrl: `mongodb+srv://themtrx:${process.env.DB_PASSWORD}@cluster0-zibdc.mongodb.net/<softuni>?retryWrites=true&w=majority`
    },
    production: {}
};