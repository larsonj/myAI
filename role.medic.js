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
	        creep.say('Switching to Harvest mode..')
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
                    filter: (structure) => {  // find extensions, spawners and towers, in that order
                        return (
                            structure.structureType == STRUCTURE_TOWER ||
                            structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN 
                                ) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    let msg = 'moving to: ' + targets[0].name;
                    //creep.say(msg)
                    creep.moveTo(targets[0]);
                }
            }
        }
	}
};

module.exports = roleHarvester;

//structure.structureType == STRUCTURE_EXTENSION ||
//                                structure.structureType == STRUCTURE_SPAWN ||