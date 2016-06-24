var towerController = {

    run: function () {var tower = Game.getObjectById('576d8da402f3ab414229762d');
        if(tower) {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            // if(closestDamagedStructure) {
            //     tower.repair(closestDamagedStructure);
            // }
    
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
            };
        };
    }
};

module.exports = towerController;

