import {Component, Input, Output, EventEmitter, OnChanges} from '@angular/core';

@Component({
	template : `
      <div class="pages">

          <ul class="pagination">
							<li [class.disabled]="noPrevious()" [class.previous]="align" [ngClass]="{'pull-right': align}">
								<a href="#" (click)="selectPage(1, $event)"><<</a>
							</li>
              <li [class.disabled]="noPrevious()" [class.previous]="align" [ngClass]="{'pull-right': align}">
                <a href="#" (click)="selectPage(page - 1, $event)"><</a>
              </li>

              <li *ngFor="let pg of pages"
                  [class.active]="pg.active"
                  [class.disabled]="disabled&&!pg.active"
                  class="pagination-page page-item">
                <a href="#" class="page-link" (click)="selectPage(pg.number, $event)" [innerHTML]="pg.text"></a>
              </li>

              <li [class.disabled]="noNext()" [class.next]="align" [ngClass]="{'pull-right': align}">
                <a href="#" (click)="selectPage(page + 1, $event)">></a>
              </li>
							<li [class.disabled]="noNext()" [class.previous]="align" [ngClass]="{'pull-right': align}">
								<a href="#" (click)="selectPage(totalPages, $event)">>></a>
							</li>
          </ul>

      </div>
  `,
  selector : 'paginator'
})
export class PaginatorComponent implements OnChanges {

  @Input() page : number;
  @Input() totalPages : number;

  @Output() pageChange = new EventEmitter();

	private pages : any[] = [];

  ngOnChanges() {
		this.pages = [];

		var min = this.page - 3;
		var max = this.page + 3;

		for (var i = min; i <= max; i++) {
			if (i > 0 && i <= this.totalPages) {
				let page = this.makePage(i, i.toString(), i === this.page);
				this.pages.push(page);
			}
		}

  }

  private noPrevious():boolean {
     return this.page === 1;
  }

   private noNext():boolean {
       return this.page === this.totalPages;
   }

   private makePage(number:number, text:string, isActive:boolean):{number: number, text: string, active: boolean} {
       return {
           number: number,
           text: text,
           active: isActive
       };
   }

	 private selectPage(num : number, event?:MouseEvent) {
		 if (event) {
        event.preventDefault();
     }

		 if (num != this.page
			   && num > 0
				 && num <= this.totalPages) {
			 this.pageChange.emit({
				value : num,
			});
		 }

	 }
}
