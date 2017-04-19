import {Directive, ElementRef, OnInit} from '@angular/core';

declare var jQuery:any;

@Directive({
    selector: '[main-slider]'
})
export class MainSliderDirective implements OnInit {

    constructor(private el: ElementRef) {
    }

    public ngOnInit() {
      jQuery(this.el.nativeElement).owlCarousel({
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
