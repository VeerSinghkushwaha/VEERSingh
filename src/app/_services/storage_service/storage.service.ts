import { Injectable } from '@angular/core';
import { imageData } from 'src/app/_models/imgdata';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const USER_KEY ='auth_user';
const USER_Img = 'http://localhost:3000/imageData';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  imageUrl = 'http://localhost:3000/imagedata';
  constructor(
    private http:HttpClient
  ) { }

  clean():void{
    window.sessionStorage.clear()
  }

  public saveUser(user:any):void{
 window.sessionStorage.removeItem(USER_KEY);
 window.sessionStorage.setItem(USER_KEY,JSON.stringify(user))
  }

  public getUser():any{
    const user= window.sessionStorage.getItem(USER_KEY)
  if(user){
    return JSON.parse(user)
  }
  return {};
  }
  isLoggedIn():boolean{
     const user = window.sessionStorage.getItem(USER_KEY);
     if(user){
      return true;
     }
     return false
  }

  //for image for local Storage

  getimgData(id:any){
    return this.http.get<imageData[]>(this.imageUrl,id)
  }
  // for send the data in local storage
  sendImg(id:any):Observable<any>{
return this.http.post<imageData[]>(this.imageUrl,id);
  }
}
