import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'

import { routes } from './app.router'

/* components */
import { MainComponent }  from './components/main/main.component';

import {TopBarComponent} from './components/_shared/topbar/topbar.component';
import {NavBarComponent} from './components/_shared/navbar/navbar.component';
import {FooterComponent} from './components/_shared/footer/footer.component';
import {SideNavComponent} from './components/_shared/sidenav/sidenav.component';
import {SideBarComponent} from './components/_shared/sidebar/sidebar.component';
import {PagerComponent} from './components/_shared/pager/pager.component';
import {PaginatorComponent} from './components/_shared/paginator/paginator.component';

import {HomeComponent} from './components/home/home.component';
import {RegisterComponent} from './components/register/register.component';
import {ContactComponent} from './components/contact/contact.component';
import {BasketComponent} from './components/basket/basket.component';
import {CatalogComponent} from './components/catalog/catalog.component';
import {DetailComponent} from './components/detail/detail.component';
import {ErrorComponent} from './components/error/error.component';


@NgModule({
  imports:      [ BrowserModule,
                  FormsModule,
                  HttpModule,
                  routes
  ],
  declarations: [ MainComponent,
                  TopBarComponent,
                  NavBarComponent,
                  SideNavComponent,
                  SideBarComponent,
                  FooterComponent,
                  PagerComponent,
                  PaginatorComponent,
                  HomeComponent,
                  RegisterComponent,
                  ContactComponent,
                  BasketComponent,
                  CatalogComponent,
                  DetailComponent,
                  ErrorComponent
  ],
  bootstrap:    [ MainComponent ]
})
export class AppModule { }
