import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginData } from 'src/app/_models/user_Status';

 const loginHttp = 'http://localhost:3000/loginData';
 const baseUrl = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})
export class UserStatusService {

  constructor(private http:HttpClient) { }
  track(): Observable<any> {
    return this.http.get<loginData>(loginHttp);
  }

  loginPost(data: any): Observable<any> {
    return this.http.post<loginData>(loginHttp, data).pipe(
      catchError(this.handleError)
    );
  }


  //logout
  deleteResource(roleName: string): Observable<string> {
    return this.http.delete(`${loginHttp}/${roleName}`, { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
