const fs = require('fs');
const path = require('path');

const dbFile = path.join(__dirname, '..', 'config/database.json');

const saveCube = (cube, callback) => {

    getCubes((allCubes) => {
        allCubes.push(cube);

        fs.writeFile(dbFile, JSON.stringify(allCubes), (error) => {
            if(error){
                throw error;
            }
            callback()
        })
    });
}

const getOneCube = (id, callback) => {
    getCubes(cubes => {
        const cube = cubes.filter(c => c.id === id)[0]
        callback(cube)
    })
}

const getCubes = (callback) => {
    fs.readFile(dbFile, (error, cubesDB) => {

        if (error){
            throw error;
        }
        
        const allCubes = JSON.parse(cubesDB);
        callback(allCubes);
    });
}

module.exports = {
    saveCube,
    getOneCube,
    getCubes
}