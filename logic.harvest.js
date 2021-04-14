var logicHarvest = {

    run: (creep) => {
        if(!creep.memory.harvestLocation){
            creep.memory.harvestLocation = 0;
        }
        var source = creep.room.find(FIND_SOURCES)[creep.memory.harvestLocation];
        if(creep.store.energy < creep.store.getCapacity()) {
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            return true;
        } else {
            if(creep.pos.getRangeTo(source.pos) == 1){
                if(!creep.memory.idleTime){
                    creep.memory.idleTime = Game.time;
                    creep.memory.idlePos = creep.pos;
                }
                else if(Game.time - creep.memory.idleTime > 5){
                    var rpIdlePosition = new RoomPosition(creep.memory.idlePos.x, creep.memory.idlePos.y, creep.memory.idlePos.roomName);
                    if(creep.pos.getRangeTo(rpIdlePosition) == 0){
                        creep.say('beepbeep');
                        var sourceDirection = creep.pos.getDirectionTo(source.pos);
                        var oppositeDirection = (sourceDirection + 4) % 8; 
                        creep.move(oppositeDirection);
                    }
                    creep.memory.idlePos = null;
                    creep.memory.idleTime = null;
                }
                    
            }
            return false;
        }
    }

}

module.exports = logicHarvest;