import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddressService } from 'src/app/_services/address.service';
import { AlertService } from 'src/app/_services/alert.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Shipping_Address } from 'src/app/_models/shipping_address';
import { AddressListComponent } from '../address-list/address-list.component';

@Component({
  selector: 'app-address-new',
  templateUrl: './address-new.component.html',
  styleUrls: ['./address-new.component.css']
})
export class AddressNewComponent implements OnInit {

  addressForm: FormGroup;
  formBuilder = new FormBuilder();
  submitted = false;

  constructor(private addressService: AddressService,
    private alertService: AlertService,
    private router: Router, 
    private authenticationService: AuthenticationService, 
    private addressListComponent: AddressListComponent) { }

  ngOnInit() {
    this.addressForm = this.formBuilder.group({
      street: ['', Validators.required],
      number: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required]
    })
  }

  get f() { return this.addressForm.controls }

  addAddress() {
    this.submitted = true;
    if (!this.addressForm.valid) {
      return;
    }
    let address: Shipping_Address = this.addressForm.value;
    address.userId = this.authenticationService.currentUserValue.id;
    this.addressService.save(address).subscribe(
      data => {
        this.alertService.success("Address saved", true);
        this.addressListComponent.cancel();
        this.addressListComponent.loadAddresses();
        this.router.navigate(['/admin/address']);
      }, error => {
        this.alertService.error("There was an error saving this address");
      })
  }

}
