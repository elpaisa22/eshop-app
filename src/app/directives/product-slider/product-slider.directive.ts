import {Directive, ElementRef, AfterViewInit} from '@angular/core';

declare var jQuery:any;

@Directive({
    selector: '[product-slider]'
})
export class ProductSliderDirective implements AfterViewInit {

    constructor(private _el: ElementRef) {
    }

    ngAfterViewInit() {
      setTimeout(() => {
        jQuery(this._el.nativeElement).owlCarousel({
          navigation: true, // Show next and prev buttons
          slideSpeed: 300,
          paginationSpeed: 400,
          afterInit: function() {
              jQuery('.product-slider .item').css('visibility', 'visible');
          }
        });
      }, 1000)
    }
}
