import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TicketsData } from 'src/app/_models/TicketData';
import { AuthService } from 'src/app/_services/loginService/auth.service';
import { StorageService } from 'src/app/_services/storage_service/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { TicketsService } from 'src/app/_services/ticketService/tickets.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  @ViewChild('searchInput') searchInput:any;
  ticketData: any[] = [];

  totalRows: number = 0;
  totalpendingTicket:number = 0;
  totalReleasedTicket:any = 0;

  tickettable:TicketsData[];
  displaytickettable:TicketsData[];
constructor( private dataService:TicketsService,
  private dialog:MatDialog){
  this.tickettable =[];
  this.displaytickettable =[];
  let filterticket: TicketsData[] =[];
}

showRows(table: any): void {
  table.showRows = !table.showRows;
}
ngOnInit(): void {
  this.fetchData();
 //fetch data from service and initialize the totalItems array
 //this.totalItem = this.dataService.getData()//we can modify this line according the service file.

}

fetchData():void{

    this.dataService.getTicket().subscribe((data:any)=>{
      this.ticketData = data;
      this.totalRows = this.ticketData.length;

      this.totalpendingTicket = data.filter((ticket:any)=>
        ticket.status.toLowerCase() === 'pending'
      ).length;

      this.totalReleasedTicket = data.filter((ticket:any)=>
        ticket.status.toLowerCase() === 'release awaited'
      ).length;
      console.log("show")
    })


}
filterTicket(tickId:any){

  let filterticket: TicketsData[] =[];
  if(tickId === ''){

  this.tickettable = this.displaytickettable;

  }else{

    this.tickettable = this.tickettable.filter((val,ind)=>{
      debugger
      let targetKey= val.tkt_No.toLowerCase() + val.tkt_FormId.toLowerCase();
      let searchKey= tickId.toLowerCase();
      return targetKey.includes(searchKey);
    });
    this.displaytickettable = filterticket;

  }
}

openModalAction(){
 

}


}
