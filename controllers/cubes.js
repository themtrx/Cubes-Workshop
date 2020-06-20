const fs = require('fs');
const { getCubes } = require('./dbComunicator');

const getAllCubes = (callback) => {
    getCubes((allCubes) => {
        callback(allCubes)
    })
}

module.exports = {
    getAllCubes
}