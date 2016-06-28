
var creepController = require('creep.Controller');
var towerController = require('tower.Controller');
var gc = require('gc'); // garbage collector

// CONSTANTS
var GARBAGE_COLLECTION_FREQUENCY_TICKS = 25;


module.exports.loop = function () {
    
    creepController.run(1);
    towerController.run();

        
    if (Game.time % GARBAGE_COLLECTION_FREQUENCY_TICKS == 0) {console.log ('funeral march\n'); gc.gc();}

}