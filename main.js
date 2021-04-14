var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepair = require('role.repair');
var roleTower = require('role.tower');
var loopSpawner = require('loop.spawner')
var loopUtilities = require('loop.utilities')

module.exports.loop = function () {
    
    loopUtilities.garbageCollection();
    
    loopSpawner.trySpawn();

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repair'){
            roleRepair.run(creep);
        }
    }
    var towers = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_TOWER;
        }
    });
    for(var t in towers){
        var tower = towers[t];
        roleTower.run(tower);
    }
}

