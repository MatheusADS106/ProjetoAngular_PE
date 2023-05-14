import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { Customer } from '../../model/customer';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customerList.component.html',
  styleUrls: ['./customerList.component.css']
})

export class CustomerListComponent implements OnInit {

  customers?: Customer[];
  displayedColumns: String[] = ['idCustomer', 'firstNameCustomer', 'lastNameCustomer', 'cpfCustomer', 'birthdateCustomer', 'dateCreatedCustomer', 'monthlyIncomeCustomer', 'statusCustomer', 'emailCustomer', 'actions'];

  constructor(private service: CustomerService, private toast: NgToastService) { }

  ngOnInit(): void {
    this.findAll();
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
}
