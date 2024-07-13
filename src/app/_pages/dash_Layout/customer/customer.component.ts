import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustmrReplyComponent } from '../../_popUpComponent/log/adm-log/customer_log/custmr-reply/custmr-reply.component';
import { CustmrStatusComponent } from '../../_popUpComponent/status/custmr_status/custmr-status/custmr-status.component';
import { CustmrTktComponent } from '../../_popUpComponent/custmr_tkt/custmr-tkt/custmr-tkt.component';
import { Message } from 'src/app/_models/messages';
import { MessageService } from 'src/app/_services/_messages/message.service';

export interface customerData {
  tktNo:string;
  tktDate:string;
  problem:string;
  formId:string;
  description:string;
  quary:string;
  resolution:string;
  status:string;
 }
 const ELEMENT_DATA:customerData []=[
 {tktNo:'124',tktDate:'10/02/2024',problem:"yes",
 formId:'auto',description:'good',quary:'Yes',resolution:'complete',
 status:'complete'}];

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit,AfterViewInit{
  messages: Message[] = [];
  nameFilter = new FormControl();
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  
  displayedColumns:string[]=[
    'tktNo',
    'tktDate',
    'problem',
    'formId',
    'description',
    'quary',
    'resolution',
    'status',
    'action'
  ];
  dataSource = new MatTableDataSource<customerData>(ELEMENT_DATA);
  customer:string='';

constructor(
  //private userService:UsersService,
  private messageService:MessageService,
  private dialog:MatDialog
){



}
 ngAfterViewInit(): void {
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
 }

ngOnInit(): void {
//    this.userService.getCustomer().subscribe((res)=>{
//  this.customer=res;
//  console.log(this.customer);
//    })


}


 openCustom(){
  this.dialog.open(CustmrTktComponent,{
    enterAnimationDuration:"500ms",
    exitAnimationDuration:"800ms",
    width:"80%",
    height:"80vh"
  })
 }
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
// //Popup formate
// openCustomerLog(){
// this.dialog.open(CustomerLogComponent,{
//   width:"50%",
//   height:"50vh",
//   enterAnimationDuration:"500ms",
//   exitAnimationDuration:"700ms",
//  data: {

//   }

// })
// }

openCustomerReply(id:any){
  this.dialog.open(CustmrReplyComponent,{
    width:"30%",
    height:"50vh",
    enterAnimationDuration:"500ms",
    exitAnimationDuration:"700ms",
   data: {
id
    }

  })
  console.log(id,"id with element")
  }
  openCustomerStatus(id:any){
    this.dialog.open(CustmrStatusComponent,{
      width:"60%",
      height:"50vh",
      enterAnimationDuration:"500ms",
      exitAnimationDuration:"700ms",
     data: {

      }

    })
    }

}
