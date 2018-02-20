import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router }  from '@angular/router';

import {Product} from '../../models/product/product.model';
import {Offer} from '../../models/offer/offer.model';
import {ProductRepository} from '../../repositories/product/product.repository';
import {OfferRepository} from '../../repositories/offer/offer.repository';


@Component({
	templateUrl : './offer.html'
})
export class OfferComponent implements OnInit {

	private _selectedId : any;
  public offer : Offer;
  public products : Product[];

  constructor(private _activatedRoute: ActivatedRoute,
              private _productRepository: ProductRepository,
              private _offerRepository: OfferRepository) {
	}

  ngOnInit(){
    this._activatedRoute.params.subscribe((params: Params) => {
			this._selectedId = params['id'];
			this._offerRepository.getOffer(this._selectedId)
		                       .subscribe(
															data => {
																this.offer = data;
                                this.loadProductsForOffer(this.offer);
															},
												      error => console.log(error)
													 );
			window.scrollTo(0, 0);
	 	});
  }

  private loadProductsForOffer(offer : Offer) {
    this._productRepository.getProductsForOffer(offer)
                           .subscribe( elements => this.products = elements);
  }

}
