import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { Customer } from '../../model/customer';
import { DatePipe } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-form',
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

  customers?: Customer[];

  indice: number = 0;

  displayedColumns: String[] = ['idCustomer', 'firstNameCustomer', 'lastNameCustomer', 'cpfCustomer', 'birthdateCustomer', 'dateCreatedCustomer', 'monthlyIncomeCustomer', 'statusCustomer', 'emailCustomer', 'actions'];

  constructor(private service: CustomerService, private toast: NgToastService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.findAll();
  }

  onSubmit() {
    const datepipe = new DatePipe("en-US");
    try {
      this.customer.birthdateCustomer = datepipe.transform(this.customer.birthdateCustomer, "dd/MM/yyyy");
    } catch {
      this.toast.error({ detail: "Erro", summary: `Erro ao cadastrar cliente!` });
    }
    if(this.customer.idCustomer) {
      this.service.update(this.customer).subscribe(response => {
        this.indice = 0;
        this.toast.success({ detail: "Sucesso", summary: "Cliente alterado com sucesso!" });
        this.emptyForm();
        this.findAll();
      }, errorResponse => {
        this.toast.error({ detail: "Erro", summary: `Erro ao alterar cliente!` });
      });
    } else {
      this.service.save(this.customer).subscribe(response => {
        this.indice = 0;
        this.toast.success({ detail: "Sucesso", summary: "Cliente cadastrado com sucesso!" });
        this.emptyForm();
        this.findAll();
      }, errorResponse => {
        this.toast.error({ detail: "Erro", summary: `Erro ao cadastrar cliente!` });
      });
    }
    this.customer.birthdateCustomer = datepipe.transform(this.customer.birthdateCustomer, "yyyy-dd-MM");
  }

  delete(idCustomer : any) : void {
    this.service.delete(idCustomer).subscribe(response => {
      this.findAll();
      this.toast.success({ detail: "Sucesso", summary: `Cliente excluído com sucesso!` });
    }, errorResponse => {
      this.toast.error({ detail: "Erro", summary: `Erro ao excluir cliente!` });
    })
  }

  findAll() {
    this.service.findAll().subscribe(response => {
      this.customers = response.result;
    }, errorResponse => {
      this.toast.error({ detail: "Erro", summary: `Erro ao listar clientes!` });
    })
  }

  findCustomer(idCustomer: any): void {
    this.service.findCustomer(idCustomer).subscribe(response => {
      const datepipe = new DatePipe("en-US");
      this.customer = response.result;
      this.customer.birthdateCustomer = datepipe.transform(this.customer.birthdateCustomer, "yyyy-dd-MM");
      this.indice = 1;
    }, errorResponse => {
      this.toast.error({ detail: "Erro", summary: `Erro ao consultar cliente!` });
    })
  }

  emptyForm(): void {
    this.customer = {
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
  }
}
