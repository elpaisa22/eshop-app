System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var ProductDetailDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ProductDetailDirective = (function () {
                function ProductDetailDirective(el) {
                    this._el = el;
                }
                ProductDetailDirective.prototype.ngOnInit = function () {
                    var confDetailSwitch = 4000;
                    var parent = jQuery(this._el.nativeElement);
                    parent.find('.thumb:first').addClass('active');
                    var timer = setInterval(autoSwitch, confDetailSwitch);
                    parent.find(".thumb").click(function (e) {
                        switchImage(jQuery(this));
                        clearInterval(timer);
                        timer = setInterval(autoSwitch, confDetailSwitch);
                        e.preventDefault();
                    });
                    parent.find('#mainImage').hover(function () {
                        clearInterval(timer);
                    }, function () {
                        timer = setInterval(autoSwitch, confDetailSwitch);
                    });
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
                };
                ProductDetailDirective = __decorate([
                    core_1.Directive({
                        selector: '[product-detail]'
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], ProductDetailDirective);
                return ProductDetailDirective;
            }());
            exports_1("ProductDetailDirective", ProductDetailDirective);
        }
    }
});
//# sourceMappingURL=product-detail.directive.js.map