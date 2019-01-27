import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../_models/product';
import { UserService } from './user.service';



@Injectable({ providedIn: 'root' })
export class ProductService {

    constructor(
        private http: HttpClient,
        private userService: UserService) {

    }

    getAll() {
        return this.http.get<Product[]>(this.userService.apiUrl + '/product');
    }

    getById(id: string) {
        return this.http.get<Product>(this.userService.apiUrl + '/product/' + id);
    }

    saveProduct(product: Product) {
        return this.http.post(this.userService.apiUrl + '/product', product);
    }

    updateProduct(product: Product) {
        return this.http.put(this.userService.apiUrl + '/product/' + product.id, product);
    }

    deleteProduct(id: string) {
        return this.http.delete(this.userService.apiUrl + '/product/' + id);
    }

}