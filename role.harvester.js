var logicHarvest = require('logic.harvest');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(logicHarvest.run(creep)){
            ;
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            // else{
            //     creep.say('Nowhere to put my resources! :/')
            // }
        }
	}
};

module.exports = roleHarvester;