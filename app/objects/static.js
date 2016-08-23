class StarSystem {

	constructor() {

		// Location Data - Relative to galaxy
		this.coords = { x: 0, y: 0 };
		this.galaxy; // Galaxy it belongs to

		// System Attributes
		this.stars = [];
		this.planets = [];
		this.moons = [];
		this.stations = [];

		// Generate Structures
		this.stars = StarSystem.genStars(this);
		this.planets = StarSystem.genPlanets(this);
		this.moons = StarSystem.genMoons(this.planets);

	}

	static genStars(system) {
		var numStars = 0;
		var stars = [];
		var num = Math.floor(Math.random()*10)+1;
		if(num <= 1) { // 10%
			numStars = 3;
		}else if(num <= 4) { // 30%
			numStars = 2;
		}else { // 60%
			numStars = 1;
		}

		for(var i=0; i<numStars; i++) {
			stars.push(new Star(system));
		}

		return stars;
	}

	static genPlanets(system) {
		var numPlanets = 0;
		var planets = [];
		var rand = Math.floor(Math.random()*100)+1;
		if(rand <= 5) { // 5%
			numPlanets = 0;
		}else if(rand <= 10) { // 5%
			numPlanets = 8;
		}else if(rand <= 20) { // 10%
			numPlanets = 7;
		}else if(rand <= 30) { // 10%
			numPlanets = 6;
		}else if(rand <= 40) { // 10%
			numPlanets = 5;
		}else if(rand <= 55) { // 15%
			numPlanets = 4;
		}else if(rand <= 75) { // 20%
			numPlanets = 3;
		}else if(rand <= 90) { // 15%
			numPlanets = 2;
		}else { // 10%
			numPlanets = 1;
		}

		for(var i=0; i<numPlanets; i++) {
			planets.push(new Planet(system));
		}

		return planets;
	}

	static genMoons(planets) {
		var moons = [];
		planets.forEach( (planet, i) => {
			var newMoons = Planet.genMoons(planet);
			newMoons.forEach( (moon, i) => { moons.push(moon); });
		});

		return moons;
	}

}

class SolarObj {

	constructor(system) {
		// Location Data - Relative to System
		this.coords = { x: 0, y: 0 };
		this.system = system; // Star System it belongs to

		// Location Attributes
		this.population;
		this.owner;
		this.mass;
	}

	static calcDistance(s1, s2) {
		var a = s1.coords.x - s2.coords.x;
		var b = s1.coords.y - s2.coords.y;
		var dist = Math.sqrt((a*a)+(b*b))
		return Math.round(dist*100)/100; // Rounds to two decimals
	}

}

class Star extends SolarObj {

	constructor(system) {
		super(system);

		this.type;
		this.diameter;

		this.resources;
	}

	static genType() {

	}

	static genDiameter() {

	}

}

class Planet extends SolarObj {

	constructor(system) {
		super(system);

		// Body Attributes
		this.type = Planet.genType();
		this.diameter = Planet.genDiameter(this.type); // km

		this.moons = [];
		this.resources = [];

	}

	static genType() {
		var num = Math.floor(Math.random()*10)+1;
		if(num <= 3) { // 30%
			return "Gas";
		}else if(num <= 6) { // 30%
			return "Ice";
		}else { // 40%
			return "Rock";
		}
	}

	static genDiameter(type) {
		switch(type) {
			case "Gas":
				return Math.floor(Math.random()*160000)+40000;
				break;
			case "Rock":
			case "Ice":
				return Math.floor(Math.random()*27000)+3000;
				break;
		}
	}

	// Called on System Generation
	static genMoons(planet) {
		var moons = [];
		var rand = Math.floor(Math.random()*6);
		for(let i=0; i<rand; i++) {
			moons.push(new Moon(planet));
		}
		planet.moons = moons;
		return moons;
	}

}

class Moon extends SolarObj {

	constructor(planet) {
		super(planet.system);

		this.planet = planet;

		// Body Attributes
		this.type = Moon.genType(planet);
		this.diameter = Moon.genDiameter(planet);

		this.resources = [];
	}

	static genType(planet) {
		var num = Math.floor(Math.random()*10)+1;
		if(planet.type === "Ice" || num <= 3) { // 30%
			return "Ice";
		}else { // 70%
			return "Rock";
		}
	}

	static genDiameter(planet) {
		var max = planet.diameter;
		var min = planet.diameter * .3;
		return Math.floor(Math.random()*(max-min))+min;
	}

}

class Station extends SolarObj {

	constructor(system) {

		// Station Attributes

		this.modules = [];
	}

}

exports.StarSystem = StarSystem;
exports.SolarObj = SolarObj;
exports.Planet = Planet;
exports.Moon = Moon;
exports.Station = Station;