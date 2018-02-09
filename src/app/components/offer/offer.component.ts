import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router }  from '@angular/router';

import {Offer, Product} from '../../models/product/product.model';
import {ProductRepository} from '../../repositories/product/product.repository';


@Component({
	templateUrl : './offer.html'
})
export class OfferComponent implements OnInit {

	private _selectedId : any;
  public offer : Offer;
  public products : Product[];

  constructor(private _activatedRoute: ActivatedRoute,
              private _productRepository: ProductRepository) {
	}

  ngOnInit(){
    this._activatedRoute.params.subscribe((params: Params) => {
			this._selectedId = params['id'];
			this._productRepository.getOffer(this._selectedId)
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
