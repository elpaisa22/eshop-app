System.register(['angular2/core', 'angular2/router', '../../services/cart/cart.service', '../../repositories/product/product.repository', '../_shared/sidebar/sidebar.component', '../_shared/sidenav/sidenav.component', '../_shared/paginator/paginator.component', '../_shared/pager/pager.component'], function(exports_1, context_1) {
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
    var core_1, router_1, cart_service_1, product_repository_1, sidebar_component_1, sidenav_component_1, paginator_component_1, pager_component_1;
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
            },
            function (paginator_component_1_1) {
                paginator_component_1 = paginator_component_1_1;
            },
            function (pager_component_1_1) {
                pager_component_1 = pager_component_1_1;
            }],
        execute: function() {
            CatalogComponent = (function () {
                function CatalogComponent(_productRepository, _cartService) {
                    this._productRepository = _productRepository;
                    this._cartService = _cartService;
                    this.products = [];
                }
                CatalogComponent.prototype.ngOnInit = function () {
                    this.pagina = 1;
                    this.limite = 12;
                    this.ordenarPor = "nombre";
                    this.totalPaginas = 0;
                    this.cantidadProductos = 0;
                    this.reloadProducts();
                    window.scrollTo(0, 0);
                };
                CatalogComponent.prototype.addToCart = function (prod) {
                    this._cartService.agregarProducto(prod);
                };
                CatalogComponent.prototype.reloadProducts = function () {
                    var _this = this;
                    this.products.length = 0;
                    this._productRepository.getProducts(this.pagina, this.limite)
                        .subscribe(function (data) {
                        data.content.forEach(function (prod, i) {
                            _this.products.push(prod);
                        });
                        _this.totalPaginas = data.totalPages;
                        _this.cantidadProductos = data.content.length;
                        _this.totalProductos = data.totalElements;
                    }, function (error) { return console.log(error); });
                };
                CatalogComponent.prototype.onPageChange = function ($event) {
                    this.pagina = $event.value;
                    this.reloadProducts();
                };
                CatalogComponent.prototype.onPageSizeChange = function ($event) {
                    this.limite = $event.value;
                    this.reloadProducts();
                };
                CatalogComponent.prototype.onSortByChange = function ($event) {
                    this.ordenarPor = $event.value;
                    this.reloadProducts();
                };
                CatalogComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/components/catalog/catalog.html',
                        directives: [sidebar_component_1.SideBarComponent, sidenav_component_1.SideNavComponent,
                            paginator_component_1.PaginatorComponent, pager_component_1.PagerComponent,
                            router_1.ROUTER_DIRECTIVES]
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