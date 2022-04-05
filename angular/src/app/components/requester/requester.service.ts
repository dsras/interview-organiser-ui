import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface data{}

export interface userData extends data {
  id: BigInteger,
  username: String,
  userpassword: String,
  userEmail: String,
  userMobile: any,
  userName: String,
  businessTitle: String,
  account: any,
  businessUnit: any,
  dateOfJoining: any,
  designation: any,
  location: any,
  priorExperience: any
}

export interface dummy extends data{
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class Requester {


  constructor(private http: HttpClient) { }
  getreturn<type>(reqestURL: string) {
    return this.http.get<type>(reqestURL)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }




  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
