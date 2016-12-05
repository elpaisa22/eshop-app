import {Component} from '@angular/core';

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

@Component({
	selector: 'main-app',
	templateUrl : 'app/components/main/main.html' /*,
  directives: [TopBarComponent, NavBarComponent, FooterComponent] */
})
export class MainComponent {
    text: string;
		display: boolean = false;

}
