var settings = {
	reporting_tick_interval: 5,
	source_affinity_harvester: 1,
	source_affinity_repair: 0,
	source_affinity_upgrader: 0,
	defcon_peace: 5,
	defcon_cold_war: 4, // gather intel, fortify structures
	defcon_mobilization_preparedness: 3, // maximize energy storage
	defcon_high_readiness: 2, // maximize structures, redeploy workers to soldiers 
	defcon_war: 1
};

const REPORTING_TICK_INTERVAL = settings.reporting_tick_interval;
const SOURCE_AFFINITY_HARVESTER = settings.source_affinity_harvester;
const DEFCON_PEACE = settings.defcon_peace;
const DEFCON_WAR = settings.defcon_war;

module.exports = settings;
module.exports = REPORTING_TICK_INTERVAL;
module.exports = SOURCE_AFFINITY_HARVESTER; 
module.exports = DEFCON_PEACE;
module.exports = DEFCON_WAR;



