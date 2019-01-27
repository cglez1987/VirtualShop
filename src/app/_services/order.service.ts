import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserService } from './user.service';
import { Product } from '../_models/product';
import { Order } from '../_models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient,
    private userService: UserService) {

  }

  getAll() {
    return this.http.get<Order[]>(this.userService.apiUrl + '/order');
  }

  getById(id: string) {
    return this.http.get<Order>(this.userService.apiUrl + '/order/' + id);
  }

  saveOrder(order: Order) {
    return this.http.post(this.userService.apiUrl + '/order', order);
  }

  updateOrder(order: Order) {
    return this.http.put(this.userService.apiUrl + '/order/' + order.number, order);
  }

  deleteOrder(id: string) {
    return this.http.delete(this.userService.apiUrl + '/order/' + id);
  }

  getPaymentTypes() {
    return this.http.get<string[]>(this.userService.apiUrl + '/order/paymentTypes');
  }

  getOrdersByUser(idUser: string) {
    return this.http.get<Order[]>(this.userService.apiUrl + '/order/user/' + idUser);
  }
}
