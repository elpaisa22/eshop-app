import {Directive, ElementRef, Input} from 'angular2/core';

declare var jQuery:any;

@Directive({
    selector: '[main-slider]'
})
export class MainSliderDirective {
    constructor(el: ElementRef) {
      jQuery(el.nativeElement).owlCarousel({
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
