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
    var PaginatorComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            PaginatorComponent = (function () {
                function PaginatorComponent() {
                    this.pageChange = new core_1.EventEmitter();
                    this.pages = [];
                }
                PaginatorComponent.prototype.ngOnChanges = function () {
                    this.pages = [];
                    var min = this.page - 3;
                    var max = this.page + 3;
                    for (var i = min; i <= max; i++) {
                        if (i > 0 && i <= this.totalPages) {
                            var page = this.makePage(i, i.toString(), i === this.page);
                            this.pages.push(page);
                        }
                    }
                };
                PaginatorComponent.prototype.noPrevious = function () {
                    return this.page === 1;
                };
                PaginatorComponent.prototype.noNext = function () {
                    return this.page === this.totalPages;
                };
                PaginatorComponent.prototype.makePage = function (number, text, isActive) {
                    return {
                        number: number,
                        text: text,
                        active: isActive
                    };
                };
                PaginatorComponent.prototype.selectPage = function (num, event) {
                    if (event) {
                        event.preventDefault();
                    }
                    if (num != this.page
                        && num > 0
                        && num <= this.totalPages) {
                        this.pageChange.emit({
                            value: num,
                        });
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], PaginatorComponent.prototype, "page", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], PaginatorComponent.prototype, "totalPages", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], PaginatorComponent.prototype, "pageChange", void 0);
                PaginatorComponent = __decorate([
                    core_1.Component({
                        template: "\n      <div class=\"pages\">\n\n          <ul class=\"pagination\">\n\t\t\t\t\t\t\t<li [class.disabled]=\"noPrevious()\" [class.previous]=\"align\" [ngClass]=\"{'pull-right': align}\">\n\t\t\t\t\t\t\t\t<a href=\"#\" (click)=\"selectPage(1, $event)\"><<</a>\n\t\t\t\t\t\t\t</li>\n              <li [class.disabled]=\"noPrevious()\" [class.previous]=\"align\" [ngClass]=\"{'pull-right': align}\">\n                <a href=\"#\" (click)=\"selectPage(page - 1, $event)\"><</a>\n              </li>\n\n              <li *ngFor=\"let pg of pages\"\n                  [class.active]=\"pg.active\"\n                  [class.disabled]=\"disabled&&!pg.active\"\n                  class=\"pagination-page page-item\">\n                <a href=\"#\" class=\"page-link\" (click)=\"selectPage(pg.number, $event)\" [innerHTML]=\"pg.text\"></a>\n              </li>\n\n              <li [class.disabled]=\"noNext()\" [class.next]=\"align\" [ngClass]=\"{'pull-right': align}\">\n                <a href=\"#\" (click)=\"selectPage(page + 1, $event)\">></a>\n              </li>\n\t\t\t\t\t\t\t<li [class.disabled]=\"noNext()\" [class.previous]=\"align\" [ngClass]=\"{'pull-right': align}\">\n\t\t\t\t\t\t\t\t<a href=\"#\" (click)=\"selectPage(totalPages, $event)\">>></a>\n\t\t\t\t\t\t\t</li>\n          </ul>\n\n      </div>\n  ",
                        selector: 'paginator'
                    }), 
                    __metadata('design:paramtypes', [])
                ], PaginatorComponent);
                return PaginatorComponent;
            }());
            exports_1("PaginatorComponent", PaginatorComponent);
        }
    }
});
//# sourceMappingURL=paginator.component.js.map