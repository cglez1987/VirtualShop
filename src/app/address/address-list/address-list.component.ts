import { Component, OnInit, Injectable } from '@angular/core';
import { map, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { AddressService } from 'src/app/_services/address.service';
import { Shipping_Address } from 'src/app/_models/shipping_address';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { AlertService } from 'src/app/_services/alert.service';
import { UserService } from 'src/app/_services/user.service';




@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class AddressListComponent implements OnInit {

  addresses: Shipping_Address[];
  newAddress = false;

  constructor(private addressService: AddressService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private router: Router,
    private userService: UserService,
    private location: Location) {
    this.newAddress = false;
  }

  ngOnInit() {
    this.newAddress = false;
    this.loadAddresses();
  }

  loadAddresses() {
    let userId = this.authenticationService.currentUserValue.id;
    this.addressService.getAllByUserId(userId).subscribe(data => {
      this.addresses = data;
    });
  }

  deleteAddress(address: Shipping_Address) {
    if (window.confirm("Are you sure want to delete this address?")) {
      this.addressService.delete(address.id).subscribe(
        data => {
          if (address.default) {
            this.authenticationService.currentUserValue.mainShippingAddress = "";
            this.authenticationService.setCurrentUser(this.authenticationService.currentUserValue);
            this.userService.update(this.authenticationService.currentUserValue, this.authenticationService.currentUserValue.id).subscribe(
              data => {
              }, error => {
              })
          }
          this.loadAddresses();
          this.alertService.success("Address deleted successfully", true);
          this.router.navigate(['/admin/address']);
        }, error => {
          console.log("Address not found!")
        })
    }
  }

  setDefault(id: string) {
    this.authenticationService.currentUserValue.mainShippingAddress = id;
    this.authenticationService.setCurrentUser(this.authenticationService.currentUserValue);
    this.userService.update(this.authenticationService.currentUserValue, this.authenticationService.currentUserValue.id).subscribe(
      data => {
        this.loadAddresses();
        this.alertService.success("Address changed as default", true);
        this.router.navigate(['/admin/address']);
      }, error => {
        this.alertService.error("Occurred an error setting default address");
      })
  }

  isAddressesEmpty(): boolean {
    return this.addresses.length == 0;
  }

  addAddress() {
    this.newAddress = true;
  }

  cancel() {
    this.newAddress = false;
    this.location.back();
  }

}
