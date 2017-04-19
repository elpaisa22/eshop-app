import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

/* Components */
import { MainComponent }  from './components/main/main.component';
import {HomeComponent} from './components/home/home.component';
import {RegisterComponent} from './components/register/register.component';
import {ContactComponent} from './components/contact/contact.component';
import {BasketComponent} from './components/basket/basket.component';
import {CatalogComponent} from './components/catalog/catalog.component';
import {DetailComponent} from './components/detail/detail.component';
import {ErrorComponent} from './components/error/error.component';

/* Shared components */
import {TopBarComponent} from './components/_shared/topbar/topbar.component';
import {NavBarComponent} from './components/_shared/navbar/navbar.component';
import {FooterComponent} from './components/_shared/footer/footer.component';
import {SideNavComponent} from './components/_shared/sidenav/sidenav.component';
import {SideBarComponent} from './components/_shared/sidebar/sidebar.component';
import {PagerComponent} from './components/_shared/pager/pager.component';
import {PaginatorComponent} from './components/_shared/paginator/paginator.component';

/* Directives */
import {GetInspiredDirective} from './directives/get-inspired/get-inspired.directive';
import {MainSliderDirective} from './directives/main-slider/main-slider.directive';
import {ProductDetailDirective} from './directives/product-detail/product-detail.directive';
import {ProductSliderDirective} from './directives/product-slider/product-slider.directive';

export const appRoutes : Routes = [
	{path: '', component: HomeComponent},
	{path: 'home', component: HomeComponent},
	{path: 'register', component: RegisterComponent},
	{path: 'contact', component: ContactComponent},
	{path: 'basket', component: BasketComponent},
	{path: 'catalog', component: CatalogComponent},
	{path: 'detail/:id', component: DetailComponent},
	{path: '**', component: ErrorComponent}
]

@NgModule({
  declarations: [
		/* Components */
    AppComponent,
		HomeComponent,
    RegisterComponent,
    ContactComponent,
    BasketComponent,
    CatalogComponent,
    DetailComponent,
    ErrorComponent,
		/* Shared */
    TopBarComponent,
    NavBarComponent,
    SideNavComponent,
    SideBarComponent,
    FooterComponent,
    PagerComponent,
    PaginatorComponent,
		/* Directives */
		GetInspiredDirective,
    MainSliderDirective,
		ProductDetailDirective,
		ProductSliderDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, { useHash: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
