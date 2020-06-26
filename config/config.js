module.exports = {
    development: {
        port: process.env.PORT,
        jwtKey: process.env.PRIVATE_KEY,
        databseUrl: process.env.DATABASE_URL
    },
    production: {}
};