

module.exports = {
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