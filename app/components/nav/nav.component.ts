import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { StarSystem, SolarObj } from '/app/objects/static';

@Component({
	selector: 'nav-component',
	templateUrl: 'app/components/nav/nav.component.html',
	styleUrls: ['app/components/nav/nav.component.css']
})

export class NavComponent implements OnInit {

	IL;
	prevIndex: number;
	constructor() {
		this.IL = {};
		this.prevIndex = 0;
	}

	ngOnInit() {
		this.updateNavIndicator(0);
		console.log(this.IL);
	}

	updateNavIndicator(index) {
		var tabs = document.getElementsByClassName("tab");
		var rect = tabs[index].getBoundingClientRect();
		var targetWidth = rect.width;
		var targetLeft = rect.left;
		var totalWidth = 0;

		// Choose direction to stretch
		if(index > this.prevIndex) {
			for(let i=this.prevIndex; i<=index; i++) {
				totalWidth += tabs[i].getBoundingClientRect().width;
			}

			this.IL.width = totalWidth;
		}else if(index < this.prevIndex) {
			for(let i=index; i<=this.prevIndex; i++) {
				totalWidth += tabs[i].getBoundingClientRect().width;
			}

			this.IL.left = targetLeft;
			this.IL.width = totalWidth;
		}else {
			this.IL.width = targetWidth;
			this.IL.left = targetLeft;
		}

		// Bounce into place
		setTimeout( () => {
			this.IL.width = targetWidth;
			this.IL.left = targetLeft;
		}, 150);

		this.prevIndex = index;
	}

}