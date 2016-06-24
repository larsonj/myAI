var towerController = {

    run: function () {var tower = Game.getObjectById('576d7d66be1cccb44b1899ab');
        if(tower) {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            if(closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }
    
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
            };
        };
    }
};

module.exports = towerController;

=====

var towerController = {

    run: function () {
        var tower = Game.getObjectById('576d7d66be1cccb44b1899ab');
        if(tower) {

            // find and repair buildigs and roads
            var closestDamagedBuildingStructure = tower.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            // repair walls, etc
            var closestDamagedWallStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
    
            // attack hostles
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
            };
            if(closestDamagedBuildingStructure) {
                tower.repair(closestDamagedBuildingStructure);
            };               
            if(closestDamagedWallStructure) {
                tower.repair(closestDamagedWallStructure);
            };                

        };
    }
};

module.exports = towerController;
