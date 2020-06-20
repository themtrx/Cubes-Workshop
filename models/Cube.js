const { v4 } = require('uuid')
const { saveCube } = require('../controllers/dbComunicator')

class Cube {
    constructor (name,description,imageUrl,difficulty) {
        this.id = v4();
        this.name = name || 'No name';
        this.description = description;
        this.imageUrl = imageUrl || 'https://via.placeholder.com/150';
        this.difficulty = difficulty || 0;
    }
    
    save(){
        const newCube = {
            id: this.id,
            name: this.name,
            description: this.description,
            imageUrl: this.imageUrl,
            difficulty: this.difficulty
        }

        saveCube((newCube))

    }
}


module.exports = Cube;