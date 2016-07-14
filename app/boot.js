System.register(['angular2/platform/browser', './components/main/main.component', 'angular2/router', 'angular2/http', './repositories/product/product.repository', './services/cart/cart.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, main_component_1, router_1, http_1, product_repository_1, cart_service_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (main_component_1_1) {
                main_component_1 = main_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (product_repository_1_1) {
                product_repository_1 = product_repository_1_1;
            },
            function (cart_service_1_1) {
                cart_service_1 = cart_service_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(main_component_1.MainComponent, [router_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS, product_repository_1.ProductRepository, cart_service_1.CartService]);
        }
    }
});
//# sourceMappingURL=boot.js.map