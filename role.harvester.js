// todo: set global constant for MAX_WORK_BODY_PARTS for use in energy capactiy calculations
// todo: set global constant for harvester, builder, upgrader source offsets

let SOURCE_AFFINITY_HARVESTER = 1;
let nextTarget = 0;

var roleHarvester = {


    /** @param {creep} creep **/
    run: function(creep) {

        let creepTargetFull = false;
        let creepHasTarget = false;
        let creepTarget;

        // determine if creeps current delivery target is full, forget target
        if (creep.memory.targetId) {
            creepHasTarget = true;
            creepTarget = Game.getObjectById(creep.memory.targetId);

            creepTargetFull = (creepTarget.energy === creepTarget.energyCapacity);

            if (creepTargetFull) {
                creep.memory.targetId = false;  // ask for a new target
            }

        }

	    // creep out of energy, initiate harvest cycle
	    if( (!creep.memory.harvesting && creep.carry.energy === 0) ) {
            creep.memory.harvesting = true;
            creep.memory.targetId=false;
            creep.say('harvest');
	        //console.log(creep.name + ' harvest' + '[' + creep.pos +']');
	    }
	    // creep energy full, initiate delivery cycle
	    if(creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.harvesting = false;
	        creep.say('deliver');
	        //console.log(creep.name + ' delivering ' + '['+creep.pos +']' + '['+creep.memory._move.dest.x + ',' +
            //    creep.memory._move.dest.y +']');
	    }
	    
	    if(creep.memory.harvesting) {
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
                                (structure.energy < structure.energyCapacity * 0.25)) ||
                                 structure.structureType == STRUCTURE_EXTENSION ||
                                 structure.structureType == STRUCTURE_SPAWN ||
                                 structure.structureType == STRUCTURE_CONTAINER 
                                ) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if (nextTarget > targets.length-1) nextTarget = 0; // reset target list cycle
                if (!creep.memory.targetId) {
   //                 try {
                        creep.memory.targetId = targets[nextTarget++].id;
    //                } catch {}
                    console.log('myTarget (' + creep.name + ') = ' , JSON.stringify(targets[nextTarget-1].id));
                }

                let targetId =  Game.getObjectById(creep.memory.targetId);

                if(creep.transfer(creepTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creepTarget);
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