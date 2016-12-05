System.register(["@angular/router", "./components/home/home.component", "./components/register/register.component", "./components/contact/contact.component", "./components/basket/basket.component", "./components/catalog/catalog.component", "./components/detail/detail.component", "./components/error/error.component"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, home_component_1, register_component_1, contact_component_1, basket_component_1, catalog_component_1, detail_component_1, error_component_1, router, routes;
    return {
        setters: [
            function (router_1_1) {
                router_1 = router_1_1;
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
            exports_1("router", router = [
                { path: '', component: home_component_1.HomeComponent },
                { path: 'home', component: home_component_1.HomeComponent },
                { path: 'register', component: register_component_1.RegisterComponent },
                { path: 'contact', component: contact_component_1.ContactComponent },
                { path: 'basket', component: basket_component_1.BasketComponent },
                { path: 'catalog', component: catalog_component_1.CatalogComponent },
                { path: 'detail/:id', component: detail_component_1.DetailComponent },
                { path: '**', component: error_component_1.ErrorComponent }
            ]);
            exports_1("routes", routes = router_1.RouterModule.forRoot(router));
        }
    };
});
//# sourceMappingURL=app.router.js.map