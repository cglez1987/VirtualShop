import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ProductService } from 'src/app/_services/product.service';
import { ProductListComponent } from '../product-list/product-list.component';
import { AlertService } from 'src/app/_services/alert.service';


@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css'],
  providers: [ProductListComponent]
})
export class ProductNewComponent implements OnInit {

  productForm: FormGroup;
  formBuilder = new FormBuilder();
  submitted = false;
  @Output() reloadProducts = new EventEmitter<boolean>();

  constructor(
    private productService: ProductService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      description: ['', Validators.required],
      price: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]+[\.]*[0-9]*')])],
      weight: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]+[\.]*[0-9]*')])]
    });
  }

  get f() { return this.productForm.controls }

  addProduct() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    this.productService.saveProduct(this.productForm.value).subscribe(
      data => {
        this.alertService.success('Registration successful');
        this.reloadProducts.emit(true);
        this.productForm.reset();
        this.submitted = false;
      },
      error => {
        this.alertService.error(error);
      })
  }

}
