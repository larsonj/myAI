var DEFCON = require('defenseCondition');

var DEBUG = false;
var loggerMsg = {
    scriptName: 'tower.Controller.js',
    msg: ''
};

var log = {
    log: function (msgObj) {
            console.log(msgObj.scriptName + ': ' + msgObj.msg);
        },
    debug: function (msgObj) {
        if (DEBUG) {
            console.log(msgObj.scriptName + ': ' + msgObj.msg);
        }    
    }
};

/**
 * Perform Tower defence against attackers
 * @function defendRoom
 * @param {string} roomName Current room 
 */
 function defendRoom(roomName) {
    var defendingStatus = false;

    var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
    if(hostiles.length > 0) {
        defendingStatus = true;

        var username = hostiles[0].owner.username;
        Game.notify(`User ${username} spotted in room ${roomName}`);

        var towers = Game.rooms[roomName].find(
            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        towers.forEach(tower => tower.attack(hostiles[0]));
        // alert console 
        loggerMsg.msg = roomName +' towers defending against: ' + hostiles[0] + 'from owner: ' + username;
        log.log(loggerMsg);
    }
    return defendingStatus;
}

/**
 * Perform Tower repairs
 * @function repairRoom
 * @param {string} roomName Current room
 * @param {string} structureType Type of structure to repair, blank for
 * @param {function} filterFcn Pointer to a function that defines an optional .find() structure filter.
 */
function repairRoom(roomName, structureType, filterFcn) { // todo: add optional param logic for structureType and filterFcn

    var damagedStructures = Game.rooms[roomName].find(FIND_STRUCTURES, {
            filter: (structure) => (
                // west walls
                ((structure.pos.x === 2) &&
                structure.hits < structure.hitsMax &&
                structure.structureType == STRUCTURE_WALL &&
                structure.hits < 125000 ) ||  // todo: move constants out of file
                // n/s/e Walls
                (structure.hits < structure.hitsMax &&
                structure.structureType == STRUCTURE_WALL &&
                structure.hits < 86000 ) ||
                // Ramparts
                (structure.hits < structure.hitsMax &&
                structure.structureType == STRUCTURE_RAMPART &&
                structure.hits < 85000 ) ||
                // Storage
                (structure.hits < structure.hitsMax &&
                structure.structureType == STRUCTURE_STORAGE) ||
                // Roads
                (structure.hits < structure.hitsMax &&
                structure.structureType == STRUCTURE_ROAD &&
                structure.hits < (structure.hitsMax * 0.250))
            )
        }
    );

    if (damagedStructures.length > 0) {
        var towers = Game.rooms[roomName].find(
            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});

        let towerNum = 0;  // spread repairs across towers
        let damagedStructuresLeft = 0;
        towers.forEach(tower => {
                                    damagedStructuresLeft=damagedStructures.length - towerNum;
                                    if (damagedStructuresLeft) {
                                        loggerMsg.msg = roomName +' tower repairing: ' + damagedStructures[towerNum] +
                                            ' of ' + damagedStructuresLeft;
                                        log.debug(loggerMsg);
                                        tower.repair(damagedStructures[towerNum++])
                                    }
                                });
    }
}

/**
 * 
 * @type {{run: towerController.run}} Tower defence/repair loop
 * @param {object} targetRoom
 */
var towerController = {

    run: function (targetRoom) {

        if (!defendRoom(targetRoom)) { // defendRoom returns false
            repairRoom(targetRoom);
        }
    }
};

module.exports = towerController;

