System.register(['angular2/core', 'angular2/router', '../../services/cart/cart.service', '../../repositories/product/product.repository', '../_shared/sidebar/sidebar.component', '../_shared/sidenav/sidenav.component'], function(exports_1, context_1) {
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
    var core_1, router_1, cart_service_1, product_repository_1, sidebar_component_1, sidenav_component_1;
    var CatalogComponent;
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
            },
            function (product_repository_1_1) {
                product_repository_1 = product_repository_1_1;
            },
            function (sidebar_component_1_1) {
                sidebar_component_1 = sidebar_component_1_1;
            },
            function (sidenav_component_1_1) {
                sidenav_component_1 = sidenav_component_1_1;
            }],
        execute: function() {
            CatalogComponent = (function () {
                function CatalogComponent(_productRepository, _cartService) {
                    this._productRepository = _productRepository;
                    this._cartService = _cartService;
                    this.products = [];
                }
                CatalogComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.products.length = 0;
                    this._productRepository.getAllProducts()
                        .subscribe(function (data) {
                        data.forEach(function (prod, i) {
                            _this.products.push(prod);
                        });
                    }, function (error) { return console.log(error); });
                    window.scrollTo(0, 0);
                };
                CatalogComponent.prototype.addToCart = function (prod) {
                    this._cartService.agregarProducto(prod);
                };
                CatalogComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/components/catalog/catalog.html',
                        directives: [sidebar_component_1.SideBarComponent, sidenav_component_1.SideNavComponent, router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [product_repository_1.ProductRepository, cart_service_1.CartService])
                ], CatalogComponent);
                return CatalogComponent;
            }());
            exports_1("CatalogComponent", CatalogComponent);
        }
    }
});
//# sourceMappingURL=catalog.component.js.map