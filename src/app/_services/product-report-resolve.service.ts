import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ProductService } from './product.service';
import { Product } from '../_models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductReportResolveService {

  constructor(private productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Product[]> {
    return this.productService.getAll().toPromise();
  }
}
