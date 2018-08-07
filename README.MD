# angular2-round-slider-custom

This module is customized from [angular2-round-slider by jgbernalp](https://github.com/jgbernalp/angular2-round-slider)


## Installation

To install this component, run:

```bash
$ npm install angular2-round-slider-custom --save
```

## Using Module

1. Include RoundSliderComponent in your Angular 2 component module:

```typescript
// ...
import { RoundSliderComponent } from 'angular2-round-slider-custom/dist';

@NgModule({
  // ...
  declarations: [
    // ...
    RoundSliderComponent
  ],
  exports: [
    // ...
    RoundSliderComponent
  ]
})
export class ComponentsModule { }
```

2. Include RoundSliderModule in your Angular 2 page module:

```typescript
// ...
import { RoundSliderModule } from 'angular2-round-slider-custom/dist';

@NgModule({
  // ...
  imports: [
    RoundSliderModule,
    // ...
  ],
  // ...
})
export class PageModule { }


## Usage

```html
<round-slider #sliderElem 
    [width]="120" 
    [height]="120" 
    [radius]="45"
    [max]="100"
    [min]="0"
    [thick]="5"
    [units]="%"
    dragging="true"
    [scentName]="lavender"
    [scentColor]="#E6E6FA"
    [(value)]="levelControlValue"
    (onChangeEnd)="listenerEvent$.next(sliderElem.value)"
    [imageUrl]="'https://www.organicspamagazine.com/wp-content/uploads/2016/12/relax.jpg'"
></round-slider>

```

## Styling
Please make sure to include and customize the component scss in your angular project

```css
round-slider {
  display: block;

  .round-slider-container {
    position: relative;
  }

  .container {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 20;
  }

  .round-slider-image {
    background-size: cover;
    border-radius: 50%;
    position: absolute;
  }

  .round-slider-text {
    text-align: center;
    position: absolute;
    width: 100%;
    display: table-cell;
    vertical-align: middle;
    top: 41%;
    pointer-events: none;
    z-index: 10;
    color: white;
    font-size: 18px;
  }

  .circumference {
    &.transparent {
      fill: transparent;
    }
    fill: #f2f2f2;
  }

  .dot circle:hover {
    cursor: pointer;
  }

  .dot circle {
    fill: lightsteelblue;
    stroke: lightsteelblue;
    stroke-width: 1.5px;
  }

  .dot circle.dragging {
    fill: steelblue;
    stroke: steelblue;
  }

  .arc {
    fill: steelblue;
  }
}
```

## License

MIT
