let SOURCE_AFFINITY_BUILDER = 0;

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES ,
	                { filter: (structure) => { 
                        return (
                             structure.structureType == STRUCTURE_WALL  ||
                             structure.structureType == STRUCTURE_RAMPART ||
                             structure.structureType == STRUCTURE_EXTENSION ||
                             structure.structureType == STRUCTURE_SPAWN ||
                             structure.structureType == STRUCTURE_CONTAINER 
                                );
                        } 
	                }
	        );
            console.log('t: ', targets.length);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.say('building');
                    creep.moveTo(targets[0]);
                }
            } else {
                creep.say('Going Idle');
                creep.moveTo(Game.flags.Flag2);
                creep.memory.role='repair'; // if no work left then, reassign to repair
                delete creep.memory.building;
                creep.memory.status='reassigned';
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            //var sources = creep.room.find(FIND_STRUCTURES, {
            //    filter: (structure) => { 
            //    return (structure.structureType == STRUCTURE_CONTAINER 
            //         && structure.energy > 0)}});
            if(creep.harvest(sources[SOURCE_AFFINITY_BUILDER]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[SOURCE_AFFINITY_BUILDER]);
            }
	    }
	}
};

module.exports = roleBuilder;