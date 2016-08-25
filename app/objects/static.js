class StarSystem {

	constructor() {

		// Location Data - Relative to galaxy
		this.coords = { x: 0, y: 0 };
		this.galaxy; // Galaxy it belongs to

		// System Attributes
		this.name = "Sirius";
		this.width = 50;
		this.height = 50;
		this.stars = [];
		this.planets = [];
		this.moons = [];
		this.stations = [];

		// Generate Structures
		this.stars = StarSystem.genStars(this);
		this.planets = StarSystem.genPlanets(this);
		this.moons = StarSystem.genMoons(this.planets);

	}

	getStaticStructures() {
		return {
			stars: this.stars,
			planets: this.planets,
			moons: this.moons,
			stations: this.stations
		};
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
			stars.push(new Star(system, stars));
		}

		// Check validity of placement
		//stars = StarSystem.validatePlacement(stars, 1.5);

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
			planets.push(new Planet(system, planets));
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
		this.name = "";
		this.mapIcon = "black";
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

	static genCoords(system) {
		return {
			x: Math.floor(Math.random()*system.width),
			y: Math.floor(Math.random()*system.height)
		}
	}

	// Validates coords against previous objects in system
	static validatePlacement(coords, objects, minDist) {
		if(objects.length > 0) {
			for(let i=0; i<objects.length; i++) {
				if(SolarObj.calcDistance(objects[i], {coords: coords}) <= minDist) {
					return false;
				}
			}
			return true;
		}else {
			return true;
		}
	}

}

class Star extends SolarObj {

	constructor(system, stars) {
		super(system);

		this.coords = Star.genCoords(this.system, stars);

		this.name = "Star";
		this.mapIcon = "red";
		this.type;
		this.diameter;

		this.resources = [];
	}

	static genType() {

	}

	static genDiameter() {

	}

	static genCoords(system, stars) {
		var midX = system.width/2;
		var midY = system.height/2;

		// Constrained to a third of the width & height
		var flexX = system.width/4;
		var flexY = system.height/4;

		var coords = {
			// Star is centered around the center of the system
			// + or - flex/2
			x: Math.floor(midX + (Math.random()*flexX) - flexX/2),
			y: Math.floor(midY + (Math.random()*flexY) - flexY/2)
		}

		if(SolarObj.validatePlacement(coords, stars, 2.5)) {
			// If valid
			return coords;
		}else {
			// If not valid, rerun
			return Star.genCoords(system, stars);
		}

	}

}

class Planet extends SolarObj {

	constructor(system, planets) {
		super(system);

		this.coords = Planet.genCoords(this.system, planets);

		// Body Attributes
		this.name = "Planet";
		this.mapIcon = "green";
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

	static genCoords(system, planets) {
		var coords = {
			// Planet can generate anywhere on map
			x: Math.floor(Math.random()*system.width),
			y: Math.floor(Math.random()*system.height)
		}

		// Check against stars
		if(SolarObj.validatePlacement(coords, system.stars, 4)) {
			// If valid check against other planets
			if(SolarObj.validatePlacement(coords, planets, 5.5)) {
				// If valid
				return coords;
			}else {
				// If not valid, rerun
				return Planet.genCoords(system, planets);
			}
		}else {
			// If not valid, rerun
			return Planet.genCoords(system, planets);
		}

	}

	// Called on System Generation
	static genMoons(planet) {
		var moons = [];
		var rand = Math.floor(Math.random()*3);
		for(let i=0; i<rand; i++) {
			moons.push(new Moon(planet, moons));
		}
		planet.moons = moons;
		return moons;
	}

}

class Moon extends SolarObj {

	constructor(planet, moons) {
		super(planet.system);

		this.system = planet.system;
		this.planet = planet;
		this.coords = Moon.genCoords(planet, moons);

		// Body Attributes
		this.name = "Moon";
		this.mapIcon = "grey";
		this.type = Moon.genType(planet);
		this.diameter = Moon.genDiameter(planet);

		this.resources = [];
	}

	static genCoords(planet, moons) {
		var midX = planet.coords.x;
		var midY = planet.coords.y;

		// Constraints
		var flexX = 6;
		var flexY = 6;

		var coords = {
			// Star is centered around the center of the system
			// + or - flex/2
			x: Math.floor(midX + (Math.random()*flexX) - flexX/2),
			y: Math.floor(midY + (Math.random()*flexY) - flexY/2)
		}

		// Check if same as planet,
		// Check if far enough from planet,
		// Check if out of bounds,
		// Check against other moons
		if(coords.x !== midX && coords.y !== midY
			&& SolarObj.validatePlacement(coords, [planet], 1.5)
			&& coords.x > 0 && coords.x < planet.system.width
			&& coords.y > 0 && coords.y < planet.system.height
			&& SolarObj.validatePlacement(coords, moons, 1.5)) {
			// If valid
			return coords;
		}else {
			// If not valid, rerun
			return Moon.genCoords(planet, moons);
		}

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
		this.name = "Station";
		this.mapIcon = "blue";
		this.modules = [];
	}

}

exports.StarSystem = StarSystem;
exports.SolarObj = SolarObj;
exports.Star = Star;
exports.Planet = Planet;
exports.Moon = Moon;
exports.Station = Station;