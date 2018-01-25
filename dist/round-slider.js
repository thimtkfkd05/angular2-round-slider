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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
var d3 = require("d3");
var RoundSliderComponent = (function () {
    function RoundSliderComponent(element) {
        this.element = element;
        this.width = 120;
        this.height = 120;
        this.radius = 45;
        this.max = 100;
        this.thick = 5;
        this.min = 0;
        this.units = '%';
        this._value = 0;
        this.localAngleValue = 0;
        this._value = this.radiansToValue(Math.PI);
        this.onChange = new Rx_1.Subject();
        this.onChangeEnd = new Rx_1.Subject();
    }
    Object.defineProperty(RoundSliderComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = Math.round(value);
            this.localAngleValue = this.valueToRadians(Math.round(value));
            this.updateUI();
        },
        enumerable: true,
        configurable: true
    });
    RoundSliderComponent.prototype.ngOnInit = function () {
        this.imageSize = (this.radius * 2);
        this.imagePosition = (this.width / 2) - this.radius;
        var host = d3.select(this.element.nativeElement);
        host = d3.selectAll('.round-slider-container');
        var drag = d3.drag()
            .on('start', this.dragStarted())
            .on('drag', this.dragged(this))
            .on('end', this.dragEnded(this));
        var svg = host.append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('class', 'container')
            .append('g')
            .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
        var container = svg.append('g');
        this.circleContainer = container.append('circle')
            .attr('r', this.radius - (this.thick / 2))
            .attr('class', 'circumference');
        var handle = [{
                x: 0,
                y: this.radius
            }];
        this.arc = d3.arc()
            .innerRadius(this.radius - (this.thick / 2))
            .outerRadius(this.radius + (this.thick / 2))
            .startAngle(Math.PI);
        this.arcForeground = container.append('path')
            .datum({ endAngle: Math.PI })
            .attr('class', 'arc')
            .attr('d', this.arc);
        this.thumb = container.append('g')
            .attr('class', 'dot')
            .selectAll('circle')
            .data(handle)
            .enter()
            .append('circle')
            .attr('r', 10)
            .attr('cx', function (d) {
            return d.x;
        })
            .attr('cy', function (d) {
            return d.y;
        })
            .call(drag);
        this.updateUI();
    };
    RoundSliderComponent.prototype.dragged = function (instance) {
        return function (d) {
            var coord = d3.mouse(this);
            var dFromOrigin = Math.sqrt(Math.pow(coord[0], 2) + Math.pow(coord[1], 2));
            var alpha = Math.acos(coord[0] / dFromOrigin);
            alpha = coord[1] < 0 ? -alpha : alpha;
            var value = instance.radiansToValue(alpha);
            var diff = instance._value - value;
            var needChangeUI = true;
            var needChangeD3 = true;
            if (Math.abs(diff) > 60) {
                needChangeD3 = false;
                if (diff > 0 && value != instance.max) {
                    alpha = Math.PI / 2 - 0.00000001;
                    value = instance.max;
                }
                else if (diff < 0 && value != instance.min) {
                    alpha = Math.PI / 2;
                    value = instance.min;
                }
                else {
                    needChangeUI = false;
                }
            }
            if (needChangeUI) {
                instance.localAngleValue = alpha;
                instance._value = value;
                instance.updateUI();
                instance.onChange.next(instance._value);
            }
            if (needChangeD3) {
                d3.select(this)
                    .attr('cx', d.x = instance.radius * Math.cos(alpha))
                    .attr('cy', d.y = instance.radius * Math.sin(alpha));
            }
        };
    };
    RoundSliderComponent.prototype.dragStarted = function () {
        return function () {
            d3.event.sourceEvent.stopPropagation();
            d3.select(this)
                .classed('dragging', true);
        };
    };
    RoundSliderComponent.prototype.updateUI = function () {
        if (this.localAngleValue === undefined || isNaN(this.localAngleValue)) {
            this.localAngleValue = this.valueToRadians(0);
        }
        if (this._value === undefined || isNaN(this._value)) {
            this._value = 0;
        }
        if (this.imageUrl && this.circleContainer) {
            this.circleContainer.attr('class', 'circumference transparent');
        }
        var xpos = this.radius * Math.cos(this.localAngleValue);
        var ypos = this.radius * Math.sin(this.localAngleValue);
        if (this.thumb) {
            this.thumb
                .attr('cx', xpos)
                .attr('cy', ypos);
        }
        if (this.arcForeground) {
            var arcAlpha = this.localAngleValue;
            if (this._value == 0) {
                arcAlpha = this.localAngleValue + (Math.PI / 2) + 0.001;
            }
            else if (xpos <= 0 && ypos >= 0) {
                arcAlpha = this.localAngleValue + (Math.PI / 2);
            }
            else {
                arcAlpha = (Math.PI * 2) + this.localAngleValue + (Math.PI / 2);
            }
            this.arcForeground.attr('d', this.arc({ endAngle: arcAlpha }));
        }
    };
    RoundSliderComponent.prototype.radiansToValue = function (radians) {
        var value = radians - (Math.PI / 2);
        value = value * 180 / Math.PI;
        if (value < 0) {
            value += 360;
        }
        return Math.round(value / 360 * this.max);
    };
    RoundSliderComponent.prototype.valueToRadians = function (value) {
        var radiansValue = value * 2 * Math.PI / this.max;
        radiansValue = radiansValue + (Math.PI / 2);
        if (radiansValue > Math.PI) {
            radiansValue = -(2 * Math.PI) + radiansValue;
        }
        return radiansValue;
    };
    RoundSliderComponent.prototype.dragEnded = function (instance) {
        return function () {
            var coord = d3.mouse(this);
            var radians = Math.atan2(coord[1], coord[0]);
            var value = instance.radiansToValue(radians);
            value = Math.floor(value);
            var diff = instance._value - value;
            var changeValue = true;
            if (Math.abs(diff) > 60) {
                if (diff > 0 && value != instance.max) {
                    value = instance.max;
                }
                else if (diff < 0 && value != instance.min) {
                    value = instance.min;
                }
                else {
                    changeValue = false;
                }
            }
            if (changeValue) {
                instance._value = value;
            }
            instance.onChangeEnd.next(value);
            d3.select(this)
                .classed('dragging', false);
        };
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], RoundSliderComponent.prototype, "width", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], RoundSliderComponent.prototype, "height", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], RoundSliderComponent.prototype, "radius", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], RoundSliderComponent.prototype, "max", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], RoundSliderComponent.prototype, "thick", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], RoundSliderComponent.prototype, "min", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], RoundSliderComponent.prototype, "imageUrl", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], RoundSliderComponent.prototype, "units", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], RoundSliderComponent.prototype, "value", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Rx_1.Subject)
    ], RoundSliderComponent.prototype, "onChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Rx_1.Subject)
    ], RoundSliderComponent.prototype, "onChangeEnd", void 0);
    RoundSliderComponent = __decorate([
        core_1.Component({
            selector: 'round-slider',
            template: "\n    <div class=\"round-slider-container\" [ngStyle]=\"{'width':width+'px', 'height':height+'px'}\">\n        <span class=\"round-slider-text\">{{value}}{{units}}</span>\n        <div [ngStyle]=\"{'background-image': 'url('+ imageUrl +')', 'width': imageSize + 'px', 'height': imageSize + 'px', 'top': imagePosition + 'px', 'left': imagePosition + 'px'}\" class=\"round-slider-image\"></div>\n    </div>"
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], RoundSliderComponent);
    return RoundSliderComponent;
}());
exports.RoundSliderComponent = RoundSliderComponent;
//# sourceMappingURL=round-slider.js.map