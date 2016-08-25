import {
	StarSystem,
	SolarObj,
	Star,
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

		it('generates 0-5 moons per planet', () => {
			for(let i=0; i<100; i++) {
				let system = new StarSystem();
				for(let j=0; j<system.planets.length; j++) {
					expect(system.planets[j].moons).toBeTruthy();
					expect(system.planets[j].moons.length >= 0).toEqual(true);
					expect(system.planets[j].moons.length <= 5).toEqual(true);
				}
			}
		});

		it('generates no moons if there are no planets', () => {
			for(let i=0; i<100; i++) {
				let system = new StarSystem();
				if(system.planets.length === 0) {
					expect(system.moons.length).toEqual(0);
				}
			}
		})

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

	describe('Star', () => {

		it('can detect stars too close to each other', () => {
			var system = { width: 50, height: 50};
			var s1 = new Star(system, []); //built with no previous stars
			var s2 = new Star(system, []);

			s1.coords = {
				x: Math.floor(system.width/2),
				y: Math.floor(system.width/2)
			}

			s2.coords = s1.coords;

			expect(s1.coords).toEqual(s2.coords);
			expect(Star.validatePlacement(s2.coords, [s1], 2.5)).not.toBeTruthy();
		});

		it('can generate stars a proper distance from previously created stars', () => {
			var system = { width: 50, height: 50};
			var s1 = new Star(system, []); //built with no previous stars
			var s2 = new Star(system, [s1]);
			for(let i=0; i<100; i++) {
				let s3 = new Star(system, [s1, s2]);
				expect(SolarObj.calcDistance(s1, s2) > 2.5).toBeTruthy();
			}

		});

	});

	describe('Planet', () => {

		let system;

		beforeEach(() => {
			system = new StarSystem();
		});

		it('has a type', () => {
			for(var i=0; i<10; i++) {
				var x = new Planet(system, []);
				expect(x.type).toBeTruthy();
			}
		});

		it('has a diameter', () => {
			for(var i=0; i<10; i++) {
				var x = new Planet(system, []);
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
		let p;
		let m;
		beforeEach(() => {
			system = new StarSystem();
			p = new Planet(system, []);
			m = new Moon(p, []);
		});

		it('has a type', () => {
			for(var i=0; i<10; i++) {
				var p = new Planet(system, []);
				var m = new Moon(p, []);
				expect(p.type).toBeTruthy();
			}
		});

		it('has a type of ice if its planet is ice type', () => {
			p.type = "Ice";
			var m = new Moon(p, []);
			expect(m.type).toEqual(p.type);
		});

		it('has a planet', () => {
			expect(m.planet).toBeTruthy();
		});

		it('has a diameter', () => {
			for(var i=0; i<10; i++) {
				var p = new Planet(system, []);
				var m = new Moon(p, []);
				expect(p.diameter).toBeTruthy();
			}
		});

		it('has diameter smaller than its planet', () => {
			for(var i=0; i<100; i++) {
				var x = Moon.genDiameter(p);
				expect(x < p.diameter).toBeTruthy();
			}
		});

	});

	describe('Station', () => {

	});

});