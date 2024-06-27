import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../interfaces/Employee.interface';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = 'https://retoolapi.dev/HYd96h/data';
  }
  public getEmployees() {
    return this.http.get<Employee[]>(this.apiURL);
  }
  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || 'Server Error');
  }
}
