"use strict";
var static_1 = require('../objects/static');
var map_component_1 = require('./map.component');
describe('Map Library', function () {
    describe('MapComponent', function () {
        it('can build a map array from a StarSystem', function () {
            var system = new static_1.StarSystem();
            system.width = 50;
            system.height = 50;
            var mapArr = map_component_1.MapComponent.buildMapFromStarSystem(system);
            expect(mapArr.length).toEqual(50);
            expect(mapArr[0].length).toEqual(50);
        });
        it('prints static objects to the map array', function () {
            var system = new static_1.StarSystem();
            var mapArr = map_component_1.MapComponent.buildMapFromStarSystem(system);
            var coords = system.stars[0].coords;
            expect(mapArr[coords.y][coords.x]).not.toEqual('X');
            expect(mapArr[coords.y][coords.x]).toBeTruthy();
        });
    });
});
//# sourceMappingURL=map.component.spec.js.map