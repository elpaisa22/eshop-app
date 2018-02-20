import {Component, Input, OnChanges} from '@angular/core';
import {Router } from '@angular/router';

import {Product} from '../../../models/product/product.model';
import {ProductRepository} from '../../../repositories/product/product.repository';

@Component({
	templateUrl : './relatedProducts.html',
  selector : 'related-products'
})
export class RelatedProductsComponent implements OnChanges {

  @Input() id : number;

  public relatedProducts : Product[] = [];

	constructor(private _router: Router,
              private productRepository: ProductRepository) {
  }

  ngOnChanges(){
    this.productRepository.getRelatedProducts(this.id)
                          .subscribe(data => {
                             this.relatedProducts = data;
                           });
  }
}
