import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MapComponent } from './map/map.component';
import { StarSystem } from './objects/static';

@Component({
	selector: 'my-app',
	templateUrl: 'app/app.component.html',
	// styleUrls: ['app/app.component.css'],
	directives: [ROUTER_DIRECTIVES, MapComponent]
})

export class AppComponent {
	system: StarSystem;

	constructor() {
		this.system = new StarSystem();
	}
}