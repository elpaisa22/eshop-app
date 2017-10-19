
import {Directive, ElementRef,  HostListener, Input} from '@angular/core';

declare var jQuery:any;

@Directive({
    selector: '[scroll-to]'
})
export class ScrollToDirective {

    constructor(private _el: ElementRef) {
    }

    @Input('scroll-to') destiny: string;

    @HostListener('click', ['$event']) onClick(event) {
      var target = jQuery(this.destiny);
      if( target.length ) {
         event.preventDefault();
         jQuery('html, body').stop().animate({
             scrollTop: target.offset().top - 10 
         }, 1000);
      }
    }
}
