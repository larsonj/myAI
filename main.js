/**
 * Main loop for mrRobot AI
 * @class
 */

var creepController = require('creep.Controller');
var towerController = require('tower.Controller');
var towerController2 = require('tower.Controller2');
var gc = require('gc'); // garbage collector

// CONSTANTS
var GARBAGE_COLLECTION_FREQUENCY_TICKS = 25;


module.exports.loop = function() {

	console.log('tick');

    creepController.run();
    towerController.run();
    towerController2.run();


    if (Game.time % GARBAGE_COLLECTION_FREQUENCY_TICKS == 0) {
        console.log('funeral march\n');
        gc.gc();
    }

}
