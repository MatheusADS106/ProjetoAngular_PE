import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { Customer } from '../../model/customer';
import { DatePipe } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customerForm.component.html',
  styleUrls: ['./customerForm.component.css']
})

export class CustomerFormComponent implements OnInit {
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

  idCustomer?: any

  constructor(private service: CustomerService, private toast: NgToastService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params;
    const datepipe = new DatePipe("pt-BR");
    params.subscribe(urlParams => {
      this.idCustomer = urlParams['idCustomer'];
      if (this.idCustomer) {
        this.service.findCustomer(this.idCustomer).subscribe(response => {
          this.customer = response.result
          this.customer.birthdateCustomer = datepipe.transform(this.customer.birthdateCustomer, "yyyy-dd-MM");
          }, errorResponse => {
            this.toast.error({ detail: "Erro", summary: `Erro ao consultar cliente!` });
          }
        );
      }
    });
  }

  onSubmit() {
    const datepipe = new DatePipe("pt-BR");
    try {
      this.customer.birthdateCustomer = datepipe.transform(this.customer.birthdateCustomer, "dd/MM/yyyy");
    } catch {
      this.toast.error({ detail: "Erro", summary: `Erro ao cadastrar cliente!` });
    }
    if(this.idCustomer) {
      this.service.update(this.customer).subscribe(response => {
        this.toast.success({ detail: "Sucesso", summary: "Cliente alterado com sucesso!" });
      }, errorResponse => {
        this.toast.error({ detail: "Erro", summary: `Erro ao alterar cliente!` });
      });
    } else {
      this.service.save(this.customer).subscribe(response => {
        this.toast.success({ detail: "Sucesso", summary: "Cliente cadastrado com sucesso!" });
      }, errorResponse => {
        this.toast.error({ detail: "Erro", summary: `Erro ao cadastrar cliente!` });
      });
    }
    this.customer.birthdateCustomer = datepipe.transform(this.customer.birthdateCustomer, "yyyy-dd-MM");
  }
}
