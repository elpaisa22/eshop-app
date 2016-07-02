System.register(['angular2/core', 'angular2/router', '../../services/cart/cart.service'], function(exports_1, context_1) {
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
    var core_1, router_1, cart_service_1;
    var BasketComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (cart_service_1_1) {
                cart_service_1 = cart_service_1_1;
            }],
        execute: function() {
            BasketComponent = (function () {
                function BasketComponent(_cartService) {
                    this._cartService = _cartService;
                }
                BasketComponent.prototype.reloadItems = function () {
                    this.items = this._cartService.getItems();
                };
                BasketComponent.prototype.ngOnInit = function () {
                    this.reloadItems();
                };
                BasketComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/components/basket/basket.html',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [cart_service_1.CartService]
                    }), 
                    __metadata('design:paramtypes', [cart_service_1.CartService])
                ], BasketComponent);
                return BasketComponent;
            }());
            exports_1("BasketComponent", BasketComponent);
        }
    }
});
//# sourceMappingURL=basket.component.js.map