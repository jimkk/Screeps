/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('loop.utilities');
 * mod.thing == 'a thing'; // true
 */

var loopUtilities = {
    garbageCollection: function () {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }   
    }
}

module.exports = loopUtilities;