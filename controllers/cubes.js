const Cube = require('../models/Cube');

const getAllCubes = async () => {
    const cubes = await Cube.find().lean();
    return cubes
}

const getCube = async (id) => {
    const cube = Cube.findById(id).lean();
    return cube
}

module.exports = {
    getAllCubes,
    getCube
}