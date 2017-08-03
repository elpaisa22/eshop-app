import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
	template : `
            <div class="box info-bar">
                <div class="row">
                    <div class="col-sm-12 col-md-3 products-showing">
                        <strong>{{countElements}}</strong> de <strong>{{totalElements}}</strong> productos
                    </div>

                    <div class="col-sm-12 col-md-9  products-number-sort">
                        <div class="row">
                            <form class="form-inline">
                                <div class="col-md-6 col-sm-6">
                                    <div class="products-number">
                                        <strong>Mostrar</strong>
                                        <a href="#" class="btn btn-default btn-sm" [class.btn-primary]="pageSize == 12"   (click)="changePageSize(12, $event)">12</a>
                                        <a href="#" class="btn btn-default btn-sm" [class.btn-primary]="pageSize == 24"   (click)="changePageSize(24, $event)">24</a>
                                        <a href="#" class="btn btn-default btn-sm" [class.btn-primary]="pageSize == null" (click)="changePageSize(null, $event)">Todos</a>
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-6">
                                    <div class="products-sort-by">
                                        <strong>Ordenar por</strong>
                                        <select name="sort-by" class="form-control"
                                                 [(ngModel)]="sortBy"
                                                 (ngModelChange)="changeSortBy($event)">
                                            <option value="name">Nombre</option>
                                            <option value="price">Precio</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
  `,
  selector : 'pager'
})
export class PagerComponent {

  @Input() pageSize : number;
  @Input() sortBy : string;

  @Input() countElements : number;
  @Input() totalElements : number;

  @Output() pageSizeChange = new EventEmitter();
  @Output() sortByChange = new EventEmitter();

  public changePageSize(tam : number, event?:MouseEvent) {
    if (event) {
       event.preventDefault();
    }

    this.pageSizeChange.emit({
      value : tam,
    });
  }

  public changeSortBy(event?:MouseEvent){

    this.sortByChange.emit({
      value : event,
    });

  }

}
