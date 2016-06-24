
var test = {

	t: function () {
		for (creep in Game.creeps) 
		let targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {  // find extensions, spawners and towers, in that order
                return (// structure.structureType == STRUCTURE_EXTENSION 
                //	|| structure.structureType == STRUCTURE_SPAWN 
                	structure.structureType == STRUCTURE_TOWER 
                	&& structure.energy < structure.energyCapacity);
			}
		});
		console.log(targets)
	}
};

module.exports = test;
