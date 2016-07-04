let DEBUG = false;

let creepController = require('creep.Controller');
let towerController = require('tower.Controller');
let gc = require('gc'); // garbage collector
// GLOBAL CONSTANTS
let s = require('CONSTANTS');
// LOCAL CONSTANTS
let GARBAGE_COLLECTION_FREQUENCY_TICKS = 25;
/* 
 for (n in Game.spawns) s=Game.spawns[n]; s.room.name 
 var
 */
let targetRoom = Game.spawns.Spawn1.room.name;
/**
 * Main loop for mrRobot AI
 * @class
 */
module.exports.loop = function () {

	if (DEBUG) console.log('tick');

    creepController.run(targetRoom);
    towerController.run(targetRoom);

    if (Game.time % GARBAGE_COLLECTION_FREQUENCY_TICKS == 0) {
        console.log('funeral march\n');
        gc.gc();
    }

}
