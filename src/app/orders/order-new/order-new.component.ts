import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

import { OrderService } from 'src/app/_services/order.service';
import { AddressService } from 'src/app/_services/address.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Shipping_Address } from 'src/app/_models/shipping_address';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/_models/product';
import { AlertService } from 'src/app/_services/alert.service';
import { Order } from 'src/app/_models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-new',
  templateUrl: './order-new.component.html',
  styleUrls: ['./order-new.component.css']
})
export class OrderNewComponent implements OnInit {

  orderForm: FormGroup;
  formBuilder = new FormBuilder();
  submitted = false;
  paymentTypes: string[];
  addresses: Shipping_Address[];
  products: Product[];
  quantities = [1, 2, 3, 4, 5, 6, 7, 8, 10];
  totalValue: number = 0;

  constructor(private orderService: OrderService,
    private addressService: AddressService,
    private authenticationService: AuthenticationService,
    private productService: ProductService,
    private alertService: AlertService, 
    private route: Router) { }

  get f() { return this.orderForm.controls }

  get productsForm() { return this.orderForm.get('products') as FormArray }

  ngOnInit() {
    this.getPaymentTypes();
    this.getAddressesByUser();
    this.orderForm = this.formBuilder.group({
      paymentType: ['', Validators.required],
      shipping_address: [this.authenticationService.currentUserValue.mainShippingAddress],
      totalValue: [{ value: 0, disabled: true }],
      products: this.formBuilder.array([])
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.orderForm.valid) {
      return;
    }
    if ((this.orderForm.get('products') as FormArray).length === 0) {
      this.alertService.error("Must be at least one product in order");
      return;
    }
    let order = new Order;
    order.paymentType = this.orderForm.get('paymentType').value;
    order.totalvalue = this.totalValue;
    order.shippingAddress = this.orderForm.get('shipping_address').value;
    order.user = this.authenticationService.currentUserValue.id;
    order.date = new Date();
    order.products = [];
    this.productsForm.controls.forEach(obj => {
      let productInOrder = {
        product: JSON.parse(obj.get('description').value),
        quantity: obj.get('quantity').value
      };
      order.products.push(productInOrder);
    })
    this.orderService.saveOrder(order).subscribe(
      data => {
        this.alertService.success("Order saved successfully");
        this.route.navigate(['/admin/orders']);
      }, error => {
        this.alertService.error("There was an error saved the order");
      })
  }

  getPaymentTypes() {
    this.orderService.getPaymentTypes().subscribe(data => {
      this.paymentTypes = data;
    }, error => {
      console.log("Error" + error);
    })
  }

  getAddressesByUser() {
    this.addressService.getAllByUserId(this.authenticationService.currentUserValue.id).subscribe(
      data => {
        this.addresses = data;
      }, error => {
        console.log(error);
      })
  }

  createFormProduct(): FormGroup {
    return this.formBuilder.group({
      description: ['', Validators.required],
      quantity: [1]
    })
  }

  addFormProduct() {
    this.productsForm.push(this.createFormProduct());
    this.getAllProducts();
  }

  deleteFormProduct(position: number) {
    this.productsForm.removeAt(position);
    this.calculateTotalValue();
  }

  getAllProducts() {
    this.productService.getAll().subscribe(data => {
      this.products = data;
    }, error => {
      console.log(error);
    })
  }

  getProductDetail(position: number) {
    this.calculateTotalValue();
  }

  toJSON(obj: any): string {
    return JSON.stringify(obj);
  }

  calculateTotalValue() {
    this.totalValue = 0;
    this.productsForm.controls.forEach(obj => {
      let price = (JSON.parse(obj.get('description').value)).price;
      let quantity = obj.get('quantity').value;
      let total_cost_prod = quantity * price;
      this.totalValue += total_cost_prod;
    })
  }
}
