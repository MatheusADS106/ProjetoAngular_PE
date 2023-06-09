import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, ProductDTO } from '../model/product';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api_config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url: string = API_CONFIG.urlApi;

  constructor(private http: HttpClient) {  }

  save(ProductDTO: ProductDTO) : Observable<Product[]> {
    return this.http.post<Product[]>(`${this.url}/product/create`, ProductDTO);
  }

  update(product: Product) : Observable<Product[]> {
    return this.http.put<Product[]>(`${this.url}/product/update`, product);
  }

  findProduct(idProduct : any) : Observable<any> {
    return this.http.get<any>(`${this.url}/product/findProduct/${idProduct}`);
  }

  findAll() : Observable<any> {
    return this.http.get<any>(`${this.url}/product/list`);
  }

  delete(idProduct : any) : Observable<any> {
    return this.http.delete<any>(`${this.url}/product/delete/${idProduct}`);
  }
}
