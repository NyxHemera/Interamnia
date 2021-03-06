"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var NavComponent = (function () {
    function NavComponent() {
        this.IL = {};
        this.prevIndex = 0;
    }
    NavComponent.prototype.ngOnInit = function () {
        this.updateNavIndicator(0);
        console.log(this.IL);
    };
    NavComponent.prototype.updateNavIndicator = function (index) {
        var _this = this;
        var tabs = document.getElementsByClassName("tab");
        var rect = tabs[index].getBoundingClientRect();
        var targetWidth = rect.width;
        var targetLeft = rect.left;
        var totalWidth = 0;
        // Choose direction to stretch
        if (index > this.prevIndex) {
            for (var i = this.prevIndex; i <= index; i++) {
                totalWidth += tabs[i].getBoundingClientRect().width;
            }
            this.IL.width = totalWidth;
        }
        else if (index < this.prevIndex) {
            for (var i = index; i <= this.prevIndex; i++) {
                totalWidth += tabs[i].getBoundingClientRect().width;
            }
            this.IL.left = targetLeft;
            this.IL.width = totalWidth;
        }
        else {
            this.IL.width = targetWidth;
            this.IL.left = targetLeft;
        }
        // Bounce into place
        setTimeout(function () {
            _this.IL.width = targetWidth;
            _this.IL.left = targetLeft;
        }, 150);
        this.prevIndex = index;
    };
    NavComponent = __decorate([
        core_1.Component({
            selector: 'nav-component',
            templateUrl: 'app/components/nav/nav.component.html',
            styleUrls: ['app/components/nav/nav.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], NavComponent);
    return NavComponent;
}());
exports.NavComponent = NavComponent;
//# sourceMappingURL=nav.component.js.map