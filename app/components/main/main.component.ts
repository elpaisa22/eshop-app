import {Component} from 'angular2/core';
import {Route, Router, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

/* components */
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

@Component({
	selector: 'main-app',
	templateUrl : 'app/components/main/main.html',
  directives: [TopBarComponent, NavBarComponent, FooterComponent, ROUTER_DIRECTIVES]
})
@RouteConfig([
	new Route({path: '/', name: 'Home', component: HomeComponent}),
	new Route({path: '/register', name: 'Register', component: RegisterComponent}),
	new Route({path: '/contact', name: 'Contact', component: ContactComponent}),
	new Route({path: '/basket', name: 'Basket', component: BasketComponent}),
	new Route({path: '/catalog', name: 'Catalog', component: CatalogComponent}),
	new Route({path: '/detail', name: 'Detail', component: DetailComponent}),
	new Route({path: '/**', name: 'Error', component: ErrorComponent})
])
export class MainComponent {
    text: string;
		display: boolean = false;

}
