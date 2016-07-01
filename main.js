/**
 * Main loop for mrRobot AI
 * @class
 */

/* 
for (n in Game.spawns) s=Game.spawns[n]; s.room.name 
var
*/ 	
let DEBUG = false;

let creepController = require('creep.Controller');
let towerController = require('tower.Controller');
let towerController2 = require('tower.Controller2');
let gc = require('gc'); // garbage collector

// CONSTANTS
let GARBAGE_COLLECTION_FREQUENCY_TICKS = 25;


module.exports.loop = function() {

	if (DEBUG) console.log('tick');

    creepController.run();
    towerController.run();

    if (Game.time % GARBAGE_COLLECTION_FREQUENCY_TICKS == 0) {
        console.log('funeral march\n');
        gc.gc();
    }

}
