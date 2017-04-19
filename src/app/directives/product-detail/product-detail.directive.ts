import {Directive, ElementRef, OnInit, OnDestroy} from '@angular/core';

declare var jQuery:any;

@Directive({
    selector: '[product-detail]'
})
export class ProductDetailDirective implements OnInit, OnDestroy {

    _el: ElementRef;

    private _timer;

    constructor(el: ElementRef) {
      this._el = el;
    }

    ngOnInit() {
      var self = this;

      var confDetailSwitch = 4000;
      var parent = jQuery(this._el.nativeElement);

      parent.find('.thumb:first').addClass('active');

      this._timer = setInterval(autoSwitch, confDetailSwitch);

      parent.find(".thumb").click(function(e) {
        	switchImage(jQuery(this));
        	clearInterval(self._timer);
        	self._timer = setInterval(autoSwitch, confDetailSwitch);
        	e.preventDefault();
      });

      parent.find('#mainImage').hover(
          function() {
      	    clearInterval(self._timer);
          },
          function() {
            clearInterval(self._timer);
      	     self._timer = setInterval(autoSwitch, confDetailSwitch);
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
        	parent.find('.thumb').removeClass('active');
        	var bigUrl = thumb.attr('href');
        	thumb.addClass('active');
        	parent.find('#mainImage img').attr('src', bigUrl);
      }
    }

    ngOnDestroy(){
      clearInterval(this._timer);
    }
}
