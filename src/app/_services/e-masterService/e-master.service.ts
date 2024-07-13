import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { emasterFormdata } from 'src/app/_models/emaster';

@Injectable({
  providedIn: 'root'
})
export class EMasterService {

private emasterUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  // get data by all
  getAllGmaster(){
    return this.http.get<emasterFormdata>(`${this.emasterUrl}/emasterdata`);
  }
// post the data into databse 
  sendDataToDatabase( data: any): Observable<any> {
   
    return this.http.post(`${this.emasterUrl}/emasterdata`, data).pipe(
      catchError((error) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }
  // get  data with help of database and search text

  getDataAndText(name: any, password: any): Observable<any> {
    const params = new HttpParams()
      .set('head_name', name)
      .set('tkt_abbr_name', password);

    return this.http.get<emasterFormdata>(`${this.emasterUrl}/emasterdata`, { params });
  }


}
