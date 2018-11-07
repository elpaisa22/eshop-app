import { Component, OnInit } from '@angular/core';
import {ProductRepository} from './repositories/product/product.repository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  text: string;
  display: boolean = false;

  constructor(private productRepository: ProductRepository) {
  }

  ngOnInit(){
    this.productRepository.getProducts().subscribe();
  }
}
