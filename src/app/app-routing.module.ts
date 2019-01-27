import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { RegistryComponent } from './registry/registry.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { UserDetailsComponent } from './admin-users/user-details/user-details.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { AddressListComponent } from './address/address-list/address-list.component';
import { AddressNewComponent } from './address/address-new/address-new.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderNewComponent } from './orders/order-new/order-new.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { UserReportResolveService } from './_services/user-report-resolve.service';
import { ReportComponent } from './report/report.component';
import { ProductReportResolveService } from './_services/product-report-resolve.service';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegistryComponent },
  {
    path: "admin/orders", component: OrdersComponent,
    children: [
      { path: 'delete', component: OrdersComponent },
      { path: 'default', component: OrdersComponent }//siempre se debe colocar el default para cuando cargue el padre
    ], 
    canActivate: [AuthGuard]
  },
  { path: "admin/orders/details/:id", component: OrderDetailsComponent, canActivate: [AuthGuard] },
  { path: "admin/users", component: AdminUsersComponent, canActivate: [AuthGuard] },
  { path: "admin/products", component: ProductListComponent, canActivate: [AuthGuard] },
  { path: "editUser/:id", component: UserDetailsComponent, canActivate: [AuthGuard] },
  {
    path: "admin/address", component: AddressListComponent,
    children: [
      { path: 'add', component: AddressNewComponent },
      { path: 'delete', component: AddressListComponent },
      { path: 'default', component: AddressListComponent }
    ], 
    canActivate: [AuthGuard]
  },
  { path: "editProduct/:id", component: ProductEditComponent, canActivate: [AuthGuard] },
  { path: "product/:id", component: ProductDetailComponent },
  { path: "orders/new", component: OrderNewComponent },
  { path: "report", component: ReportComponent, resolve: {topUsers: UserReportResolveService, topProducts: ProductReportResolveService}},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [UserReportResolveService]
})
export class AppRoutingModule { }
