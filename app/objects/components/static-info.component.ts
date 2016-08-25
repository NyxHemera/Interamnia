import { Component, Input, OnInit } from '@angular/core';
import { SolarObj } from '../static';

@Component({
	selector: 'static-info-component',
	templateUrl: 'app/objects/components/static-info.component.html',
	styleUrls: ['app/objects/components/static-info.component.css']
})

export class StaticInfoComponent implements OnInit {

	@Input('solarObj')
	solarObj: SolarObj;

	constructor() {
		
	}

	ngOnInit() {
		console.log(this.solarObj);
	}

}