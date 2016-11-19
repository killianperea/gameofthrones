var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new Schema({
    totalGold: {type: Number, default: 0},
    goldRate: {type: Number, default: 1},
    soldiers: {type: Number, default: 0},
    houseName: String,
    buildings: {type: Object, default: {
        houses: 0,
        barracks: 0,
        septon: 0,
        gamblingHall: 0,
        market: 0
    }},
    familiesDefeated: {type: Object, default: {
        Tully: false,
        Tyrell: false,
        Martell: false,
        Greyjoy: false,
        Baratheon: false,
        Stark: false,
        Lannister: false,
        Targaryen: false
    }},
    septonMultiplier: {type: Number, default: 1}
});

module.exports = mongoose.model('games', gameSchema);
