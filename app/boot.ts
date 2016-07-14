import {bootstrap}    from 'angular2/platform/browser';
import {MainComponent} from './components/main/main.component';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

import {ProductRepository} from './repositories/product/product.repository';
import {CartService} from './services/cart/cart.service';

bootstrap(MainComponent,  [ ROUTER_PROVIDERS, HTTP_PROVIDERS, ProductRepository, CartService]);
