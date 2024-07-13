import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  constructor(private http:HttpClient) { }
  private csvUrl = 'http://localhost:3000/ticketsdata';
  downloadCsv(){
    return this.http.get(this.csvUrl,{responseType:'blob'});
  }
}
