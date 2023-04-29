import { Component } from '@angular/core';
import { CustomerService } from 'src/app/customer.service';
import { Customer } from './customer';
import { formatDate } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  customer!: Customer;

  constructor(private service: CustomerService, private toast: NgToastService) {
    this.customer = new Customer();
  }

  onSubmit() {
    try {
      this.customer.birthdateCustomer = formatDate(this.customer.birthdateCustomer, "dd/MM/yyy", "en-US");
    } catch {
      this.toast.error({detail: "Erro", summary: `Erro ao cadastrar cliente!`});
    }
    this.service.save(this.customer).subscribe(response => {
      this.customer = new Customer();
      this.toast.success({detail: "Sucesso", summary: "Cliente cadastrado com sucesso!"});
    }, errorResponse => {
      this.customer.birthdateCustomer = formatDate(this.customer.birthdateCustomer, "yyyy-MM-dd", "en-US");
      this.toast.error({detail: "Erro", summary: `Erro ao cadastrar cliente!`});
    });
  }
}
