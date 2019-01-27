import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product.service';



@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  @Input() product: Product;

  constructor(private productService: ProductService,
    private routeActivated: ActivatedRoute,
    private route: Router,
    private location: Location) { }

  ngOnInit() {
    let id = this.routeActivated.snapshot.paramMap.get('id');
    this.productService.getById(id).subscribe(
      data => {
        this.product = data;
      }, error => {
        console.log("Error: no existe el producto seleccionado");
        this.location.back();
      })
  }

  goBack(){
    this.location.back();
  }

}
