const Accessory = require('../models/Accessory');


const getAllAccessories = async () => {
    const accessories = await Accessory.find().lean();
    return accessories
}

module.exports = {
    getAllAccessories,
}