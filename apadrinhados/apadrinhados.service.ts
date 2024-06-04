import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IApadrinhamento } from './model/IApadrinhamento';

@Injectable({
  providedIn: 'root'
})
export class ApadrinhamentoService {
  private apiUrl = 'https://localhost:7240/api/IApadrinhamento';

  constructor(private http: HttpClient) { }

  getActiveIApadrinhamentos(): Observable<IApadrinhamento[]> {
    return this.http.get<IApadrinhamento[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
