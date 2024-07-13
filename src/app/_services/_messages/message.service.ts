import { Injectable, OnInit } from '@angular/core';
import { Message } from 'src/app/_models/messages';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class MessageService implements OnInit {
  MSG_URL = 'http://localhost:3000/messagedata';
  private messages : Message[] = [];

  constructor(private http:HttpClient) {
    
   }
   connect():void{
    
   }
// get msg from the data
getMSG(){
  return this.http.get<Message>(this.MSG_URL)
};

postMSG(id:string){
 return this.http.post<Message>(this.MSG_URL,id) 
};
 ngOnInit(): void {
  
 }

}
