// todo: set global constant for MAX_WORK_BODY_PARTS for use in energy capactiy calculations
// todo: set global constant for harvester, builder, upgrader source offsets

let SOURCE_AFFINITY_HARVESTER = 1;

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
	    if(creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = false;
	    }
	    if(!creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.harvesting = true;
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
                            structure.structureType == STRUCTURE_TOWER 
                                ) && structure.energy < structure.energyCapacity * 0.01;
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