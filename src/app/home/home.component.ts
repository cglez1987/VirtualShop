import { Component, OnInit } from '@angular/core';

import { Product } from '../_models/product';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductService) {
    
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe(data => {
      this.products = data;
    })

  }


}
