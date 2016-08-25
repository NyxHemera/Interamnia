import {
	StarSystem,
	SolarObj,
	Planet,
	Moon,
	Station
	} from '../objects/static';

import { MapComponent } from './map.component';

describe('Map Library', () => {

	describe('MapComponent', () => {

		it('can build a map array from a StarSystem', () => {
			var system = new StarSystem();

			system.width = 50;
			system.height = 50;

			var mapArr = MapComponent.buildMapFromStarSystem(system);
			expect(mapArr.length).toEqual(50);
			expect(mapArr[0].length).toEqual(50);
		});

		it('prints static objects to the map array', () => {
			var system = new StarSystem();

			var mapArr = MapComponent.buildMapFromStarSystem(system);
			var coords = system.stars[0].coords;

			expect(mapArr[coords.y][coords.x]).not.toEqual('X');
			expect(mapArr[coords.y][coords.x]).toBeTruthy();
		});

	});

});