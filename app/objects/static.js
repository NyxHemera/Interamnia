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

	}

}

class SolarObj {

	constructor() {
		// Location Data - Relative to System
		this.coords = { x: 0, y: 0 };
		this.system; // Star System it belongs to

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

	constructor() {
		super();

		this.type;
		this.diameter;

		this.resources;
	}

}

class Planet extends SolarObj {

	constructor() {
		super();

		// Body Attributes
		this.type = this.genType();
		this.diameter = this.genDiameter(this.type); // km

		this.resources = [];

	}

	genType() {
		var num = Math.floor(Math.random()*10)+1;
		if(num <= 3) { // 30%
			return "Gas";
		}else if(num <= 6) { // 30%
			return "Ice";
		}else { // 40%
			return "Rock";
		}
	}

	genDiameter(type) {
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

}

class Moon extends SolarObj {

	constructor(planet) {
		super();

		this.planet = planet;

		// Body Attributes
		this.type = this.genType();
		this.diameter = this.genDiameter();

		this.resources = [];
	}

	genType() {
		var num = Math.floor(Math.random()*10)+1;
		if(this.planet.type === "Ice" || num <= 3) { // 30%
			return "Ice";
		}else { // 70%
			return "Rock";
		}
	}

	genDiameter() {
		var max = this.planet.diameter;
		var min = this.planet.diameter * .3;
		return Math.floor(Math.random()*(max-min))+min;
	}

}

class Station extends SolarObj {

	constructor() {

		// Station Attributes

		this.modules = [];
	}

}

exports.StarSystem = StarSystem;
exports.SolarObj = SolarObj;
exports.Planet = Planet;
exports.Moon = Moon;
exports.Station = Station;