import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges} from '@angular/core';

@Component({
    selector: 'slider',
    styleUrls: ['./slider.component.css'],
    template: `
          <div>
            <label>Desde</label> $ <input #inputrangemin class="form-control input-range" [(ngModel)]="minValue" (change)="inputChanged(inputrangemin.value)"/>
            <input #rangermin type="range" min="{{minLimit}}" max="{{maxLimit}}" [(ngModel)]="minValue" class="slider" (input)="inputChanged(rangermin.value)">
          </div>
          <hr/>
          <div>
            <label>Hasta</label> $ <input #inputrangemax class="form-control input-range" [(ngModel)]="maxValue" (change)="inputChanged(inputrangemax.value)"/>
            <input #rangermax type="range" min="{{minLimit}}" max="{{maxLimit}}" [(ngModel)]="maxValue" class="slider" (input)="inputChanged(rangermax.value)">
          </div>
    	`
})

export class SliderComponent implements OnChanges {

  @Input() minLimit : number;
  @Input() maxLimit : number;

  @Output() rangeChange = new EventEmitter();

  public minValue : number;
  public maxValue : number;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['minLimit']) {
      this.minValue = changes['minLimit'].currentValue;
    }
    if (changes['maxLimit']) {
        this.maxValue = changes['maxLimit'].currentValue;
    }
  }

  public inputChanged(value : number) {
    this.rangeChange.emit({
     range_min : this.minValue,
     range_max : this.maxValue
    });
  }

  public resetValues() {
    this.minValue = this.minLimit;
    this.maxValue = this.maxLimit;
  }
}
