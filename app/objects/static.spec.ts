import {
	System,
	SolarObj,
	Planet,
	Moon,
	Station
	} from './static';

describe('Static Library', () => {

	describe('StarSystem', () => {

	});

	describe('SolarObj', () => {

		it('can calculate the distance between two solar objects', () => {
			var s1 = new SolarObj();
			var s2 = new SolarObj();

			s1.coords.x = 3;
			s1.coords.y = 23;
			s2.coords.x = 43;
			s2.coords.y = -83;

			expect(SolarObj.calcDistance(s1,s2)).toEqual(113.30);
		});

	});

	describe('Planet', () => {

		it('has a type', () => {
			for(var i=0; i<10; i++) {
				var x = new Planet();
				expect(x.type).toBeTruthy();
			}
		});

		it('has a diameter', () => {
			for(var i=0; i<10; i++) {
				var x = new Planet();
				expect(x.diameter).toBeTruthy();
			}
		});

		it('generates gas type diameter between 40Mm and 200Mm', () => {
			var p = new Planet();
			for(var i=0; i<100; i++) {
				var x = p.genDiameter("Gas");
				expect(x < 200000 && x > 40000).toBeTruthy();
			}
		});

		it('generates rock type diameter between 3Mm and 30Mm', () => {
			var p = new Planet();
			for(var i=0; i<100; i++) {
				var x = p.genDiameter("Rock");
				expect(x < 30000 && x > 3000).toBeTruthy();
			}
		});

		it('generates ice type diameter between 3Mm and 30Mm', () => {
			var p = new Planet();
			for(var i=0; i<100; i++) {
				var x = p.genDiameter("Ice");
				expect(x < 30000 && x > 3000).toBeTruthy();
			}
		});

	});

	describe('Moon', () => {

		it('has a type', () => {
			for(var i=0; i<10; i++) {
				var p = new Planet();
				var m = new Moon(p);
				expect(p.type).toBeTruthy();
			}
		});

		it('has a type of ice if its planet is ice type', () => {
			var p = new Planet();
			p.type = "Ice";
			var m = new Moon(p);
			expect(m.type).toEqual(p.type);
		});

		it('has a planet', () => {
			var p = new Planet();
			var m = new Moon(p);

			expect(m.planet).toBeTruthy();
		});

		it('has a diameter', () => {
			for(var i=0; i<10; i++) {
				var p = new Planet();
				var m = new Moon(p);
				expect(p.diameter).toBeTruthy();
			}
		});

		it('has diameter smaller than its planet', () => {
			var p = new Planet();
			var m = new Moon(p);
			for(var i=0; i<100; i++) {
				var x = m.genDiameter();
				expect(x < p.diameter).toBeTruthy();
			}
		});

	});

	describe('Station', () => {

	});

});