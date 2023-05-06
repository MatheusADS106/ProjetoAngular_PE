import { Component } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { Customer } from '../model/customer';
import { DatePipe } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent {
  customer: Customer = {
    idCustomer: '',
    firstNameCustomer: '',
    lastNameCustomer: '',
    cpfCustomer: '',
    birthdateCustomer: '',
    dateCreatedCustomer: '',
    monthlyIncomeCustomer: '',
    statusCustomer: true,
    emailCustomer: '',
    passwordCustomer: ''
  }

  constructor(private service: CustomerService, private toast: NgToastService) { }

  onSubmit() {
    const datepipe = new DatePipe("pt-BR");
    try {
      this.customer.birthdateCustomer = datepipe.transform(this.customer.birthdateCustomer, "dd/MM/yyyy");
    } catch {
      this.toast.error({ detail: "Erro", summary: `Erro ao cadastrar cliente!` });
    }
    this.service.save(this.customer).subscribe(response => {
      this.toast.success({ detail: "Sucesso", summary: "Cliente cadastrado com sucesso!" });
    }, errorResponse => {
      this.toast.error({ detail: "Erro", summary: `Erro ao cadastrar cliente!` });
    });
    this.customer.birthdateCustomer = datepipe.transform(this.customer.birthdateCustomer, "yyyy-dd-MM");
  }
}
