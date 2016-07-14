System.register(['angular2/core', 'angular2/router', '../../services/catalog/catalog.service', '../../services/cart/cart.service', '../_shared/sidebar/sidebar.component', '../_shared/sidenav/sidenav.component'], function(exports_1, context_1) {
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
    var core_1, router_1, catalog_service_1, cart_service_1, sidebar_component_1, sidenav_component_1;
    var CatalogComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (catalog_service_1_1) {
                catalog_service_1 = catalog_service_1_1;
            },
            function (cart_service_1_1) {
                cart_service_1 = cart_service_1_1;
            },
            function (sidebar_component_1_1) {
                sidebar_component_1 = sidebar_component_1_1;
            },
            function (sidenav_component_1_1) {
                sidenav_component_1 = sidenav_component_1_1;
            }],
        execute: function() {
            CatalogComponent = (function () {
                function CatalogComponent(_catalogService, _cartService) {
                    this._catalogService = _catalogService;
                    this._cartService = _cartService;
                    this.products = [];
                }
                CatalogComponent.prototype.ngOnInit = function () {
                    this.products = this._catalogService.loadProducts();
                };
                CatalogComponent.prototype.addToCart = function (prod) {
                    this._cartService.agregarProducto(prod);
                };
                CatalogComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/components/catalog/catalog.html',
                        directives: [sidebar_component_1.SideBarComponent, sidenav_component_1.SideNavComponent, router_1.ROUTER_DIRECTIVES],
                        providers: [catalog_service_1.CatalogService]
                    }), 
                    __metadata('design:paramtypes', [catalog_service_1.CatalogService, cart_service_1.CartService])
                ], CatalogComponent);
                return CatalogComponent;
            }());
            exports_1("CatalogComponent", CatalogComponent);
        }
    }
});
//# sourceMappingURL=catalog.component.js.map