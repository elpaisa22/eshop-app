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
    var CartService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            CartService = (function () {
                function CartService() {
                    this.cart = [];
                }
                CartService.prototype.agregarItem = function (prod) {
                    this.cart.push(prod);
                };
                CartService.prototype.eliminarItem = function (prod) {
                    this.cart = this.cart.filter(function (cartProd) { return cartProd.id !== prod.id; });
                };
                CartService.prototype.limpiarCarrito = function () {
                    this.cart = [];
                };
                CartService.prototype.getItems = function () {
                    return this.cart;
                };
                CartService.prototype.getPrecioTotal = function () {
                    var totalPrice = this.cart.reduce(function (sum, cartProd) {
                        return sum += cartProd.precio, sum;
                    }, 0);
                    return totalPrice;
                };
                CartService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], CartService);
                return CartService;
            }());
            exports_1("CartService", CartService);
        }
    }
});
//# sourceMappingURL=cart.service.js.map