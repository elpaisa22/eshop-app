System.register(['angular2/core', '../../repositories/product/product.repository'], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, product_repository_1;
    var CatalogService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (product_repository_1_1) {
                product_repository_1 = product_repository_1_1;
            }],
        execute: function() {
            CatalogService = (function () {
                function CatalogService(productRepository) {
                    this.products = [];
                    this._productRepository = productRepository;
                }
                CatalogService.prototype.getProducts = function () {
                    return this.products;
                };
                CatalogService.prototype.loadProducts = function () {
                    var _this = this;
                    this.products.length = 0;
                    this._productRepository.getAllProducts()
                        .subscribe(function (data) {
                        data.forEach(function (prod, i) {
                            _this.products.push(prod);
                        });
                    }, function (error) { return console.log(error); });
                    return this.products;
                };
                CatalogService = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject(product_repository_1.ProductRepository)), 
                    __metadata('design:paramtypes', [product_repository_1.ProductRepository])
                ], CatalogService);
                return CatalogService;
            }());
            exports_1("CatalogService", CatalogService);
        }
    }
});
//# sourceMappingURL=catalog.service.js.map