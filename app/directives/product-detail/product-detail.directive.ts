import {Directive, ElementRef, Input} from 'angular2/core';

declare var jQuery:any;

@Directive({
    selector: '[product-detail]'
})
export class ProductDetailDirective {
    constructor(el: ElementRef) {
      var confDetailSwitch = 4000;

      jQuery(el.nativeElement).find('.thumb:first').addClass('active');

      var timer = setInterval(autoSwitch, confDetailSwitch);

      jQuery(el.nativeElement).find(".thumb").click(function(e) {
        	switchImage(jQuery(this));
        	clearInterval(timer);
        	timer = setInterval(autoSwitch, confDetailSwitch);
        	e.preventDefault();
      });

      jQuery(el.nativeElement).find('#mainImage').hover(
          function() {
      	    clearInterval(timer);
          },
          function() {
      	     timer = setInterval(autoSwitch, confDetailSwitch);
           }
      );

      function autoSwitch() {
        	var nextThumb = jQuery('.thumb.active').closest('div').next('div').find('.thumb');
        	if (nextThumb.length == 0) {
        	    nextThumb = jQuery('.thumb:first');
        	}
        	switchImage(nextThumb);
      }

      function switchImage(thumb) {
        	jQuery(el.nativeElement).find('.thumb').removeClass('active');
        	var bigUrl = thumb.attr('href');
        	thumb.addClass('active');
        	jQuery(el.nativeElement).find('#mainImage img').attr('src', bigUrl);
      }
    }
}
