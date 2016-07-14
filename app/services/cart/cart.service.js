System.register(['angular2/core', '../../models/cartitem/cartitem.model', 'immutable', "rxjs/Rx", "rxjs/Observable"], function(exports_1, context_1) {
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
    var core_1, cartitem_model_1, immutable_1, Rx_1, Observable_1;
    var CartService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (cartitem_model_1_1) {
                cartitem_model_1 = cartitem_model_1_1;
            },
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            CartService = (function () {
                function CartService() {
                    this._cart = new Rx_1.BehaviorSubject(immutable_1.List([]));
                }
                CartService.prototype.agregarProducto = function (prod) {
                    var item = new cartitem_model_1.CartItem();
                    item.id = prod.id;
                    item.descripcion = prod.descripcion;
                    item.precio = prod.precio;
                    item.cantidad = 1;
                    item.imagen1 = prod.imagen1;
                    this._cart.next(this._cart.getValue().push(item));
                };
                CartService.prototype.eliminarItem = function (item) {
                    var all = this._cart.getValue();
                    var index = all.findIndex(function (i) { return i.id === item.id; });
                    this._cart.next(all.delete(index));
                };
                CartService.prototype.limpiarCarrito = function () {
                    this._cart.getValue().clear();
                };
                Object.defineProperty(CartService.prototype, "items", {
                    get: function () {
                        return this.asObservable(this._cart);
                    },
                    enumerable: true,
                    configurable: true
                });
                CartService.prototype.getPrecioTotal = function () {
                    var totalPrice = this._cart.getValue().reduce(function (sum, cartProd) {
                        return sum += cartProd.precio, sum;
                    }, 0);
                    return totalPrice;
                };
                CartService.prototype.asObservable = function (subject) {
                    return new Observable_1.Observable(function (fn) { return subject.subscribe(fn); });
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