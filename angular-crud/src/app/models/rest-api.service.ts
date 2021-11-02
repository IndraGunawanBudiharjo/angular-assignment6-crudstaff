import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { Employees } from './employees';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  apiUrl = 'http://localhost:4000';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' // handle cors
    })
  }

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any> {
    return this.http.get(this.apiUrl + '/users').pipe(catchError(this.handleError));
  }

  createEmployee(employee: Employees): Observable<any> {
    return this.http.post(this.apiUrl + '/users', employee, this.httpOptions).pipe(catchError(this.handleError));
  }

  getEmployee(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/users' + id).pipe(catchError(this.handleError));
  }

  updateEmployee(employee: Employees, id: number): Observable<any> {
    return this.http.put(this.apiUrl + '/users/' + id,
      employee, this.httpOptions).pipe(catchError(this.handleError));
  }


  deleteEmployee(id: number) {
    return this.http.delete(this.apiUrl + '/users/' + id).pipe(catchError(this.handleError));
  }

  handleError (e: HttpErrorResponse){
    let message = '';
    if (e.error instanceof ErrorEvent) {
      message = e.error.message;
    }else{
      message = `Error Code: ${e.status}\n Message: ${e.message}`;
    }
    return throwError(message);
  };

}
