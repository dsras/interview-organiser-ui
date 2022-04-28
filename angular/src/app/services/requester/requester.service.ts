import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Requester {
  constructor(private http: HttpClient) {}

  getRequest<Type>(reqestURL: string): Observable<Type> {
    const opt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + <string>localStorage.getItem('apiKey'),
      }),
    };
    return this.http.get<Type>(reqestURL, opt).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  postRequestNoType<type>(link: string, obj: any): Observable<any> {
    const opt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + <string>localStorage.getItem('apiKey'),
      }),
    };
    return this.http
      .post<type>(link, obj, opt)
      .pipe(catchError(this.handleError));
  }
  postRequest<Type>(link: string, obj: Type): Observable<Type> {
    const opt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + <string>localStorage.getItem('apiKey'),
      }),
    };
    return this.http
      .post<Type>(link, obj, opt)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
