//let CONSTANTS = require(CONSTANTS);
let REPORTING_TICK_INTERVAL = 90; 
let REPORTING_TICK_INTERVAL_SHORT = 5;
let QUOTA_CREEP_HARVESTER = 8;
let QUOTA_CREEP_HARVESTER_MIN = 3;
let QUOTA_CREEP_UPGRADER = 4;
let QUOTA_CREEP_BUILDER = 3;
let QUOTA_CREEP_REPAIR = 3;
let MIN_ENERGY_FOR_PRODUCTION = 1550;
let MIN_ENERGY_FOR_PRODUCTION_STARTUP = 300;
let HOME_BASE_ROOM_NAME = 'W19N28';
let PATH_REFRESH_CYCLE_TICKS = 7

let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');
let roleRepair = require('role.repair');
//let guard = require('guard');
let gc = require('gc');

let creepSpawner = {

    spawnCreep: function () {

        let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
        let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
        let builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
        let guards = _.filter(Game.creeps, (creep) => creep.memory.role === 'guards');
        let repairs = _.filter(Game.creeps, (creep) => creep.memory.role === 'repair');
        let notSet = _.filter(Game.creeps, (creep) => creep.memory.role === undefined);        


        if (Game.time % REPORTING_TICK_INTERVAL == 0) {            
            console.log('----------------------');
            //gc.gc();
            _.forEach(Game.creeps, function(value, key) {
                if (Game.creeps[key].memory._move) {
                    console.log(Game.creeps[key].memory.role + ',', key, '(' + Game.creeps[key].carry.energy + ':' + Game.creeps[key].carryCapacity + ')',
                    '--> room: ' + Game.creeps[key].memory._move.room);
                }
            });
            console.log('----------------------');
        }

        spawner = Game.spawns.Spawn1;
        room = Game.spawns.Spawn1.room.name ;
        
                // report creep totals to console
        if (Game.time % REPORTING_TICK_INTERVAL_SHORT == 0) {
            console.log('----------------------');            
            console.log('ha: ' + harvesters.length, ',  up: ' + upgraders.length, ', bu: ' + builders.length, ', gu: ' + guards.length +
            ', re: ' + repairs.length + ', TOTAL: ', harvesters.length+upgraders.length+builders.length+guards.length);   
            console.log('Room Energy Available: ' +spawner.room.energyAvailable);
            console.log('Room Energy Capacity : ' +spawner.room.energyCapacityAvailable);
            console.log('----------------------');            
        }
        
        
        if  (spawner.room.energyAvailable >= MIN_ENERGY_FOR_PRODUCTION || (   (harvesters.length <= QUOTA_CREEP_HARVESTER_MIN)
                                                                           && (spawner.room.energyAvailable >= MIN_ENERGY_FOR_PRODUCTION_STARTUP)
                                                                          )
            ) { // spawner.room.energyCapacityAvailable
            if (harvesters.length < QUOTA_CREEP_HARVESTER-3) {  
                if (Game.rooms[room].energyAvailable >= MIN_ENERGY_FOR_PRODUCTION) { //Game.rooms.W16N29.energyAvailable = 999
                    let creepName = Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'harvester'});
//                        let creepName = Game.spawns.Spawn1.createCreep([TOUGH,TOUGH,WORK,CARRY,CARRY,CARRY,MOVE], undefined, {role: 'harvester'});
                        if (typeof(creepName) === 'string') {
                            console.log('Spawning LARGE harvester: ' + creepName);
                            //console.log('harvesters: ' + harvesters.length);
                        }
                    } else { 
                        if (harvesters.length < QUOTA_CREEP_HARVESTER_MIN) {
                            //let creepName = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE], undefined, {role: 'harvester'});
                            let creepName = Game.spawns.Spawn1.createCreep([WORK,CARRY,CARRY,MOVE], undefined, {role: 'harvester'});
                            if (typeof(creepName) === 'string') {
                                console.log('Spawning small harvester: ' + creepName);
                                //console.log('harvesters: ' + harvesters.length);
                            }
                            
                        }
                    }
    
            } else {
                //console.log('upLen: ', upgraders.length);
                if(upgraders.length < QUOTA_CREEP_UPGRADER) {
                    //let creepName = Game.spawns.Spawn1.createCreep([WORK,CARRY,CARRY,MOVE], undefined, {role: 'upgrader'});
                    let creepName = Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'upgrader'});
                    if (typeof(creepName) === 'string') {
                        console.log('Spawning new upgrader: ' + creepName);
                        //console.log('upgraders: ' + upgraders.length);
    
                    }
    
                } else {
                    if(builders.length < QUOTA_CREEP_BUILDER) {
                        let creepName = Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'builder'});
                        if (typeof(creepName) === 'string') {
                            console.log('Spawning new builder: ' + creepName);
                            //console.log('builders: ' + builders.length);
                        }
                    } else {
                        if(harvesters.length > QUOTA_CREEP_HARVESTER-2 && harvesters.length < QUOTA_CREEP_HARVESTER) { // spawn excess harvesters as dedicated repar bots
                            let creepName = Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'repair'});
                            if (typeof(creepName) === 'string') {
                                console.log('Spawning new Repairer: ' + creepName);
                                //console.log('harvesters: ' + harvesters.length);
    
                            }
                        };
                    };
                };   
            };
        }

    }         

};

let creepDeploy = {

    run: function() {
            
        for(let name in Game.creeps) {
            let creep = Game.creeps[name];
            if(creep.memory.role == 'repair') {
               roleRepair.run(creep);
            }
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            };
        }; 
    }
};



let creepController = {

    run: function () {    

        // setDEFCON(); // todo: add DEFCON logic
        creepSpawner.spawnCreep();
        creepDeploy.run();

    }
};

module.exports = creepController;