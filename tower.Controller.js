var loggerMsg = {
    scriptName: 'tower.Controller.js',
    msg: null
}
var DEBUG = false;

var towerController = {

    run: function () {var tower = Game.getObjectById('576fced496eecd097d44325b');
        if(tower) {
            // kill hostile attackers
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
            };
            // repair roads, etc.
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });

            if(closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }
            // repair walls, etc


            var closestDamagedRoadStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) =>  (structure.structureType == STRUCTURE_ROAD)
            }); 
        
            if(closestDamagedRoadStructure) {
                //console.log('Road structure found: ', closestDamagedRoadStructure);
                if( tower.repair(closestDamagedRoadStructure) == ERR_INVALID_TARGET) {
                    console.log('ERROR - Tower repair on invalid target');
                    if (DEBUG) {
                        loggerMsg.msg=closestDamagedRoadStructure;
                        utils.log(loggerMsg);                    
                    }                    
                };
            } else { console.log('No Road Structures Found')};
            
            
            var closestDamagedWallStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) =>  (
                    (structure.hits < structure.hitsMax && structure.structureType == STRUCTURE_WALL && structure.hits < 22200 ) ||
                    (structure.hits < structure.hitsMax && structure.structureType == STRUCTURE_RAMPART && structure.hits < 31000 ) ||
                    (structure.hits < structure.hitsMax && structure.structureType == STRUCTURE_ROAD && structure.hits < (structure.hitsMax * 0.15) )
                    )
            });                
            if(closestDamagedWallStructure) {
                //loggerMsg.msg=closestDamagedWallStructure;
                //utils.log(loggerMsg);
                //tower.repair(closestDamagedWallStructure);
                if( tower.repair(closestDamagedWallStructure) == ERR_INVALID_TARGET) {
                    console.log('ERROR - Tower repair on invalid target');
                    if (DEBUG) {
                        loggerMsg.msg=closestDamagedWallStructure;
                        utils.log(loggerMsg);                    
                    }                    
                };               
            }
        };
    }
};

var utils= {
    log: function (msgObj) {
        console.log(msgObj.scriptName + ': ' + msgObj.msg);
    }
}

module.exports = towerController;

