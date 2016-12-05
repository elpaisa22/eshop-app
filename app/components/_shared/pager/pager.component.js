System.register(['@angular/core'], function(exports_1, context_1) {
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
    var PagerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            PagerComponent = (function () {
                function PagerComponent() {
                    this.pageSizeChange = new core_1.EventEmitter();
                    this.sortByChange = new core_1.EventEmitter();
                }
                PagerComponent.prototype.changePageSize = function (tam, event) {
                    if (event) {
                        event.preventDefault();
                    }
                    this.pageSizeChange.emit({
                        value: tam,
                    });
                };
                PagerComponent.prototype.changeSortBy = function (event) {
                    this.sortByChange.emit({
                        value: event,
                    });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], PagerComponent.prototype, "pageSize", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], PagerComponent.prototype, "sortBy", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], PagerComponent.prototype, "countElements", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], PagerComponent.prototype, "totalElements", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], PagerComponent.prototype, "pageSizeChange", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], PagerComponent.prototype, "sortByChange", void 0);
                PagerComponent = __decorate([
                    core_1.Component({
                        template: "\n            <div class=\"box info-bar\">\n                <div class=\"row\">\n                    <div class=\"col-sm-12 col-md-3 products-showing\">\n                        <strong>{{countElements}}</strong> de <strong>{{totalElements}}</strong> productos\n                    </div>\n\n                    <div class=\"col-sm-12 col-md-9  products-number-sort\">\n                        <div class=\"row\">\n                            <form class=\"form-inline\">\n                                <div class=\"col-md-6 col-sm-6\">\n                                    <div class=\"products-number\">\n                                        <strong>Mostrar</strong>\n                                        <a href=\"#\" class=\"btn btn-default btn-sm\" [class.btn-primary]=\"pageSize == 12\"   (click)=\"changePageSize(12, $event)\">12</a>\n                                        <a href=\"#\" class=\"btn btn-default btn-sm\" [class.btn-primary]=\"pageSize == 24\"   (click)=\"changePageSize(24, $event)\">24</a>\n                                        <a href=\"#\" class=\"btn btn-default btn-sm\" [class.btn-primary]=\"pageSize == null\" (click)=\"changePageSize(null, $event)\">Todos</a>\n                                    </div>\n                                </div>\n                                <div class=\"col-md-6 col-sm-6\">\n                                    <div class=\"products-sort-by\">\n                                        <strong>Ordenar por</strong>\n                                        <select name=\"sort-by\" class=\"form-control\"\n                                                 [(ngModel)]=\"sortBy\"\n                                                 (ngModelChange)=\"changeSortBy($event)\">\n                                            <option value=\"nombre\">Nombre</option>\n                                            <option value=\"precio\">Precio</option>\n                                        </select>\n                                    </div>\n                                </div>\n                            </form>\n                        </div>\n                    </div>\n                </div>\n            </div>\n  ",
                        selector: 'pager'
                    }), 
                    __metadata('design:paramtypes', [])
                ], PagerComponent);
                return PagerComponent;
            }());
            exports_1("PagerComponent", PagerComponent);
        }
    }
});
//# sourceMappingURL=pager.component.js.map