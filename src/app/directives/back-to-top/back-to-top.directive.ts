
import {Directive, ElementRef, HostListener} from '@angular/core';

declare var jQuery:any;

@Directive({
    selector: '[back-to-top]'
})
export class BackToTopDirective {

    offset = 250;
    duration = 300;

    constructor(private _el: ElementRef) {
    }

    @HostListener('window:scroll', ['$event']) onWindowScroll(event) {
      if (jQuery(event.target).scrollTop() > this.offset) {
        jQuery(this._el.nativeElement).show();
      } else {
        jQuery(this._el.nativeElement).fadeOut(this.duration);
      }
    }

    @HostListener('click', ['$event']) onClick(event) {
      event.preventDefault();
      jQuery('html, body').animate({scrollTop: 0}, this.duration);
      return false;
    }
}
