//import { DeveRemarkComponent } from './../../_popUpComponent/remarks/deve_remark/deve-remark/deve-remark.component';
import { Component,ViewChild,OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeveMessageComponent } from '../../_popUpComponent/message_part/deve-message/deve-message.component';
import { DeveReplyComponent } from '../../_popUpComponent/log/adm-log/developer_log/deve-reply/deve-reply.component';
import { DeveStatusComponent } from '../../_popUpComponent/status/deve_status/deve-status/deve-status.component';
import { MessageService } from 'src/app/_services/_messages/message.service';
import { TicketsService } from 'src/app/_services/ticketService/tickets.service';
import { TicketsData } from 'src/app/_models/TicketData';
import { DeveLogComponent } from '../../_popUpComponent/log/adm-log/developer_log/deve-log/deve-log.component';
import { DeveRemarkComponent } from '../../_popUpComponent/remarks/deve_remark/deve-remark/deve-remark.component';
import { DialogRef } from '@angular/cdk/dialog';
import { DevelDescComponent } from '../../_popUpComponent/descriptions/devel-desc/devel-desc.component';
import { MatMenuTrigger } from '@angular/material/menu';
// export interface developerData{
//   tktNo:number;
//   tktDate:string;
//   allotted:string;
//   tenantName:string;
//   problem:string;
//   description:string;
//   resolution:string;
//   status:string;
//   ets:string;
//  // age:string;
// }
const ELEMENT_DATA:TicketsData[]=[

];


@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css']
})
export class DeveloperComponent implements OnInit {


ticketTable:TicketsData[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;


  displayedColumns:string[]=[
    'tkt_No',
    'tkt_Date',
    'tkt_ReleaseId',
    'tkt_TenantId',
    'tkt_Problem',
    'tkt_Desc',
    // 'tkt_ResolutionId',
    'tkt_Status',
    // 'tkt_Ets',
    'action'
   ];
   dataSource = new MatTableDataSource<TicketsData>(ELEMENT_DATA);

  developer:string='';
   name:any ='';
  constructor(
    //private userSerivce:UsersService,
    // private messageService:MessageService,
    private tktService:TicketsService,
    private dialog:MatDialog,
  ){}

  ngOnInit(): void {
this.ticketTable = [];
// recall the loaded Ticket function
this.loadedTicket();
  }
ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator;
  //this.dataSource = new MatTableDataSource();
}
// upload the ticket from the database
loadedTicket(){
  const tktAssign = sessionStorage.getItem('roleName');
  const tktAssignrole = sessionStorage.getItem('role');
  this.tktService.getDataByName(tktAssign).subscribe((res:any)=>{
    const user = res.filter((roleName:any) => roleName.tkt_Assign === tktAssign);
    if(user){
        this.ticketTable = user;
        this.dataSource = new MatTableDataSource(user);
        this.dataSource.paginator = this.paginator;

    }
   });
}
  openRemark(id:any){
    console.log(id)
    const dialogRef=this.dialog.open(DeveRemarkComponent,{
      width:"50%",
      height:"80%",
      enterAnimationDuration:"500ms",
      exitAnimationDuration:"500ms",
    data:{
      id
    }
    })
    dialogRef.afterClosed()
  }
  openReply(id:any){
   const dialogRef= this.dialog.open(DeveReplyComponent,{
      width:"30%",
      height:"60vh",
      enterAnimationDuration:"500ms",
      exitAnimationDuration:"800ms",
      data:{
        id
      }

    })
    dialogRef.afterClosed();
  }

  openDeveStatus(){
    this.dialog.open(DeveStatusComponent,{
      width:"40%",
      height:"78%",
      enterAnimationDuration:"500ms",
      exitAnimationDuration:"500ms",
      panelClass:"top-origin",
      data:{
      }
    })
  }
 openProblem(){
  this.dialog.open(DeveMessageComponent,{
    width:"45%",
    height:"80vh",
    enterAnimationDuration:"500ms",
    exitAnimationDuration:"600ms",
  });
 }
// open the description box
openDesc(id:any){
  console.log(id)
this.dialog.open(DevelDescComponent,{
  "width":"30%",
  "height":"30%",
  "enterAnimationDuration":"500ms",
  "exitAnimationDuration":"500ms",
  data:{
    id
  }
});
}
// this filter is used for common columns
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

// this filter is used each column seperately

filterColumn(column:keyof TicketsData ,event:any):void{

  const filterValue= (event.target as HTMLInputElement).value;
  this.dataSource.filterPredicate = (data:TicketsData,filter:string)=>{
    return (data[column] as any)?.toString().toLowerCase().includes(filterValue)
  }
  this.dataSource.filter = filterValue;
}
// open the filterValue
@ViewChild(MatMenuTrigger) menu!: MatMenuTrigger;
@ViewChild(MatMenuTrigger) menu1!: MatMenuTrigger;
menuWidth!:any;
openMenu(event: MouseEvent,click:any) {
  const menuWidth = window.innerWidth * 0.2; // Set the width to 20% of the window's inner width
  this.menuWidth = menuWidth + 'px'; // Assuming this.menuWidth is a property in your component to hold the menu width

  event.preventDefault();
 // this.menu.openMenu();
  switch(click){
    case 'tkt_No':
      this.menu.openMenu();
      break;
      // case 'tkt_Date':
      //   this.menu1.openMenu();
      //   break;

  }
}
menuItemClicked(tike:any){
  console.log('Clicked on:',tike);
}

menuClosed() {
  // Handle any necessary actions when the menu is closed
  console.log('Menu closed');
}
}
