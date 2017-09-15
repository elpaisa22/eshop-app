import {Component, ElementRef} from '@angular/core';
import {Router } from '@angular/router';

import {ProductRepository} from '../../../repositories/product/product.repository';

@Component({
    selector: 'autocomplete',
    host: {
        '(document:click)': 'handleClick($event)',
    },
    styleUrls : ['./autocomplete.component.css'],
    template: `

            <div class="col-sm-12">
              <div class="input-group col-sm-12">
                <input id="country" type="text" autocomplete="off" class="validate filter-input form-control" [(ngModel)]=query
                       (keyup)=filter($event)
                       (keydown)="onKeyDown($event)">
                <span class="input-group-btn">
                    <button type="submit" class="btn btn-primary"><i class="fa fa-search"></i></button>
                </span>
              </div>
              <ul class="autocomplete-options dropdown-menu col-sm-12" *ngIf="filteredList.length > 0" style="display: block">
                  <li *ngFor="let item of filteredList;let idx = index"
                       [class.active]="idx == selectedIdx"
                       class="active">
                    <a  (click)="select(item)"
                        href="javascript:void(0)">
                        <img src="{{item.images[0].image}}" class="img-rounded" alt="Cinque Terre" width="20" height="20">
                        {{item.name}}
                    </a>
                  </li>
              </ul>
            </div>
    	`
})

export class AutocompleteComponent {
    public query = '';

    public filteredList = [];
    public elementRef;
    selectedIdx: number;

    constructor(myElement: ElementRef,
                private _productRepository : ProductRepository,
                private _router : Router) {
        this.elementRef = myElement;
        this.selectedIdx = -1;
    }

    filter(event: any) {
        if (this.query !== "") {
            this._productRepository.searchByText(this.query)
                                   .subscribe(data => {
                                     this.filteredList = data.slice(0,6)
                                   });
            if (event.code == "ArrowDown" && this.selectedIdx < this.filteredList.length-1) {
                this.selectedIdx++;
            } else if (event.code == "ArrowUp" && this.selectedIdx > 0) {
                this.selectedIdx--;
            };
        } else {
            this.filteredList = [];
        }
    }

    private select(item) {
        if (item) {
          this._router.navigate(['/detail', item.id]);
          this.clear();
        }
    }

    private clear() {
      this.query = "";
      this.filteredList = [];
      this.selectedIdx = -1;
    }

    public onKeyDown(event: any)
    {
      if (event.keyCode == 13)
      {
         // action
         if (this.selectedIdx !== -1) {
            this.select(this.filteredList[this.selectedIdx]);
         }
      } else if (event.keyCode == 27 || event.keyCode == 9)
      {
          this.clear();
      }
    }

    handleClick(event) {
        var clickedComponent = event.target;
        var inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (!inside) {
            this.clear();
        }
        this.selectedIdx = -1;
    }


}
