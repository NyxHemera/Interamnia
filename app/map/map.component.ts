import { Component, Input, OnInit } from '@angular/core';
import { StarSystem } from '../objects/static';

@Component({
	selector: 'map-component',
	templateUrl: 'app/map/map.component.html',
	styleUrls: ['app/map/map.component.css']
})

export class MapComponent implements OnInit {

	mapArr = [];
	@Input('system')
	system: StarSystem;

	hoveredCell = {
		x: 0,
		y: 0
	};

	detectedStructure = {};

	constructor() {
		
	}

	ngOnInit() {
		console.log(this.system);
		this.mapArr = MapComponent.buildMapFromStarSystem(this.system);
	}

	hoverCell(x, y) {
		this.hoveredCell.x = x+1;
		this.hoveredCell.y = y+1;

		this.detectedStructure = this.mapArr[y][x];
	}

	selectCell(x, y) {
		console.log(x + ' - ' + y);
	}

	static buildMapFromStarSystem(ss) {
		var mapArr = [];

		// Build the initial strucure of the System with placeholder " "
		for(let i=0; i<ss.height; i++) {
			mapArr.push([]);
			for(let j=0; j<ss.width; j++) {
				mapArr[i].push("");
			}
		}

		var staticStructures = ss.getStaticStructures();
		// Print the static structures to the mapArr
		for(let key in staticStructures) {
			staticStructures[key].forEach( (struct, i) => {
				// Coordinates reversed to allow for easy map printing
				mapArr[struct.coords.y][struct.coords.x] = struct;
			});
		}

		return mapArr;
	}

}