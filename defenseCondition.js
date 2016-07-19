/**
 * Created by jcl on 7/5/2016.
 */
s = require('CONSTANTS');

var defenseCondition = {

    getReadinessLevel: function () {

        if (!Memory.DEFCON) Memory.DEFCON = s.DEFCON_PEACE;  // if DEFCON not set, default to 5, peacetime

        return(DEFCON)
    },
    setReadinessLevel: function (readinessCondition) {

        try {
            let hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
            if (hostiles.length > 0 ) {  // at WAR
                Memory.DEFCON = readinessCondition;    
            }
            

            return(Memory.DEFCON);

            } catch (err) {
            console.log(err);
        }
    }
}

module.exports = defenseCondition;
