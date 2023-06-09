import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../model/customer';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api_config';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url: string = API_CONFIG.urlApi;

  constructor(private http: HttpClient) {  }

  save(customer: Customer) : Observable<Customer[]> {
    return this.http.post<Customer[]>(`${this.url}/customer/create`, customer);
  }

  update(customer: Customer) : Observable<Customer[]> {
    return this.http.put<Customer[]>(`${this.url}/customer/update`, customer);
  }

  findCustomer(idCustomer : any) : Observable<any> {
    return this.http.get<any>(`${this.url}/customer/findCustomer/${idCustomer}`);
  }

  findAll() : Observable<any> {
    return this.http.get<any>(`${this.url}/customer/list`);
  }

  delete(idCustomer : any) : Observable<any> {
    return this.http.delete<any>(`${this.url}/customer/delete/${idCustomer}`);
  }
}
