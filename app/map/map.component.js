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
var static_1 = require('../objects/static');
var MapComponent = (function () {
    function MapComponent() {
        this.mapArr = [];
        this.hoveredCell = {
            x: 0,
            y: 0
        };
        this.detectedStructure = {};
    }
    MapComponent.prototype.ngOnInit = function () {
        console.log(this.system);
        this.mapArr = MapComponent.buildMapFromStarSystem(this.system);
    };
    MapComponent.prototype.hoverCell = function (x, y) {
        this.hoveredCell.x = x + 1;
        this.hoveredCell.y = y + 1;
        this.detectedStructure = this.mapArr[y][x];
    };
    MapComponent.prototype.selectCell = function (x, y) {
        console.log(x + ' - ' + y);
    };
    MapComponent.buildMapFromStarSystem = function (ss) {
        var mapArr = [];
        // Build the initial strucure of the System with placeholder " "
        for (var i = 0; i < ss.height; i++) {
            mapArr.push([]);
            for (var j = 0; j < ss.width; j++) {
                mapArr[i].push("");
            }
        }
        var staticStructures = ss.getStaticStructures();
        // Print the static structures to the mapArr
        for (var key in staticStructures) {
            staticStructures[key].forEach(function (struct, i) {
                // Coordinates reversed to allow for easy map printing
                mapArr[struct.coords.y][struct.coords.x] = struct;
            });
        }
        return mapArr;
    };
    __decorate([
        core_1.Input('system'), 
        __metadata('design:type', (typeof (_a = typeof static_1.StarSystem !== 'undefined' && static_1.StarSystem) === 'function' && _a) || Object)
    ], MapComponent.prototype, "system", void 0);
    MapComponent = __decorate([
        core_1.Component({
            selector: 'map-component',
            templateUrl: 'app/map/map.component.html',
            styleUrls: ['app/map/map.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], MapComponent);
    return MapComponent;
    var _a;
}());
exports.MapComponent = MapComponent;
//# sourceMappingURL=map.component.js.map