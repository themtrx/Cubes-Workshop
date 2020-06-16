const { v4 } = require('uuid')
const fs = require('fs')

const dbFile = './config/database.json';

class Cube {
    constructor (name,description,imageUrl,difficulty) {
        this.id = v4();
        this.name = name || 'No name';
        this.description = description;
        this.imageUrl = imageUrl || 'https://via.placeholder.com/150';
        this.difficulty = difficulty || 0;
    }

    getCube(){
        
    }

    save(){
        const newCube = {
            id: this.id,
            name: this.name,
            description: this.description,
            imageUrl: this.imageUrl,
            difficulty: this.difficulty
        }

        fs.readFile(dbFile, (error, cubesDB) => {

            if (error){
                throw error;
            }
            
            const allCubes = JSON.parse(cubesDB);
            allCubes.push(newCube);

            fs.writeFile(dbFile, JSON.stringify(allCubes), (error) => {
                if(error){
                    throw error;
                }
    
                console.log('New Cube succesfully stored');
                
            })
        });

        console.log('this is after writefile');
        
    }
}


module.exports = Cube;