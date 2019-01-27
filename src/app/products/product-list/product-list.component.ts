import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/_models/product';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];


  constructor(private productService: ProductService, private alertService: AlertService) {
    this.products = [];
  }

  ngOnInit() {
    this.loadAllProducts();
  }

  loadAllProducts() {
    this.productService.getAll().subscribe(products => {
      this.products = products;
    })
  }

  deleteProduct(id: string) {
    if (window.confirm("Are you sure want to delete this product?")) {
      this.productService.deleteProduct(id).subscribe(
        data => {
          this.loadAllProducts();
          this.alertService.success("Product deleted successful");
        }, error => {
          if (error.status === 406) {
            this.alertService.error("Cannot delete this product. It exists in an order");
          }
        })
    }
  }

  isEmpty() {
    return this.products.length == 0;
  }

}
