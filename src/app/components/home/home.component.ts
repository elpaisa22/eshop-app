import {Component, OnInit} from '@angular/core';
import {Router } from '@angular/router';

import {Offer} from '../../models/product/product.model';
import {ProductRepository} from '../../repositories/product/product.repository';

@Component({
	templateUrl : './home.html'
})
export class HomeComponent implements OnInit {

  public currentOffers : Offer[] = [];

  constructor(private productRepository: ProductRepository) {
	}

  ngOnInit(){
    this.productRepository.getCurrentOffers()
                          .subscribe(data => {
                             this.currentOffers = data;
                          });
  }

}
