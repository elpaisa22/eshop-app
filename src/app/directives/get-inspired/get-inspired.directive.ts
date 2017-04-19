import {Directive, ElementRef} from '@angular/core';

declare var jQuery:any;

@Directive({
    selector: '[get-inspired]'
})
export class GetInspiredDirective {
    $el: any

    constructor(private _el: ElementRef) {
      this.$el = jQuery(_el.nativeElement);
    }

    render(): void {
      jQuery(this.$el).owlCarousel({
          navigation: true, // Show next and prev buttons
          slideSpeed: 300,
          paginationSpeed: 400,
          autoPlay: true,
          stopOnHover: true,
          singleItem: true,
          afterInit: ''
      });
    }

    ngOnInit() {
      this.render();
    }
}
