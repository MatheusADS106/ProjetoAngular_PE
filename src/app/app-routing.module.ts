import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customer/customer-list/customerList.component';
import { CustomerFormComponent } from './customer/customer-form/customerForm.component';

const routes: Routes = [
  {path: '', component: CustomerListComponent},
  {path: 'customerform', component: CustomerFormComponent},
  {path: 'customerform/:idCustomer', component: CustomerFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
