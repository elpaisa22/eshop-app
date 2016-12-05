import {Directive, ElementRef, Input} from '@angular/core';

declare var jQuery:any;

@Directive({
    selector: '[get-inspired]'
})
export class GetInspiredDirective {
    constructor(private _el: ElementRef) {
    }

    ngOnInit() {
      jQuery(this._el.nativeElement).owlCarousel({
          navigation: true, // Show next and prev buttons
          slideSpeed: 300,
          paginationSpeed: 400,
          autoPlay: true,
          stopOnHover: true,
          singleItem: true,
          afterInit: ''
      });
    }
}
