import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { UsersData } from 'src/app/_models/user_role';
@Injectable({
  providedIn: 'root'
})
export class AddUserService {
 private user_url = 'http://localhost:3000';
  constructor(
    private http:HttpClient
  ) { }

  // get all user
  getUsers(){
    return this.http.get<UsersData>(`${this.user_url}/usersdata`);

  }
  //get users by id
  getUsersById(id:any){
    return this.http.get<UsersData>(`${this.user_url}/usersdata`,id);
  }

  //create the user 
  addUser(user:UsersData): Observable<any> {
 return this.http.post<any>(`${this.user_url}/usersdata`, user)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            console.error('Server not found:', error.error);
          }
          return throwError('Something went wrong; please try again later.');
        })
      );
  }
  

  // update the user by id
  updateUsers(user:UsersData){
    this.http.put<UsersData>(`${this.user_url}/usersdata`,user)
  }

  // delete the user

}
