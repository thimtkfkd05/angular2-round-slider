"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var round_slider_1 = require("./round-slider");
var round_slider_2 = require("./round-slider");
exports.RoundSliderComponent = round_slider_2.RoundSliderComponent;
var RoundSliderModule = (function () {
    function RoundSliderModule() {
    }
    RoundSliderModule_1 = RoundSliderModule;
    RoundSliderModule.forRoot = function () {
        return {
            ngModule: RoundSliderModule_1
        };
    };
    RoundSliderModule = RoundSliderModule_1 = __decorate([
        core_1.NgModule({
            declarations: [round_slider_1.RoundSliderComponent],
            imports: [common_1.CommonModule],
            exports: [round_slider_1.RoundSliderComponent]
        })
    ], RoundSliderModule);
    return RoundSliderModule;
    var RoundSliderModule_1;
}());
exports.RoundSliderModule = RoundSliderModule;
//# sourceMappingURL=index.js.map