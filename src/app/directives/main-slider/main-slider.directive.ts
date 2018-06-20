import {Directive, ElementRef, AfterViewInit} from '@angular/core';

declare var jQuery:any;

@Directive({
    selector: '[main-slider]'
})
export class MainSliderDirective implements AfterViewInit {

    constructor(private el: ElementRef) {
    }

    public ngAfterViewInit() {
      if (jQuery(this.el.nativeElement).find('.item').length) {
        jQuery(this.el.nativeElement).owlCarousel({
          navigation: true, // Show next and prev buttons
          slideSpeed: 300,
          paginationSpeed: 400,
          autoPlay: true,
          stopOnHover: true,
          singleItem: true,
          afterInit: ''
        });
      } else {
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
         }, 2000)  
      }
      
    }
}
