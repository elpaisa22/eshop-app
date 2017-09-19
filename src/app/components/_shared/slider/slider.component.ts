import {Component, ElementRef} from '@angular/core';

@Component({
    selector: 'slider',
    styleUrls : ['./slider.component.css'],
    template: `
    <div>
      <label>Desde</label> $ {{valMin}}
      <input #rangermin type="range" min="0" max="500" step="100" [(ngModel)]="valMin" class="slider" (input)="inputChanged(rangermin.value)">
    </div>
    <hr/>
    <div>
      <label>Hasta</label> $ {{valMax}}
      <input #rangermax type="range" min="0" max="500" step="100" [(ngModel)]="valMax" class="slider" (input)="inputChanged(rangermax.value)">
    </div>
    	`
})

export class SliderComponent {

  valMin : number = 50;
  valMax : number = 200;

  public inputChanged(value : number) {
    console.log("Valor: ", value);
  }
}
