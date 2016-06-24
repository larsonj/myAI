
var creepController = require('creep.Controller');
var towerController = require('tower.Controller');
var gc = require('gc'); // garbage collector

module.exports.loop = function () {
    
    creepController.run(1);
    towerController.run();

    //if (Game.time %150) gc.gc(); // run garbage collection every 150 game ticks

    // for(var name in Memory.creeps) {
    //     if(Game.creeps[name] == undefined) {
    //         console.log("Burying the dead: " + name);
    //         delete Memory.creeps[name];
    //     };
    // };
}