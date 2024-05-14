import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private myAppUrl: string;
  private myAPIUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3001/';
    this.myAPIUrl = 'api/products';
  }

  getProducts(): Observable<Product[]> {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<Product[]>(`${this.myAppUrl}${this.myAPIUrl}`, {
        headers: headers,
      });
    } else {
      return this.http.get<Product[]>(`${this.myAppUrl}${this.myAPIUrl}`);
    }
  }

  getProductById(id: string): Observable<Product> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Product>(`${this.myAppUrl}${this.myAPIUrl}/${id}`, {
      headers: headers,
    });
  }

  deleteProduct(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.myAppUrl}${this.myAPIUrl}/${id}`, {
      headers: headers,
    });
  }

  createProduct(product: Product): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<void>(`${this.myAppUrl}${this.myAPIUrl}`, product, {
      headers: headers,
    });
  }

  updateProduct(product: Product): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<void>(
      `${this.myAppUrl}${this.myAPIUrl}/${product.id}`,
      product,
      {
        headers: headers,
      }
    );
  }
}
