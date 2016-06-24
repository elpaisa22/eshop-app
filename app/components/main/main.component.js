System.register(['angular2/core', 'angular2/router', '../_shared/topbar/topbar.component', '../_shared/navbar/navbar.component', '../_shared/footer/footer.component', '../home/home.component', '../register/register.component', '../contact/contact.component', '../basket/basket.component'], function(exports_1, context_1) {
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
    var core_1, router_1, topbar_component_1, navbar_component_1, footer_component_1, home_component_1, register_component_1, contact_component_1, basket_component_1;
    var MainComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (topbar_component_1_1) {
                topbar_component_1 = topbar_component_1_1;
            },
            function (navbar_component_1_1) {
                navbar_component_1 = navbar_component_1_1;
            },
            function (footer_component_1_1) {
                footer_component_1 = footer_component_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (register_component_1_1) {
                register_component_1 = register_component_1_1;
            },
            function (contact_component_1_1) {
                contact_component_1 = contact_component_1_1;
            },
            function (basket_component_1_1) {
                basket_component_1 = basket_component_1_1;
            }],
        execute: function() {
            MainComponent = (function () {
                function MainComponent() {
                    this.display = false;
                }
                MainComponent = __decorate([
                    core_1.Component({
                        selector: 'main-app',
                        templateUrl: 'app/components/main/main.html',
                        directives: [topbar_component_1.TopBarComponent, navbar_component_1.NavBarComponent, footer_component_1.FooterComponent, router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        new router_1.Route({ path: '/', name: 'Home', component: home_component_1.HomeComponent }),
                        new router_1.Route({ path: '/registro', name: 'Register', component: register_component_1.RegisterComponent }),
                        new router_1.Route({ path: '/contacto', name: 'Contact', component: contact_component_1.ContactComponent }),
                        new router_1.Route({ path: '/carrito', name: 'Basket', component: basket_component_1.BasketComponent })
                    ]), 
                    __metadata('design:paramtypes', [])
                ], MainComponent);
                return MainComponent;
            }());
            exports_1("MainComponent", MainComponent);
        }
    }
});
//# sourceMappingURL=main.component.js.map