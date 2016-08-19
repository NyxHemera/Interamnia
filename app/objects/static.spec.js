"use strict";
var static_1 = require('./static');
describe('Static Library', function () {
    describe('StarSystem', function () {
    });
    describe('SolarObj', function () {
        it('can calculate the distance between two solar objects', function () {
            var s1 = new static_1.SolarObj();
            var s2 = new static_1.SolarObj();
            s1.coords.x = 3;
            s1.coords.y = 23;
            s2.coords.x = 43;
            s2.coords.y = -83;
            expect(static_1.SolarObj.calcDistance(s1, s2)).toEqual(113.30);
        });
    });
    describe('Planet', function () {
        it('has a type', function () {
            for (var i = 0; i < 10; i++) {
                var x = new static_1.Planet();
                expect(x.type).toBeTruthy();
            }
        });
        it('has a diameter', function () {
            for (var i = 0; i < 10; i++) {
                var x = new static_1.Planet();
                expect(x.diameter).toBeTruthy();
            }
        });
        it('generates gas type diameter between 40Mm and 200Mm', function () {
            var p = new static_1.Planet();
            for (var i = 0; i < 100; i++) {
                var x = p.genDiameter("Gas");
                expect(x < 200000 && x > 40000).toBeTruthy();
            }
        });
        it('generates rock type diameter between 3Mm and 30Mm', function () {
            var p = new static_1.Planet();
            for (var i = 0; i < 100; i++) {
                var x = p.genDiameter("Rock");
                expect(x < 30000 && x > 3000).toBeTruthy();
            }
        });
        it('generates ice type diameter between 3Mm and 30Mm', function () {
            var p = new static_1.Planet();
            for (var i = 0; i < 100; i++) {
                var x = p.genDiameter("Ice");
                expect(x < 30000 && x > 3000).toBeTruthy();
            }
        });
    });
    describe('Moon', function () {
        it('has a type', function () {
            for (var i = 0; i < 10; i++) {
                var p = new static_1.Planet();
                var m = new static_1.Moon(p);
                expect(p.type).toBeTruthy();
            }
        });
        it('has a type of ice if its planet is ice type', function () {
            var p = new static_1.Planet();
            p.type = "Ice";
            var m = new static_1.Moon(p);
            expect(m.type).toEqual(p.type);
        });
        it('has a planet', function () {
            var p = new static_1.Planet();
            var m = new static_1.Moon(p);
            expect(m.planet).toBeTruthy();
        });
        it('has a diameter', function () {
            for (var i = 0; i < 10; i++) {
                var p = new static_1.Planet();
                var m = new static_1.Moon(p);
                expect(p.diameter).toBeTruthy();
            }
        });
        it('has diameter smaller than its planet', function () {
            var p = new static_1.Planet();
            var m = new static_1.Moon(p);
            for (var i = 0; i < 100; i++) {
                var x = m.genDiameter();
                expect(x < p.diameter).toBeTruthy();
            }
        });
    });
    describe('Station', function () {
    });
});
//# sourceMappingURL=static.spec.js.map