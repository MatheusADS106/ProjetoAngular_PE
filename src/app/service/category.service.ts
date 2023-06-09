import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../model/category';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api_config';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url: string = API_CONFIG.urlApi;

  constructor(private http: HttpClient) {  }

  save(category: Category) : Observable<Category[]> {
    return this.http.post<Category[]>(`${this.url}/category/create`, category);
  }

  update(category: Category) : Observable<Category[]> {
    return this.http.put<Category[]>(`${this.url}/category/update`, category);
  }

  findCategory(idCategory : any) : Observable<any> {
    return this.http.get<any>(`${this.url}/category/findCategory/${idCategory}`);
  }

  findAll() : Observable<any> {
    return this.http.get<any>(`${this.url}/category/list`);
  }

  delete(idCategory : any) : Observable<any> {
    return this.http.delete<any>(`${this.url}/category/delete/${idCategory}`);
  }
}
