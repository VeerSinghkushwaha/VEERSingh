import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, of } from 'rxjs';
import { TicketsData } from 'src/app/_models/TicketData';
import { UsersData } from 'src/app/_models/user_role';
import { HttpResponse } from '@angular/common/http';
import { formData } from 'src/app/_models/formIdData';
import { tenant } from 'src/app/_models/tenantData';


@Injectable({
  providedIn: 'root'
})
export class TicketsService {
   user_data = 'http://localhost:3000/UsersData';
   ticket_URL = 'http://localhost:3000/TicketsData';
   imageUrl = 'http://localhost:3000/imageData';
   formIdUrl = 'http://localhost:3000/formId';
   tenantUrl = 'http://localhost:3000/tenant';
   timeDurationurl = 'http://localhost:3000/TicketsData';

  constructor( private http:HttpClient) { }

  //get formid number by formId database
   getFormId(){
    return this.http.get<formData>(this.formIdUrl);
   }

   // get tenant id and name from the data base
   getTenant(){
    return this.http.get<tenant>(this.tenantUrl)
   }
  //Get the data From the database
  getTicket(){
    return this.http.get<TicketsData[]>(this.ticket_URL);
  }
  getTicketById(id:any){
    return this.http.get<TicketsData[]>(this.ticket_URL,id)
  }
  //find the totl row and colomn from the databse

  getMockData(): Observable<{ name: string, rows: string[] }[]> {
    // Simulate asynchronous data fetching
    return of([
      { name: 'table1', rows: ['row1', 'row2', 'row3'] },

      // Add more tables as needed
    ]);
  }
  //Create the data through form or Insert the data into database
  createTicket(tickets:TicketsData){
    return this.http.post<TicketsData[]>(this.ticket_URL, tickets);
  }
  //Update the tickets in the database.with method put method
  updateTicket(id:TicketsData,newticketData:any){
    return this.http.put<TicketsData[]>(`${this.ticket_URL}/${id}`,newticketData)
  }
  //Delete data from the Database
  deleteTicket(id: TicketsData){
    return this.http.delete<TicketsData[]>(`${this.ticket_URL}/${id}`);
  }
  //Image page and how uploaded the image

  uploadImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);

    return this.http.post<any>(this.imageUrl, formData);
  }

  saveImagePath(imagePath: string): Observable<any> {
    const data = { imagePath: imagePath };
    return this.http.post<any>(this.imageUrl, data);
  }
  ngOnInit(): void {

  }

  // get data from the database

  get_user(id:any){
    return this.http.get<UsersData[]>(this.user_data,id)
  }
// this getdata is used for the developer part
getDataByName(tkt_Assign: any): Observable<any> {
  const params = new HttpParams()
  .set('tkt_Assign', tkt_Assign);
  console.log(tkt_Assign);
  return this.http.get<any>(this.ticket_URL,{params});
}
// get tenant id and na    me
getTenantData(){
  return this.http.get<any>(this.tenantUrl)
}
// get time duration of ticket
getDuration(tkt_FormId:any){
  console.log(tkt_FormId,'12622')
return this.http.get<any>(this.timeDurationurl,tkt_FormId) ;

}
}
