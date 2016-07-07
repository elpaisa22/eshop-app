System.register(['angular2/core', 'angular2/http', 'rxjs/add/operator/map'], function(exports_1, context_1) {
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
    var core_1, http_1;
    var ProductRepository;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            ProductRepository = (function () {
                function ProductRepository(_http) {
                    this._http = _http;
                    this.endpoint_url = "http://localhost:8080/data/productos";
                }
                ProductRepository.prototype.convertProductos = function (elems) {
                    var productos = elems.json();
                    for (var i = 0; i < productos.length; i++) {
                        var prod = productos[i];
                        if (prod.imagen1) {
                            var url = "http://localhost:8080" + prod.imagen1.split("\\").join("/").replace(".bin", ".jpg");
                            prod.imagen1 = url;
                        }
                        if (prod.imagen2) {
                            var url = "http://localhost:8080" + prod.imagen2.split("\\").join("/").replace(".bin", ".jpg");
                            prod.imagen2 = url;
                        }
                        if (prod.imagen3) {
                            var url = "http://localhost:8080" + prod.imagen3.split("\\").join("/").replace(".bin", ".jpg");
                            prod.imagen3 = url;
                        }
                        console.log(prod);
                    }
                    return productos;
                };
                ProductRepository.prototype.getAllProducts = function () {
                    var _this = this;
                    return this._http.request(this.endpoint_url).map(function (x) { return _this.convertProductos(x); });
                };
                ProductRepository = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], ProductRepository);
                return ProductRepository;
            }());
            exports_1("ProductRepository", ProductRepository);
        }
    }
});
//# sourceMappingURL=product.repository.js.map