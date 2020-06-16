const Cube = require('../models/Cube')

const newCube = new Cube('myCube', 'this is my cube', 'https://thisimg.com', 1)

console.log(newCube);

newCube.save();