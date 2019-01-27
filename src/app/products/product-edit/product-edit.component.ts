import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product.service';
import { AlertService } from 'src/app/_services/alert.service';



@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product: Product;
  productForm: FormGroup;
  formBuilder = new FormBuilder();
  productId: string;
  submitted = false;

  constructor(private productService: ProductService,
    private routeActivated: ActivatedRoute,
    private location: Location,
    private alertService: AlertService,
    private route: Router) { }

  ngOnInit() {
    let id = this.routeActivated.snapshot.paramMap.get('id');
    this.findProduct(id);
    this.productForm = this.formBuilder.group({
      description: ['', Validators.required],
      price: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]+[\.]*[0-9]*')])],
      weight: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]+[\.]*[0-9]*')])]
    });
  }

  get f() { return this.productForm.controls }

  findProduct(id: string) {
    this.productService.getById(id).subscribe(
      data => {
        this.product = data;
        this.productForm.setValue({
          description: data.description,
          price: data.price,
          weight: data.weight
        })
      }, error => {
        console.log("Error: no existe el producto seleccionado");
        this.location.back();
      })
  }

  updateProduct() {
    this.submitted = true;
    this.product.description = this.productForm.get('description').value;
    this.product.price = this.productForm.get('price').value;
    this.product.weight = this.productForm.get('weight').value;
    this.productService.updateProduct(this.product).subscribe(
      data => {
        this.alertService.success("Product updated successfully", true);
        this.route.navigate(["/admin/products"]);
      }, error => {
        this.alertService.error(error);
      })
  }

  goBack() {
    this.location.back();
  }
}
