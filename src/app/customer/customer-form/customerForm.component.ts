import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { Customer } from '../../model/customer';
import { DatePipe } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customerForm.component.html',
  styleUrls: ['./customerForm.component.css']
})

export class CustomerFormComponent implements AfterViewInit, OnInit {
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

  indice: number = 0;

  customers = new MatTableDataSource<Customer>();

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild('customerForm') form! : NgForm;

  displayedColumns: String[] = ['idCustomer', 'firstNameCustomer', 'lastNameCustomer', 'cpfCustomer', 'birthdateCustomer', 'dateCreatedCustomer', 'monthlyIncomeCustomer', 'statusCustomer', 'emailCustomer', 'actions'];

  constructor(private service: CustomerService, private toast: NgToastService) { }

  ngOnInit(): void {
    this.findAll();
  }

  ngAfterViewInit(): void {
    this.customers.paginator = this.paginator;
  }

  onSubmit() {
    const datepipe = new DatePipe("pt-BR");
    this.customer.birthdateCustomer = datepipe.transform(this.customer.birthdateCustomer, "dd/MM/yyyy");
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
    if(window.confirm("Deseja realmente excluir este cliente?")) {
      this.service.delete(idCustomer).subscribe(response => {
        this.findAll();
        this.toast.success({ detail: "Sucesso", summary: `Cliente excluído com sucesso!` });
      }, errorResponse => {
        this.toast.error({ detail: "Erro", summary: `Erro ao excluir cliente!` });
      })
    }
  }

  findAll() {
    this.service.findAll().subscribe(response => {
      this.customers.data = response.result;
    }, errorResponse => {
      this.toast.error({ detail: "Erro", summary: `Erro ao listar clientes!` });
    })
  }

  findCustomer(idCustomer: any): void {
    this.service.findCustomer(idCustomer).subscribe(response => {
      this.customer = response.result;
      var date = this.customer.birthdateCustomer;
      var newDate = date.split("/").reverse().join("-");
      this.customer.birthdateCustomer = newDate;
      this.indice = 1;
    }, errorResponse => {
      this.toast.error({ detail: "Erro", summary: `Erro ao consultar cliente!` });
    })
  }

  emptyForm(): void {
    this.form.resetForm();
    this.form.controls['statusCustomer'].setValue(true);
  }
}
