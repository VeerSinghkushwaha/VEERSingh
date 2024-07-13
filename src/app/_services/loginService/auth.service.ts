import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { BehaviorSubject } from 'rxjs';


import { tap } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const AUTH_API = 'http://localhost:3000/UsersData';
const TOKEN_KEY = 'http://localhost:3000/UsersData';
const ROLE_KEY = 'http://localhost:3000/role'
const loginUrl = 'http://localhost:3000/login';
const  logoutUrl = 'http://localhost:3000/logout';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenicated: boolean = false;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  apiUrl = 'http://localhost:3000';
  constructor(
    private router: Router,
     private httpClient: HttpClient) {}

  // getById(roleName: any,password:any): Observable<any> {
  //   return this.httpClient.get(`${this.apiUrl}?roleName=${roleName}&password=${password}`);
  // }

  getById(roleName:any,password:any,role:any):Observable<any>{
    const params = new HttpParams()
      .set('roleName', roleName)
      .set('password', password)
      .set('role',role);

 return this.httpClient.get<any>(`${this.apiUrl}/UsersData`,{params})
  }




  
  // for login system

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY) !== null
      ? window.sessionStorage.getItem(TOKEN_KEY)
      : null;
  }

 
  IsLoggedIn():boolean {
   
    return localStorage.getItem('role') !== 'Admin';
  }

  isAuthentication(): boolean {
    return this.isAuthenicated;
  }



getAllRole():string{
const username= sessionStorage.getItem('roleName');
if(username){
  return username;
}
 return '';
}

  // getUserRole(){
  //   return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():"";
  // }

  getUserRole(): string {
    // Retrieve user data from sessionStorage
    const userData = sessionStorage.getItem('role');

    if (userData) {
      // Parse user data to extract the role
      const user = JSON.parse(userData);
      console.log(userData);
     
      return user;
       
      // return userData;

    }
    return ''
  }
  hasRole(roles: Array<string>): boolean {
    // Check if the user has one of the required roles
    // For example, you can use your authentication logic here
    const userRoles = ['Admin']; // Assume this is the user's role
    return userRoles.some(role => roles.includes(role));
  }

  login(username: string): Observable<any> {
    return this.httpClient.post(loginUrl, { username });
  }

  logout(): Observable<any> {
    return this.httpClient.post(logoutUrl, {}, httpOptions);
  
  }

}
