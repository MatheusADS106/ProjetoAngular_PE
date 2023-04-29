import { Component } from '@angular/core';
import { CustomerService } from 'src/app/customer.service';
import { Customer } from './customer';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  errors!: String[];
  customer!: Customer;
  success: boolean = false;

  constructor(private service: CustomerService) {
    this.customer = new Customer();
  }

  onSubmit() {
    this.customer.birthdateCustomer = formatDate(this.customer.birthdateCustomer, "dd/MM/yyy", "en-US");
    this.service.save(this.customer).subscribe(response => {
      this.errors = [];
      this.success = true;
    }, errorResponse => {
      this.errors = errorResponse.error.errors;
      this.success = false;
    });
  }
}
