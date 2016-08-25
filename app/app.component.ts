import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MapComponent } from './map/map.component';
import { StaticInfoComponent } from './objects/components/static-info.component';
import { StarSystem, SolarObj } from './objects/static';

@Component({
	selector: 'my-app',
	templateUrl: 'app/app.component.html',
	styleUrls: ['app/app.component.css'],
	directives: [ROUTER_DIRECTIVES, MapComponent, StaticInfoComponent]
})

export class AppComponent {
	system: StarSystem;
	selectedObj: SolarObj;

	constructor() {
		this.system = new StarSystem();
	}

	SOSelected(solarObj) {
		this.selectedObj = solarObj;
	}


}