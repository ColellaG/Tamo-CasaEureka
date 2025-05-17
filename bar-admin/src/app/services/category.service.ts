import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Category {
  id: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error('Error en la petición:', error);
    return throwError(() => error);
  }

  getCategories(): Observable<Category[]> {
    console.log('Obteniendo categorías de:', this.apiUrl);
    return this.http.get<Category[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createCategory(category: Omit<Category, 'id'>): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category).pipe(
      catchError(this.handleError)
    );
  }

  updateCategory(id: number, category: Partial<Category>): Observable<Category> {
    return this.http.patch<Category>(`${this.apiUrl}/${id}`, category).pipe(
      catchError(this.handleError)
    );
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
}
