import {Injectable, Inject} from 'angular2/core';
import {Product} from '../../models/product/product.model';
import {ProductRepository} from '../../repositories/product/product.repository';

@Injectable()
export class CatalogService {

    private result : string;

    private products : Product[] = [];
    private _productRepository : ProductRepository;

    constructor (@Inject(ProductRepository) productRepository : ProductRepository){
      this._productRepository = productRepository;
    }

    getProducts() : Product[] {
      return this.products;
    }

    loadProducts() : Product[] {
      this.products.length = 0;
      this._productRepository.getAllProducts()
          .subscribe(
            data => {
              data.forEach((prod, i) => {
                  this.products.push(prod);
              })
            },
            error => console.log(error)
          );
      return this.products;
    }
}
