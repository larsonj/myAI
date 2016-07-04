let sCONS=require('constants');

var test = {

	t: function () {
        //		for (creep in Game.creeps) 
        //		let targets = creep.room.find(FIND_STRUCTURES, {
        //            filter: (structure) => {  // find extensions, spawners and towers, in that order
        //                return (// structure.structureType == STRUCTURE_EXTENSION 
        //                //	|| structure.structureType == STRUCTURE_SPAWN 
        //                	structure.structureType == STRUCTURE_TOWER 
        //                	&& structure.energy < structure.energyCapacity);
        //			}
        //		});
        //		console.log(targets)
        Memory.creepDesigns = [ 
            {role: 'harvester', size: 'S', DEFCON: 1 ,design: [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'harvester', size: 'S', DEFCON: 2 ,design: [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'harvester', size: 'S', DEFCON: 3 ,design: [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'harvester', size: 'S', DEFCON: 4 ,design: [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'harvester', size: 'S', DEFCON: 5 ,design: [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'builder',   size: 'L', DEFCON: 1 ,design: [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'builder',   size: 'L', DEFCON: 2 ,design: [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'builder',   size: 'L', DEFCON: 3 ,design: [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'builder',   size: 'L', DEFCON: 4 ,design: [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'builder',   size: 'L', DEFCON: 5 ,design: [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'harvester', size: 'L', DEFCON: 1 ,design: [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'harvester', size: 'L', DEFCON: 2 ,design: [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'harvester', size: 'L', DEFCON: 3 ,design: [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'harvester', size: 'L', DEFCON: 4 ,design: [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'harvester', size: 'L', DEFCON: 5 ,design: [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'upgrader',  size: 'L', DEFCON: 1 ,design: [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'upgrader',  size: 'L', DEFCON: 2 ,design: [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'upgrader',  size: 'L', DEFCON: 3 ,design: [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'upgrader',  size: 'L', DEFCON: 4 ,design: [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'upgrader',  size: 'L', DEFCON: 5 ,design: [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'repair',    size: 'L', DEFCON: 1 ,design: [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'repair',    size: 'L', DEFCON: 2 ,design: [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'repair',    size: 'L', DEFCON: 3 ,design: [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'repair',    size: 'L', DEFCON: 4 ,design: [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'repair',    size: 'L', DEFCON: 5 ,design: [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'Attack',    size: 'L', DEFCON: 1 ,design: [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'Attack',    size: 'L', DEFCON: 2 ,design: [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'Attack',    size: 'L', DEFCON: 3 ,design: [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'Attack',    size: 'L', DEFCON: 4 ,design: [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {role: 'Attack',    size: 'L', DEFCON: 5 ,design: [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]}
        ];

        _.forEach(Memory.creepDesigns, function (design) {
            JSON.stringify(design);
        }); 
    }
};

var reporter = {
    rpt: function () {
        
        let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
        let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
        let builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
        let guards = _.filter(Game.creeps, (creep) => creep.memory.role === 'guards');
        let notSet = _.filter(Game.creeps, (creep) => creep.memory.role === undefined);

        console.log('h: ' + harvesters.length);
        console.log('----------------------');
        //gc.gc();
        _.forEach(Game.creeps, function(value, key) {
            if (Game.creeps[key].memory._move) {
                console.log(Game.creeps[key].memory.role + ',', key, '(' + Game.creeps[key].carry.energy + ':' + Game.creeps[key].carryCapacity + ')', '--> room: ' + Game.creeps[key].memory._move.room);
            }
        });
        console.log('----------------------');
    
        // report creep totals to console
        console.log('ha: ' + harvesters.length, ',  up: ' + upgraders.length, ', bu: ' + builders.length, ', gu: ' + guards.length + ', NS: ' + notSet.length + ', TOTAL: ', harvesters.length+upgraders.length+builders.length+guards.length);   
    }
};

Room.prototype.stats = function() {
    return {
        myCreepsCnt: this.find(FIND_MY_CREEPS).length,
        enemiesCnt: this.find(FIND_HOSTILE_CREEPS).length,
        towersCnt: this.find(STRUCTURE_TOWER).length
    };
};

var protoT = {
    tt: function () {
        // console.log(Game.rooms.W26S29.stats());
        Game.rooms.W26S29.stats();
    }
};

var constants = {
    c: function () {
        console.log(sCONS.aConstant);
    }
};

module.exports = protoT;
module.exports = test;
module.exports = reporter;
module.exports = constants;

// source keeper filter
//Game.rooms.<insert room name>.find(FIND_HOSTILE_CREEPS, {
//    filter:function(enemy){enemy.owner.username !== 'Source Keeper'} // !== or ===, depending on use case
//});

