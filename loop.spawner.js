/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('loop.spawner');
 * mod.thing == 'a thing'; // true
 */

var loopSpawner = {
    trySpawn: function() {
        desiredAmounts = {
            'harvester': 2,
            'upgrader': 2,
            'builder': 3,
            'repair': 1
        }
        
        typeBuilds = {
            'harvester': [MOVE, MOVE, MOVE, CARRY, CARRY, WORK, WORK],
            'builder': [MOVE, MOVE, MOVE, CARRY, CARRY, WORK, WORK],
            'upgrader': [MOVE, CARRY, WORK, WORK, WORK, WORK, WORK, WORK],
            'repair': [MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, WORK]
        }
        
        var spawn = Game.spawns['Spawn1']; //bad
        if (spawn.room.energyAvailable >= 200){
            for(var type in desiredAmounts){
                lCreeps = _.filter(Game.creeps, (creep) => {
                    return creep.memory.role == type;
                });
                if(spawn.room.energyAvailable >= calculateCost(typeBuilds[type])){
                    if(lCreeps.length < desiredAmounts[type]){
                        doSpawn(spawn, type, typeBuilds[type]);
                    }
                }
            }
        }
    }
}

function doSpawn(spawn, type, build){
    console.log('Buliding ' + type);
    var name = type + Game.time;
    var harvestLocation = 0;
    if(type !== 'upgrader'){
        harvestLocation = sourceDistribution();
    }
    spawn.spawnCreep(build, name, {memory: {role: type, harvestLocation: harvestLocation}});
}


function sourceDistribution(){
    var sources = {}
    for(var name in Game.creeps){
        var creep = Game.creeps[name];
        var harvestLoc = creep.memory.harvestLocation;
        if(typeof harvestLoc !== 'undefined'){
            if(harvestLoc in sources){
                sources[harvestLoc] += 1;
            } else {
                sources[harvestLoc] = 1;
            }
        }
    }
    var keys   = Object.keys(sources);
    var lowest = Math.min.apply(null, keys.map(function(x) { return sources[x]} ));
    var match  = keys.filter(function(y) { return sources[y] === lowest });
    return match[0];
}

function calculateCost(body){
    var costs = {
        'work': 100,
        'carry': 50,
        'move': 50
    }

    var cost = 0;
    for(var part in body){
        cost += costs[body[part]];
    }
    return cost;
}


module.exports = loopSpawner;