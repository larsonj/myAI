//let CONSTANTS = require(CONSTANTS);
let REPORTING_TICK_INTERVAL = 50; 
let REPORTING_TICK_INTERVAL_SHORT = 15;
let QUOTA_CREEP_HARVESTER = 6;
let QUOTA_CREEP_UPGRADER = 8;
let QUOTA_CREEP_BUILDER = 0;
let QUOTA_CREEP_GUARD = 6;
let MIN_ENERGY_FOR_PRODUCTION = 300;
let HOME_BASE_ROOM_NAME = 'W19N28';

let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');
let guard = require('guard');
let gc = require('gc');
//let _ = require('lodash');

let creepSpawner = {

    spawnCreep: function () {

        let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
        let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
        let builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
        let guards = _.filter(Game.creeps, (creep) => creep.memory.role === 'guards');
        let notSet = _.filter(Game.creeps, (creep) => creep.memory.role === undefined);


        if (Game.time % REPORTING_TICK_INTERVAL == 0) {            
            console.log('----------------------');
            //gc.gc();
            _.forEach(Game.creeps, function(value, key) {
                if (Game.creeps[key].memory._move) {
                    console.log(Game.creeps[key].memory.role + ',', key, '(' + Game.creeps[key].carry.energy + ':' + Game.creeps[key].carryCapacity + ')', '--> room: ' + Game.creeps[key].memory._move.room);
                }
            });
            console.log('----------------------');
        }
        // let harvesters = _.filter(Game.creeps, {memory: 'harvester'});

        // if(_.size(harvesters) < 3){
        //     Game.spawns.Spawn1.createCreep([Game.WORK, Game.CARRY, Game.MOVE], null, 'Harvester');
        // }


        // report creep totals to console
        if (Game.time % REPORTING_TICK_INTERVAL_SHORT == 0) console.log('ha: ' + harvesters.length, ',  up: ' + upgraders.length, ', bu: ' + builders.length, ', gu: ' + guards.length + ', NS: ' + notSet.length + ', TOTAL: ', harvesters.length+upgraders.length+builders.length+guards.length);   

        spawner = Game.spawns.Spawn1;
        if (spawner.room.energyAvailable >= MIN_ENERGY_FOR_PRODUCTION ) { // spawner.room.energyCapacityAvailable
            if (harvesters.length < QUOTA_CREEP_HARVESTER-3) {  
                if (Game.rooms.W19N28.energyAvailable > 549) {
                        let creepName = Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE], undefined, {role: 'harvester'});
//                        let creepName = Game.spawns.Spawn1.createCreep([TOUGH,TOUGH,WORK,CARRY,CARRY,CARRY,MOVE], undefined, {role: 'harvester'});
                        if (typeof(creepName) === 'string') {
                            console.log('Spawning LARGE harvester: ' + creepName);
                            //console.log('harvesters: ' + harvesters.length);
                        }
                    } else {       
                        let creepName = Game.spawns.Spawn1.createCreep([WORK,CARRY,CARRY,MOVE], undefined, {role: 'harvester'});
                        if (typeof(creepName) === 'string') {
                            console.log('Spawning small harvester: ' + creepName);
                            //console.log('harvesters: ' + harvesters.length);
                        }
                    }
    
            } else {
                if(upgraders.length < QUOTA_CREEP_UPGRADER) {
                    let creepName = Game.spawns.Spawn1.createCreep([WORK,CARRY,CARRY,MOVE], undefined, {role: 'upgrader'});
                    if (typeof(creepName) === 'string') {
                        console.log('Spawning new upgrader: ' + creepName);
                        //console.log('upgraders: ' + upgraders.length);
    
                    }
    
                } else {
                    if(builders.length < QUOTA_CREEP_BUILDER) {
                        let creepName = Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE], undefined, {role: 'builder'});
                        if (typeof(creepName) === 'string') {
                            console.log('Spawning new builder: ' + creepName);
                            //console.log('builders: ' + builders.length);
                        }
                    } else {
                        if(harvesters.length > QUOTA_CREEP_HARVESTER-2 && harvesters.length < QUOTA_CREEP_HARVESTER) {
                            let creepName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
                            if (typeof(creepName) === 'string') {
                                console.log('Spawning new harvester: ' + creepName);
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
            if(creep.memory.role == 'guard') {
               guard(creep);
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