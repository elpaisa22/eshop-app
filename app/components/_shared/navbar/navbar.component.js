System.register(["@angular/core", "../../../services/cart/cart.service"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, cart_service_1, NavBarComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (cart_service_1_1) {
                cart_service_1 = cart_service_1_1;
            }
        ],
        execute: function () {
            NavBarComponent = (function () {
                function NavBarComponent(_cartService) {
                    this._cartService = _cartService;
                }
                return NavBarComponent;
            }());
            NavBarComponent = __decorate([
                core_1.Component({
                    templateUrl: 'app/components/_shared/navbar/navbar.html',
                    selector: 'nav-bar',
                    providers: [cart_service_1.CartService]
                }),
                __metadata("design:paramtypes", [cart_service_1.CartService])
            ], NavBarComponent);
            exports_1("NavBarComponent", NavBarComponent);
        }
    };
});
//# sourceMappingURL=navbar.component.js.map