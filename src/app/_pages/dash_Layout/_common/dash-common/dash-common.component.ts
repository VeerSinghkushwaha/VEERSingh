import { Component, ViewChild } from '@angular/core';
import { TicketsData } from 'src/app/_models/TicketData';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TicketsService } from 'src/app/_services/ticketService/tickets.service';
import { PopupComponent } from 'src/app/_pages/_popUpComponent/tickets/create-tkt/create-tkt.component';
import { CustdnLogComponent } from 'src/app/_pages/_popUpComponent/log/adm-log/custodian_log/custdn-log/custdn-log.component';
import { CostdnReplyComponent } from 'src/app/_pages/_popUpComponent/log/adm-log/custodian_log/costdn-reply/costdn-reply.component';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs';
import { CsvService } from 'src/app/_services/csv_down_service/csv.service';
import { MatMenuTrigger } from '@angular/material/menu';

export interface costodianData {
  tkt_No: Number;
  tkt_Date: Date;
  tkt_Problem: String;
  tkt_Tenantid: String;
  tkt_FormId: String;
  tkt_Desc: String;
  tkt_Status: String;
 // tkt_ResolutionId: String;
  tkt_ReleaseId: String;
  tkt_Priority: String;
}

const ELEMENT_DATA: TicketsData[] = [];

@Component({
  selector: 'app-dash-common',
  templateUrl: './dash-common.component.html',
  styleUrls: ['./dash-common.component.css'],
})
export class DashCommonComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ticketForm!: FormGroup;
  TicketDataTable: TicketsData[];
  displayToTicketDataTable: TicketsData[];
  dataSource = new MatTableDataSource<TicketsData>(ELEMENT_DATA);

  displayedColumns: string[] = [
    // 'id',
    'tkt_No',
    'tkt_TenantId',
    'tkt_FormId',
    'tkt_Desc',
    'tkt_Status',
    //'tkt_ReleaseId',
    // 'tkt_ResolutionId',
    'OS',
    'tkt_Problem',
    //'tkt_Date',
    'tkt_Assign',
    // 'assignee',
    'action',
  ];
  custodian: string = '';
  name: string = '';

  ticketData: any[] = [];
  totalRows: number = 0;
  totalResolved: number = 0;
  totalPassed: number = 0;
  totalPendingTickets: number = 0;
  totalWorkingTickets: number = 0;
  tickettable: TicketsData[];
  displaytickettable: TicketsData[];
  data: TicketsData[] = [];

  constructor(
    //private userService:UsersService,
    private dialog: MatDialog,
    private service: TicketsService,
    private dataService: TicketsService,
    private csvService: CsvService,
    private fb: FormBuilder
  ) {
    this.TicketDataTable = [];
    this.tickettable = [];
    this.displaytickettable = [];
    this.displayToTicketDataTable = this.TicketDataTable;
    this.data = [];
  }

  // download the csvfile
  downloadCsv() {
    this.csvService.downloadCsv().subscribe((data) => {
      const blob = new Blob([data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  loadTicket() {
    this.service.getTicket().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      // this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      //this.displayToTicketDataTable = this.TicketDataTable;
    });
  }
  ngOnInit(): void {
    this.loadTicket();
    this.fetchData();
    // Refresh  condition is used
    interval(30000) //refresh every 5 seconds
      .pipe(switchMap(() => this.service.getTicket()))
      .subscribe((data: any) => {
        this.loadTicket();
        this.fetchData();
      });
  }
  ngAfterViewInit(): void {}

  //overall filter i.e filter for common columns
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // filter by each column seperately
  filterColomn(column: keyof TicketsData, event: any): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data: TicketsData, filter: string) => {
      return (data[column] as any)
        ?.toString()
        .toLowerCase()
        .includes(filterValue);
    };
    this.dataSource.filter = filterValue;
  }
  openTicket(id:any) {
    this.open(id, 'Add Ticket','');
  }
  open(id: any, title: any,imgdata:any) {
    const dialogRef = this.dialog.open(PopupComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      height: '80%',
      width: '80%',
      panelClass: 'full-screen-modal',
      backdropClass: 'custom-backdrop',

      data: {
        tkt_FormId: id,
        title: title,
        imgdata
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      //this.loadTicket();
      if (result) {
        this.service.getTicketById(result).subscribe((res) => {
          console.log('Update ticket response:', res);
        });
      }
      console.log(`Dialog result: ${result}`);
    });
  }
  //Edit the ticket from the
  editTicket(data:any,imgdata:any) {
    this.dialog.open(PopupComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      height: '70%',
      width: '60%',
      panelClass: 'full-screen-modal',
      backdropClass: 'custom-backdrop',
      data
    });
    { imgdata}
  }

  //custodian popup
  openCustodianLog(id: any) {
    const dialofRef = this.dialog.open(CustdnLogComponent, {
      width: '50%',
      height: '50vh',
      exitAnimationDuration: '600ms',
      enterAnimationDuration: '600ms',
      data: {
      tkt_FormId:id,
      },
    });
    dialofRef.afterClosed();
  }

  openCustodianReply(data: any) {
    const rplydata = { message: 'contentsdata' };
    const dialogRef = this.dialog.open(CostdnReplyComponent, {
      width: '30%',
      height: '70vh',
      enterAnimationDuration: '600ms',
      exitAnimationDuration: '600ms',
      data,
    });
    console.log(data, 'data is id');
    dialogRef.afterClosed().subscribe((result) => {});
    //dialogRef.afterClosed();
  }
  // openCustodianStatus(){
  //   const dialogRef = this.dialog.open(CustodianStatusComponent,{
  //     width:"40%",
  //     height:"70vh",
  //     enterAnimationDuration:"500ms",
  //     exitAnimationDuration:"600ms",
  //     data:{

  //     }
  //   })

  // }

  showRows(table: any): void {
    table.showRows = !table.showRows;
  }

  fetchData(): void {
    this.dataService.getTicket().subscribe((data: any) => {
      this.ticketData = data;
      this.totalRows = this.ticketData.length;
      this.totalPendingTickets = data.filter(
        (ticket: any) =>
          ticket.tkt_Status && ticket.tkt_Status.toLowerCase() === 'pending'
      ).length;
      this.totalResolved = data.filter(
        (ticket: any) =>
          ticket.tkt_Status && ticket.tkt_Status.toLowerCase() === 'resolved'
      ).length;
      console.log(this.totalResolved, 'Resolved');
      this.totalPassed = data.filter(
        (ticket: any) =>
          ticket.tkt_Status && ticket.tkt_Status.toLowerCase() === 'passed'
      ).length;
      this.totalWorkingTickets = data.filter(
        (ticket: any) =>
          ticket.tkt_Status && ticket.tkt_Status.toLowerCase() === 'working'
      ).length;
    });
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
