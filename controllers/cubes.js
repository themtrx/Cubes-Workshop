const Cube = require('../models/Cube');

const getAllCubes = async () => {
    const cubes = await Cube.find().lean();
    return cubes
}

const getCube = async (id) => {
    const cube = Cube.findById(id).lean();
    return cube
}

const getCubeWithAccessories = async (id) => {
    const cube = Cube.findById(id).populate('accessories').lean();
    return cube
}

const updateCube = async(cubeId, accessorieId)=> {
    await Cube.findByIdAndUpdate(cubeId, {
        $addToSet: {
            accessories: [accessorieId]
        }
    })
}
module.exports = {
    getAllCubes,
    getCube,
    updateCube,
    getCubeWithAccessories
}