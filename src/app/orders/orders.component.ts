import { Component, OnInit } from '@angular/core';

import { Order } from '../_models/order';
import { OrderService } from '../_services/order.service';
import { AuthenticationService } from '../_services/authentication.service';
import { AlertService } from '../_services/alert.service';
import { AddressService } from '../_services/address.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[];
  userCanCreateOrder = false;

  constructor(private orderService: OrderService,
    private authenticateService: AuthenticationService,
    private alertService: AlertService,
    private addressService: AddressService) { }

  ngOnInit() {
    this.loadAllOrders();
    this.validateUserAddressExist();
  }

  loadAllOrders() {
    this.orderService.getOrdersByUser(this.authenticateService.currentUserValue.id).subscribe(
      data => {
        this.orders = data;
      }, error => {
        console.log(error);
      })
  }

  deleteOrder(orderId: string) {
    if (window.confirm("Are you sure want to delete this order?"))
      this.orderService.deleteOrder(orderId).subscribe(
        data => {
          this.alertService.success("Order deleted successfully");
          this.loadAllOrders();
        }, error => {
          console.log(error);
        })
  }

  validateUserAddressExist() {
    this.addressService.getAllByUserId(this.authenticateService.currentUserValue.id).subscribe(
      data => {
        if (data.length > 0) {
          this.userCanCreateOrder = true;
        }
      }, error => {
        console.log(error);
      })
  }

  validateCreateOrder() {
    if (!this.userCanCreateOrder) {
      this.alertService.error("You must insert a valid Shipping Address!");
    }
  }



}
