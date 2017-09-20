import {Component, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';

@Component({
    selector: 'price-filter',
    styleUrls: ['./priceFilter.component.css'],
    template: `
    <div class="panel panel-default sidebar-menu">
        <div class="panel-heading">
            <h3 class="panel-title">
              Precio
              <a class="btn btn-xs btn-danger pull-right" (click)="clearPriceRange()">
              <i class="fa fa-times-circle"></i>
              Limpiar
              </a>
            </h3>
        </div>

        <div class="panel-body">
            <div>
              <label>Desde</label>
               $ <input #inputrangemin class="form-control input-range" [(ngModel)]="minValue" (change)="inputChanged()"/>
              <input #rangermin type="range" min="{{minLimit}}" max="{{maxLimit}}" [(ngModel)]="minValue" class="slider" (input)="inputChanged()">
            </div>
            <hr/>
            <div>
              <label>Hasta</label>
               $ <input #inputrangemax class="form-control input-range" [(ngModel)]="maxValue" (change)="inputChanged()"/>
              <input #rangermax type="range" min="{{minLimit}}" max="{{maxLimit}}" [(ngModel)]="maxValue" class="slider" (input)="inputChanged()">
            </div>
        </div>
    </div>
`
})

export class PriveFilterComponent implements OnChanges {

  @Input() minLimit : number;
  @Input() maxLimit : number;

  @Output() rangeChange = new EventEmitter();
  @Output() clearRangeValues = new EventEmitter();

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

  public inputChanged() {
    this.rangeChange.emit({
     range_min : this.minValue,
     range_max : this.maxValue
    });
  }

  public clearPriceRange() {
		this.clearRangeValues.emit();
    this.minValue = this.minLimit;
    this.maxValue = this.maxLimit;
	}
}
