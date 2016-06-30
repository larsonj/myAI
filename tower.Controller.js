var DEBUG = true;
var loggerMsg = {
    scriptName: 'tower.Controller.js',
    msg: null
}

var log = {
    log: function (msgObj) {
            console.log(msgObj.scriptName + ': ' + msgObj.msg);
        },
    debug: function (msgObj) {
        if (DEBUG) {
            console.log(msgObj.scriptName + ': ' + msgObj.msg);
        }    
    }
}

/**
 * Tower defence against attackers
 * @function
 */
 function defendRoom(roomName) {
    
    var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
    if(hostiles.length > 0) {
        var username = hostiles[0].owner.username;
        Game.notify(`User ${username} spotted in room ${roomName}`);
        var towers = Game.rooms[roomName].find(
            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        towers.forEach(tower => tower.attack(hostiles[0]));
        // alert console 
        loggerMsg.msg = roomName +' towers defending against: ' + hostiles[0] + 'from owner: ' + username;
        log.log(loggerMsg);
    }
}

function repairRoom(roomName, structureType) {

    var damagedStructures = Game.rooms[roomName].find(FIND_STRUCTURES, {
        filter: (structure) => (
                    (structure.hits < structure.hitsMax && structure.structureType == STRUCTURE_WALL && structure.hits < 27000 ) ||  // todo: move constants out of file
                    (structure.hits < structure.hitsMax && structure.structureType == STRUCTURE_RAMPART && structure.hits < 25000 ) ||
                    (structure.hits < structure.hitsMax && structure.structureType == STRUCTURE_ROAD && structure.hits < (structure.hitsMax * 0.350))
                )
    });

    if(damagedStructures.length > 0) {
        var towers = Game.rooms[roomName].find(
            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});

        let towerNum = 0;  // spread repairs across towers
        let damagedStructuresLeft = 0;
        towers.forEach(tower => {
                                    damagedStructuresLeft=damagedStructures.length - towerNum;
                                    if (damagedStructuresLeft) {
                                        loggerMsg.msg = roomName +' tower repairing: ' + damagedStructures[towerNum] + ' of ' + damagedStructuresLeft;
                                        log.debug(loggerMsg);
                                        tower.repair(damagedStructures[towerNum++])
                                    }
                                });
    }
}

var towerController = {

    run: function () {

        let room = Game.spawns.Spawn1.room.name;   // todo: move to memory, initialize in main.js

        defendRoom(room);
        repairRoom(room);
    }
};

module.exports = towerController;

