import {Directive, ElementRef, AfterViewInit} from '@angular/core';

declare var jQuery:any;

@Directive({
    selector: '[main-slider]'
})
export class MainSliderDirective implements AfterViewInit {

    constructor(private el: ElementRef) {
    }

    public ngAfterViewInit() {
      setTimeout(() => {
          jQuery(this.el.nativeElement).owlCarousel({
            navigation: true, // Show next and prev buttons
            slideSpeed: 300,
            paginationSpeed: 400,
            autoPlay: true,
            stopOnHover: true,
            singleItem: true,
            afterInit: ''
          });
       }, 700)
    }
}
