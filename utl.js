

var garbageCollector = {
    gc: function () {    
        for(let name in Memory.creeps) {
//            if(Game.creeps[name] == undefined ) console.log('gc() - ' + name + ' is undefined in gc()');
            if(!Game.creeps[name] && Game.creeps[name] == undefined) {
                delete Memory.creeps[name];
            	console.log("Burying the dead: " + name);
            };
        };
    }

};

var logger = {
    
    logr: function () {
        var Msg = {
            scriptName: 'tower.Controller.js',
            msg: null
        };
    },
    log: function (msgObj) {
        console.log(msgObj.scriptName + ': ' + msgObj.msg);
    }
}

module.exports = garbageCollector;
