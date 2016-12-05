System.register(["@angular/core", "@angular/platform-browser", "@angular/forms", "@angular/http", "./app.router", "./components/main/main.component", "./components/_shared/topbar/topbar.component", "./components/_shared/navbar/navbar.component", "./components/_shared/footer/footer.component", "./components/_shared/sidenav/sidenav.component", "./components/_shared/sidebar/sidebar.component", "./components/_shared/pager/pager.component", "./components/_shared/paginator/paginator.component", "./components/home/home.component", "./components/register/register.component", "./components/contact/contact.component", "./components/basket/basket.component", "./components/catalog/catalog.component", "./components/detail/detail.component", "./components/error/error.component"], function (exports_1, context_1) {
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
    var core_1, platform_browser_1, forms_1, http_1, app_router_1, main_component_1, topbar_component_1, navbar_component_1, footer_component_1, sidenav_component_1, sidebar_component_1, pager_component_1, paginator_component_1, home_component_1, register_component_1, contact_component_1, basket_component_1, catalog_component_1, detail_component_1, error_component_1, AppModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (app_router_1_1) {
                app_router_1 = app_router_1_1;
            },
            function (main_component_1_1) {
                main_component_1 = main_component_1_1;
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
            function (sidenav_component_1_1) {
                sidenav_component_1 = sidenav_component_1_1;
            },
            function (sidebar_component_1_1) {
                sidebar_component_1 = sidebar_component_1_1;
            },
            function (pager_component_1_1) {
                pager_component_1 = pager_component_1_1;
            },
            function (paginator_component_1_1) {
                paginator_component_1 = paginator_component_1_1;
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
            },
            function (catalog_component_1_1) {
                catalog_component_1 = catalog_component_1_1;
            },
            function (detail_component_1_1) {
                detail_component_1 = detail_component_1_1;
            },
            function (error_component_1_1) {
                error_component_1 = error_component_1_1;
            }
        ],
        execute: function () {
            AppModule = (function () {
                function AppModule() {
                }
                return AppModule;
            }());
            AppModule = __decorate([
                core_1.NgModule({
                    imports: [platform_browser_1.BrowserModule,
                        forms_1.FormsModule,
                        http_1.HttpModule,
                        app_router_1.routes
                    ],
                    declarations: [main_component_1.MainComponent,
                        topbar_component_1.TopBarComponent,
                        navbar_component_1.NavBarComponent,
                        sidenav_component_1.SideNavComponent,
                        sidebar_component_1.SideBarComponent,
                        footer_component_1.FooterComponent,
                        pager_component_1.PagerComponent,
                        paginator_component_1.PaginatorComponent,
                        home_component_1.HomeComponent,
                        register_component_1.RegisterComponent,
                        contact_component_1.ContactComponent,
                        basket_component_1.BasketComponent,
                        catalog_component_1.CatalogComponent,
                        detail_component_1.DetailComponent,
                        error_component_1.ErrorComponent
                    ],
                    bootstrap: [main_component_1.MainComponent]
                }),
                __metadata("design:paramtypes", [])
            ], AppModule);
            exports_1("AppModule", AppModule);
        }
    };
});
//# sourceMappingURL=app.module.js.map