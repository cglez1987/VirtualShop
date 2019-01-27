import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { UserService } from './user.service';
import { Shipping_Address } from '../_models/shipping_address';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient,
    private userService: UserService,
    private authenticationService: AuthenticationService) { }

  getAll() {
    return this.http.get<Shipping_Address[]>(this.userService.apiUrl + '/shippingAddress');
  }

  getAllByUserId(userId: string) {
    let defaultAddressId = this.authenticationService.currentUserValue.mainShippingAddress;
    return this.http.get<Shipping_Address[]>(this.userService.apiUrl + '/shippingAddress/user/' + userId).pipe(map(
      obj => {
        obj.forEach(address => {
          if (address.id === defaultAddressId) {
            address.default = true;
          }
        })
        return obj;
      }
    ));
  }

  getById(id: string) {
    return this.http.get<Shipping_Address>(this.userService.apiUrl + '/shippingAddress/' + id);
  }

  save(address: Shipping_Address) {
    return this.http.post(this.userService.apiUrl + '/shippingAddress', address);
  }

  update(address: Shipping_Address, addressId: string) {
    return this.http.put(this.userService.apiUrl + '/shippingAddress/' + addressId, address);
  }

  delete(id: string) {
    return this.http.delete(this.userService.apiUrl + '/shippingAddress/' + id);
  }
}
