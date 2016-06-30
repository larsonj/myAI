// todo: set global constant for MAX_WORK_BODY_PARTS for use in energy capactiy calculations
// todo: set global constant for harvester, builder, upgrader source offsets

let SOURCE_AFFINITY_HARVESTER = 1;

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
	    // creep out of energy, initiate harvest cycle
	    if(creep.memory.harvesting && creep.carry.energy === 0) {
            creep.memory.harvesting = false;
            creep.say('harvest');
	        console.log(creep.name + ' harvest' + '[' + creep.pos +']');
	    }
	    // creep energy full, initiate delivery cycle
	    if(!creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.harvesting = true;
	        creep.say('deliver');
	        console.log(creep.name + ' delivering ' + '['+creep.pos +']' + '['+creep.memory._move.dest.x + ',' + creep.memory._move.dest.y +']');
	    }
	    
	    if(!creep.memory.harvesting) { 
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[SOURCE_AFFINITY_HARVESTER]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[SOURCE_AFFINITY_HARVESTER]);
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => { 
                        return (
                            (structure.structureType == STRUCTURE_TOWER && 
                                (structure.energy < structure.energyCapacity * 0.80)) || 
                                 structure.structureType == STRUCTURE_EXTENSION ||
                                 structure.structureType == STRUCTURE_SPAWN ||
                                 structure.structureType == STRUCTURE_CONTAINER 
                                ) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
	}
};

module.exports = roleHarvester;

/*
var containers = creep.pos.findInRange(FIND_STRUCTURES, 1, 
      {filter: {structureType: STRUCTURE_CONTAINER}});
containers[0].transfer(creep, RESOURCE_ENERGY);

*/