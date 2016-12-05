import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

import {ProductRepository} from './repositories/product/product.repository';
import {CartService} from './services/cart/cart.service';

platformBrowserDynamic().bootstrapModule(AppModule, [ProductRepository, CartService]);
