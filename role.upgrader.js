let SOURCE_AFFINITY_UPGRADER = 0;

var roleUpgrader = {

    /** @param {creep} creep **/
    run: function(creep) {


        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            console.log('creep: ' + creep.name, 'refuling, energy: ' + creep.carry.energy);            
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            console.log('creep: ' + creep.name,' is now upgrading.  energy: ' + creep.carry.energy)
            creep.memory.upgrading = true;
        }

        if(creep.memory.upgrading) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
        } 
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[SOURCE_AFFINITY_UPGRADER]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[SOURCE_AFFINITY_UPGRADER]);
            }
        }
    }
};

module.exports = roleUpgrader;