System.register(["@angular/core"], function (exports_1, context_1) {
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
    var core_1, MainComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            MainComponent = (function () {
                /* components
                import {TopBarComponent} from '../_shared/topbar/topbar.component';
                import {NavBarComponent} from '../_shared/navbar/navbar.component';
                import {FooterComponent} from '../_shared/footer/footer.component';
                
                import {HomeComponent} from '../home/home.component';
                import {RegisterComponent} from '../register/register.component';
                import {ContactComponent} from '../contact/contact.component';
                import {BasketComponent} from '../basket/basket.component';
                import {CatalogComponent} from '../catalog/catalog.component';
                import {DetailComponent} from '../detail/detail.component';
                import {ErrorComponent} from '../error/error.component';
                */
                function MainComponent() {
                    this.display = false;
                }
                return MainComponent;
            }());
            MainComponent = __decorate([
                core_1.Component({
                    selector: 'main-app',
                    templateUrl: 'app/components/main/main.html' /*,
                  directives: [TopBarComponent, NavBarComponent, FooterComponent] */
                }),
                __metadata("design:paramtypes", [])
            ], MainComponent);
            exports_1("MainComponent", MainComponent);
        }
    };
});
//# sourceMappingURL=main.component.js.map