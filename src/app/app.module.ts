import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

/* Components */
import {HomeComponent} from './components/home/home.component';
import {RegisterComponent} from './components/register/register.component';
import {ContactComponent} from './components/contact/contact.component';
import {BasketComponent} from './components/basket/basket.component';
import {AddressComponent} from './components/address/address.component';
import {DeliveryComponent} from './components/delivery/delivery.component';
import {PaymentComponent} from './components/payment/payment.component';
import {OrderReviewComponent} from './components/orderReview/orderReview.component';
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
import {SummaryComponent} from './components/_shared/summary/summary.component';

/* Pipes */
import {KeysPipe} from './pipes/keys/keys.pipe';

/* Directives */
import {GetInspiredDirective} from './directives/get-inspired/get-inspired.directive';
import {MainSliderDirective} from './directives/main-slider/main-slider.directive';
import {ProductDetailDirective} from './directives/product-detail/product-detail.directive';
import {ProductSliderDirective} from './directives/product-slider/product-slider.directive';

/* Services */
import {CartService} from './services/cart/cart.service';
import {FilterService} from './services/filter/filter.service';

/* Repositories */
import {ProductRepository} from './repositories/product/product.repository';
import {CategoryRepository} from './repositories/category/category.repository';

export const appRoutes : Routes = [
	{path: '', component: HomeComponent},
	{path: 'home', component: HomeComponent},
	{path: 'register', component: RegisterComponent},
	{path: 'contact', component: ContactComponent},
	{path: 'basket', component: BasketComponent},
	{path: 'address', component: AddressComponent},
	{path: 'delivery', component: DeliveryComponent},
	{path: 'payment', component: PaymentComponent},
	{path: 'orderReview', component: OrderReviewComponent},
	{path: 'catalog/section/:section', component: CatalogComponent},
	{path: 'catalog/section/:section/category/:category', component: CatalogComponent},
	{path: 'catalog/section/:section/category/:category/sub-category/:subcategory', component: CatalogComponent},
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
		AddressComponent,
		DeliveryComponent,
		PaymentComponent,
		OrderReviewComponent,
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
		SummaryComponent,
		/* Pipes */
		KeysPipe,
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
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  providers: [
		CartService,
		FilterService,
		ProductRepository,
		CategoryRepository
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
