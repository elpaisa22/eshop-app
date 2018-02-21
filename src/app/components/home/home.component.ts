import {Component, OnInit} from '@angular/core';
import {Router } from '@angular/router';

import {Offer} from '../../models/offer/offer.model';
import {Content} from '../../models/content/content.model';
import {Product} from '../../models/product/product.model';
import {OfferRepository} from '../../repositories/offer/offer.repository';
import {ContentRepository} from '../../repositories/content/content.repository';
import {ProductRepository} from '../../repositories/product/product.repository';

@Component({
	templateUrl : './home.html'
})
export class HomeComponent implements OnInit {

  public currentOffers : Offer[] = [];
  public sliderContent : Content[] = [];
  public productsOffer : Map<number, Product[]> = new Map<number, Product[]>();

  constructor(private offerRepository: OfferRepository,
              private contentRepository: ContentRepository,
              private productRepository: ProductRepository) {
	}

  ngOnInit(){
    this.offerRepository.getCurrentOffers()
                        .subscribe(data => {
                             this.currentOffers = data;
                             for (let elem of data) {
                                this.loadProductsForOffer(elem);
                             }

                        });

    this.contentRepository.getSliderContent()
                          .subscribe(data => {
                               this.sliderContent = data;
                          });
  }

  private loadProductsForOffer(offer : Offer) {
    this.productRepository.getProductsForOffer(offer)
                           .subscribe( elements => this.productsOffer.set(offer.id, elements));
  }

}
