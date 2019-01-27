import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistryComponent } from './registry/registry.component';
import { HomeComponent } from './home/home.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { AlertComponent } from './_components/alert.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductNewComponent } from './products/product-new/product-new.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { UserDetailsComponent } from './admin-users/user-details/user-details.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { AddressListComponent } from './address/address-list/address-list.component';
import { AddressNewComponent } from './address/address-new/address-new.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderNewComponent } from './orders/order-new/order-new.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { ReportComponent } from './report/report.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistryComponent,
    AlertComponent,
    ProductDetailComponent,
    ProductListComponent,
    ProductNewComponent,
    AdminUsersComponent,
    UserDetailsComponent,
    ProductEditComponent,
    AddressListComponent,
    AddressNewComponent,
    OrdersComponent,
    OrderNewComponent,
    OrderDetailsComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ErrorInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
