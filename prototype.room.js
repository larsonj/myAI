module.exports = function {
	Room.prototype.createRepairTask = function(task) {
		Memory.tasks[task.id] = task;
	}
	Room.prototype.taskAssignToCreep = function(task) {
		let creep = undefined;
		let refillingCreeps = this.find(FIND_MY_CREEPS, {filter: c => c.memory.role == 'builder' && c.memory.task == undefined && c.memory.working == false})
	}

};