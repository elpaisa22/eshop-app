import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { MainComponent }  from './components/main/main.component';

import {TopBarComponent} from './components/_shared/topbar/topbar.component';
import {NavBarComponent} from './components/_shared/navbar/navbar.component';
import {FooterComponent} from './components/_shared/footer/footer.component';

import {HomeComponent} from './components/home/home.component';
import {RegisterComponent} from './components/register/register.component';
import {ContactComponent} from './components/contact/contact.component';
import {BasketComponent} from './components/basket/basket.component';
import {CatalogComponent} from './components/catalog/catalog.component';
import {DetailComponent} from './components/detail/detail.component';
import {ErrorComponent} from './components/error/error.component';

export const router : Routes = [
	{path: '', component: HomeComponent},
	{path: 'home', component: HomeComponent},
	{path: 'register', component: RegisterComponent},
	{path: 'contact', component: ContactComponent},
	{path: 'basket', component: BasketComponent},
	{path: 'catalog', component: CatalogComponent},
	{path: 'detail/:id', component: DetailComponent},
	{path: '**', component: ErrorComponent}
]

export const routes : ModuleWithProviders = RouterModule.forRoot(router);
