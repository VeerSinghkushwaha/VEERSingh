import { Component,ViewChild, createComponent} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TicketsData } from 'src/app/_models/TicketData';
import { TicketsService } from 'src/app/_services/ticketService/tickets.service';
import { PopupComponent } from '../../_popUpComponent/tickets/create-tkt/create-tkt.component';
import { DeveloperComponent } from '../developer/developer.component';
import { CustdnLogComponent } from '../../_popUpComponent/log/adm-log/custodian_log/custdn-log/custdn-log.component';
import { CostdnReplyComponent } from '../../_popUpComponent/log/adm-log/custodian_log/costdn-reply/costdn-reply.component';

export interface costodianData{
  tktNo:string;
  tktDate:string;
  tenantName:string;
  problem:string;
  description:string;
  status:string;
  allottedDate:string;
  developer:string;
  resolution:string;
};
const ELEMENT_DATA :TicketsData[]= [];

@Component({
  selector: 'app-custodian',
  templateUrl: './custodian.component.html',
  styleUrls: ['./custodian.component.css']
})
export class CustodianComponent {
 
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  ticketForm!:FormGroup;
  TicketDataTable: TicketsData[];
  displayToTicketDataTable: TicketsData[];
  dataSource = new MatTableDataSource<TicketsData>(ELEMENT_DATA);
 
  displayedColumns: string[] = [
   'id',
   'tktNo',
   'tenantId',
   'formId',
   'description',
   'status',
   'tktRelease',
   'resolutionId',
   'problem',
   'date',
   'action',
 ];
   custodian:string ='';
   name:string='';
 
   ticketData: any[] = [];
   totalRows: number = 0;
   totalClearedTickets:any = '';
   totalPendingTickets:number = 0;
   tickettable:TicketsData[];
   displaytickettable:TicketsData[];
   data: TicketsData[] = [];
 
   constructor(
     //private userService:UsersService,
     private dialog:MatDialog,
     private service:TicketsService,
     private dataService:TicketsService,
     private fb:FormBuilder
   ){
     this.TicketDataTable =[];
     this.tickettable =[];
     this.displaytickettable =[];
     this. displayToTicketDataTable = this.TicketDataTable;
     this.data = [];
   }
 
 
 
   loadTicket() {
     this.service.getTicket().subscribe((res) => {
       this.dataSource = new MatTableDataSource(res);
       // this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
 
       //this.displayToTicketDataTable = this.TicketDataTable;
       console.log(res);
     });
   }
   ngOnInit(): void {
 
     this.loadTicket();
     this.fetchData();
 
 
   }
   ngAfterViewInit(): void {
 
   }
   applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue;
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }
 
   openTicket(id: any) {
     this.open(id, 'Add Ticket');
   }
   open(id:any, title: any){
 
 
     const dialogRef = this.dialog.open(PopupComponent, {
       enterAnimationDuration: '500ms',
       exitAnimationDuration: '500ms',
       height: '80vh',
       width: '60%',
       panelClass: 'full-screen-modal',
       backdropClass: 'custom-backdrop',
       data: {
       id:id,
       title:title,
       },
     });
     dialogRef.afterClosed().subscribe((result) => {
       //this.loadTicket();
       console.log(result);
       if (result) {
         alert('data is calling');
         console.log(result);
         this.service.getTicketById(result).subscribe((res) => {
           console.log('Update ticket response:', res);
         });
       }
       console.log(`Dialog result: ${result}`);
     });
 
   }
 //Edit the ticket from the
   editTicket(data:any){
     this.dialog.open(PopupComponent, {
       enterAnimationDuration: '500ms',
       exitAnimationDuration: '500ms',
       height: '50vh',
       width: '45%',
      
       backdropClass: 'custom-backdrop',
       data,
     });
   }
 
 
   //custodian popup

   openCustodianLog(){
    const dialofRef= this.dialog.open(CustdnLogComponent,{
       width:'50%',
       height:'50vh',
       exitAnimationDuration:'600ms',
       enterAnimationDuration:'600ms',
       data:{
 
       }
 
     })
     dialofRef.afterClosed();
   }
   openCustodianReply(){
    const dialogRef1 = this.dialog.open(CostdnReplyComponent,{
       width:'30%',
       height:'70vh',
       enterAnimationDuration:'600ms',
       exitAnimationDuration:'600ms',
       data:{
 
       }
     })
     dialogRef1.afterClosed();
   }
  //  openCustodianStatus(){
  //    const dialogRef = this.dialog.open(CustodianStatusComponent,{
  //      width:"40%",
  //      height:"70vh",
  //      enterAnimationDuration:"500ms",
  //      exitAnimationDuration:"600ms",
  //      data:{
 
  //      }
  //    })
 
  //  }
 
   showRows(table: any): void {
     table.showRows = !table.showRows;
   }
 
   fetchData():void{
     this.dataService.getTicket().subscribe((data:any)=>{
       this.ticketData = data;
       console.log(this.ticketData,"show");
       this.totalRows = this.ticketData.length;
       this.totalPendingTickets = data.filter((ticket:any) => ticket.tkt_Status && ticket.tkt_Status.toLowerCase() === 'Pending').length;
       this.totalClearedTickets = data.filter((ticket:any) => ticket.tkt_Status && ticket.tkt_Status.toLowerCase() === 'Release awaited').length;
 
 console.log(this.totalClearedTickets,"this pending" );
 
 
       console.log("show")
     })
 }
}
