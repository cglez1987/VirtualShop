import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { OrderService } from 'src/app/_services/order.service';
import { ActivatedRoute } from '@angular/router';

import { Order } from 'src/app/_models/order';
import { Shipping_Address } from 'src/app/_models/shipping_address';
import { AddressService } from 'src/app/_services/address.service';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order: Order;
  shippingAddress: Shipping_Address;


  constructor(private orderService: OrderService,
    private location: Location,
    private activeRoute: ActivatedRoute,
    private addressService: AddressService) { }

  ngOnInit() {
    let orderId = this.activeRoute.snapshot.paramMap.get('id');
    this.orderService.getById(orderId).subscribe(data => {
      this.order = data;
      this.addressService.getById(this.order.shippingAddress).subscribe(data => {
        this.shippingAddress = data;
      })
    }, error => {
      console.log(error);
    })
  }

  goBack() {
    this.location.back();
  }

}
