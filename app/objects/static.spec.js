"use strict";
var static_1 = require('./static');
describe('Static Library', function () {
    describe('StarSystem', function () {
        var system;
        beforeEach(function () {
            system = new static_1.StarSystem();
        });
        it('generates 1-3 stars per system', function () {
            for (var i = 0; i < 100; i++) {
                system.planets = static_1.StarSystem.genPlanets(system);
                expect(system.stars.length > 0).toEqual(true);
                expect(system.stars.length <= 3).toEqual(true);
            }
        });
        it('has stars', function () {
            expect(system.stars).toBeTruthy();
            expect(system.stars.length > 0).toEqual(true);
            expect(system.stars.length <= 3).toEqual(true);
        });
        it('generates 0-8 planets per system', function () {
            for (var i = 0; i < 100; i++) {
                system.planets = static_1.StarSystem.genPlanets(system);
                expect(system.planets.length >= 0).toEqual(true);
                expect(system.planets.length <= 8).toEqual(true);
            }
        });
    });
    describe('SolarObj', function () {
        it('can calculate the distance between two solar objects', function () {
            var system = new static_1.StarSystem();
            var s1 = new static_1.SolarObj(system);
            var s2 = new static_1.SolarObj(system);
            s1.coords.x = 3;
            s1.coords.y = 23;
            s2.coords.x = 43;
            s2.coords.y = -83;
            expect(static_1.SolarObj.calcDistance(s1, s2)).toEqual(113.30);
        });
    });
    describe('Planet', function () {
        var system;
        beforeEach(function () {
            system = new static_1.StarSystem();
        });
        it('has a type', function () {
            for (var i = 0; i < 10; i++) {
                var x = new static_1.Planet(system);
                expect(x.type).toBeTruthy();
            }
        });
        it('has a diameter', function () {
            for (var i = 0; i < 10; i++) {
                var x = new static_1.Planet(system);
                expect(x.diameter).toBeTruthy();
            }
        });
        it('generates gas type diameter between 40Mm and 200Mm', function () {
            for (var i = 0; i < 100; i++) {
                var x = static_1.Planet.genDiameter("Gas");
                expect(x < 200000 && x > 40000).toBeTruthy();
            }
        });
        it('generates rock type diameter between 3Mm and 30Mm', function () {
            for (var i = 0; i < 100; i++) {
                var x = static_1.Planet.genDiameter("Rock");
                expect(x < 30000 && x > 3000).toBeTruthy();
            }
        });
        it('generates ice type diameter between 3Mm and 30Mm', function () {
            for (var i = 0; i < 100; i++) {
                var x = static_1.Planet.genDiameter("Ice");
                expect(x < 30000 && x > 3000).toBeTruthy();
            }
        });
    });
    describe('Moon', function () {
        var system;
        beforeEach(function () {
            system = new static_1.StarSystem();
        });
        it('has a type', function () {
            for (var i = 0; i < 10; i++) {
                var p = new static_1.Planet(system);
                var m = new static_1.Moon(p);
                expect(p.type).toBeTruthy();
            }
        });
        it('has a type of ice if its planet is ice type', function () {
            var p = new static_1.Planet(system);
            p.type = "Ice";
            var m = new static_1.Moon(p);
            expect(m.type).toEqual(p.type);
        });
        it('has a planet', function () {
            var p = new static_1.Planet(system);
            var m = new static_1.Moon(p);
            expect(m.planet).toBeTruthy();
        });
        it('has a diameter', function () {
            for (var i = 0; i < 10; i++) {
                var p = new static_1.Planet(system);
                var m = new static_1.Moon(p);
                expect(p.diameter).toBeTruthy();
            }
        });
        it('has diameter smaller than its planet', function () {
            var p = new static_1.Planet(system);
            var m = new static_1.Moon(p);
            for (var i = 0; i < 100; i++) {
                var x = static_1.Moon.genDiameter(p);
                expect(x < p.diameter).toBeTruthy();
            }
        });
    });
    describe('Station', function () {
    });
});
//# sourceMappingURL=static.spec.js.map