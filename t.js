
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
	}
};

var reporter = {
    rpt: function () {
        
        let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
        let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
        let builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
        let guards = _.filter(Game.creeps, (creep) => creep.memory.role === 'guards');
        let notSet = _.filter(Game.creeps, (creep) => creep.memory.role === undefined);
        
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

module.exports = test;
module.exports = reporter;

// source keeper filter
//Game.rooms.<insert room name>.find(FIND_HOSTILE_CREEPS, {
//    filter:function(enemy){enemy.owner.username !== 'Source Keeper'} // !== or ===, depending on use case
//});