import {
	StarSystem,
	SolarObj,
	Planet,
	Moon,
	Station
	} from './static';

describe('Static Library', () => {

	describe('StarSystem', () => {

		let system;

		beforeEach(() => {
			system = new StarSystem();
		});

		it('generates 1-3 stars per system', () => {
			for(let i=0; i<100; i++) {
				system.planets = StarSystem.genPlanets(system);
				expect(system.stars.length > 0).toEqual(true);
				expect(system.stars.length <= 3).toEqual(true);
			}
		});

		it('has stars', () => {
			expect(system.stars).toBeTruthy();
			expect(system.stars.length > 0).toEqual(true);
			expect(system.stars.length <= 3).toEqual(true);
		});

		it('generates 0-8 planets per system', () => {
			for(let i=0; i<100; i++) {
				system.planets = StarSystem.genPlanets(system);
				expect(system.planets.length >= 0).toEqual(true);
				expect(system.planets.length <= 8).toEqual(true);
			}
		});

	});

	describe('SolarObj', () => {

		it('can calculate the distance between two solar objects', () => {
			var system = new StarSystem();
			var s1 = new SolarObj(system);
			var s2 = new SolarObj(system);

			s1.coords.x = 3;
			s1.coords.y = 23;
			s2.coords.x = 43;
			s2.coords.y = -83;

			expect(SolarObj.calcDistance(s1,s2)).toEqual(113.30);
		});

	});

	describe('Planet', () => {

		let system;

		beforeEach(() => {
			system = new StarSystem();
		});

		it('has a type', () => {
			for(var i=0; i<10; i++) {
				var x = new Planet(system);
				expect(x.type).toBeTruthy();
			}
		});

		it('has a diameter', () => {
			for(var i=0; i<10; i++) {
				var x = new Planet(system);
				expect(x.diameter).toBeTruthy();
			}
		});

		it('generates gas type diameter between 40Mm and 200Mm', () => {
			for(var i=0; i<100; i++) {
				var x = Planet.genDiameter("Gas");
				expect(x < 200000 && x > 40000).toBeTruthy();
			}
		});

		it('generates rock type diameter between 3Mm and 30Mm', () => {
			for(var i=0; i<100; i++) {
				var x = Planet.genDiameter("Rock");
				expect(x < 30000 && x > 3000).toBeTruthy();
			}
		});

		it('generates ice type diameter between 3Mm and 30Mm', () => {
			for(var i=0; i<100; i++) {
				var x = Planet.genDiameter("Ice");
				expect(x < 30000 && x > 3000).toBeTruthy();
			}
		});

	});

	describe('Moon', () => {

		let system;

		beforeEach(() => {
			system = new StarSystem();
		});

		it('has a type', () => {
			for(var i=0; i<10; i++) {
				var p = new Planet(system);
				var m = new Moon(p);
				expect(p.type).toBeTruthy();
			}
		});

		it('has a type of ice if its planet is ice type', () => {
			var p = new Planet(system);
			p.type = "Ice";
			var m = new Moon(p);
			expect(m.type).toEqual(p.type);
		});

		it('has a planet', () => {
			var p = new Planet(system);
			var m = new Moon(p);

			expect(m.planet).toBeTruthy();
		});

		it('has a diameter', () => {
			for(var i=0; i<10; i++) {
				var p = new Planet(system);
				var m = new Moon(p);
				expect(p.diameter).toBeTruthy();
			}
		});

		it('has diameter smaller than its planet', () => {
			var p = new Planet(system);
			var m = new Moon(p);
			for(var i=0; i<100; i++) {
				var x = Moon.genDiameter(p);
				expect(x < p.diameter).toBeTruthy();
			}
		});

	});

	describe('Station', () => {

	});

});