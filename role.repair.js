var roleRepair = {

    run: (creep) => {
        if(creep.memory.startGatherTime && Game.time - creep.memory.startGatherTime > 30){
            creep.memory.repairing = true;
            creep.memory.startGatherTime = null;
        }
        if(!creep.memory.repairing){
            if(!creep.memory.startGatherTime){
                creep.memory.startGatherTime = Game.time;
            }
            if(creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0){
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(sources[0]);
                }
            } else {
                creep.memory.repairing = true;
            }
        }
        else{
            if(creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
                creep.memory.repairing = false;
            }
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.hits < structure.hitsMax &&
                            structure.structureType != STRUCTURE_WALL;
                }
            });
            if(targets.length > 0){
                targets = targets.sort((t1, t2) => {t1.hits < t2.hits;});
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#0000ff'}});
                }
            } else {
                if(creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0){
                    creep.memory.repairing = false;
                }
            }
        }
    }
}

module.exports = roleRepair;