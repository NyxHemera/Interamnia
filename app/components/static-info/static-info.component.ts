import { Component, Input, OnInit } from '@angular/core';
import { SolarObj } from 'app/objects/static';

@Component({
	selector: 'static-info-component',
	templateUrl: 'app/components/static-info/static-info.component.html',
	styleUrls: ['app/components/static-info/static-info.component.css']
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