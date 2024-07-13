import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { get } from 'mongoose';
import { TicketsData } from 'src/app/_models/TicketData';
import { Message } from 'src/app/_models/messages';
import { MessageService } from 'src/app/_services/_messages/message.service';
import { TicketsService } from 'src/app/_services/ticketService/tickets.service';
// export interface Message{
//   tkt_FormId:string,
//   tkt_message:String,
//   tkt_Date:string,
//   tkt_Resp:String,
//   send_deve_name:string,
// };

const ELEMENT_DATA: Message[] = [];
@Component({
  selector: 'app-custdn-log',
  templateUrl: './custdn-log.component.html',
  styleUrls: ['./custdn-log.component.css'],
})
export class CustdnLogComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  message_logTable: Message[] = [];
  messageList: Message[] = [];
  dataTime: TicketsData[] = [];
  duration!: any;
  timeDuration: TicketsData[] = [];
  //CurrentDate = new Date();
  dataSource = new MatTableDataSource<Message>(ELEMENT_DATA);

  displayedColumns: string[] = [
    'tkt_FormId',
    'tkt_message',
    'tkt_Date',
    'tkt_Resp',
    'send_deve_name',
  ];

  constructor(
    private msgService: MessageService,
    private ticketService: TicketsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.messageList = [];
  }
  ngOnInit(): void {
    // loaded the message when page is open
    //this.messageLoaded();
    //loaded Time
    this.getDuration();
    // this.loadedTime(2);
  }


  // get duration time periods
  getDuration() {
    this.msgService.getMSG().subscribe((res: any) => {
      const showMSG1 = res.filter((formid: any) => {
        return formid.tkt_FormId === this.data.tkt_FormId;
      });
      console.log(showMSG1,'messageshow',this.data.tkt_FormId)
      if (showMSG1) {
        ELEMENT_DATA.splice(0, ELEMENT_DATA.length); // Clear the array before pushing new messages
        ELEMENT_DATA.push(showMSG1); // Push the message to the array

        this.dataSource.data = ELEMENT_DATA; // Update dataSource with the new array
        console.log(this.dataSource, ELEMENT_DATA, 'dataSource');
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.messageList = showMSG1;
      } else {
        this.messageList = [];
       
      }

      // for calculation of time method and this.data.tkt_FormId is defind in the openDialog in custodian page
      const showMSG = res.find((formid: any) => {
        return formid.tkt_FormId === this.data.tkt_FormId;
      });
      
      this.ticketService
        .getDuration(this.data)
        .subscribe((formData: any) => {

          const tktDate = formData.find((tkt: any) => {
            return tkt.tkt_FormId === this.data.tkt_FormId && tkt.tkt_FormId != null;
          });
      console.log(tktDate.tkt_Date,'//////',showMSG.tkt_Date)
          const date = new Date(tktDate.tkt_Date);

          const currentDate = new Date(showMSG.tkt_Date);
          const differenceInMilliseconds = Math.abs(currentDate.getTime() - date.getTime());
          console.log(differenceInMilliseconds/(3600000*24),'different')
          const millisecondsInAMinute = 1000 * 60;
          const millisecondsInAnHour = millisecondsInAMinute * 60;
          const millisecondsInADay = millisecondsInAnHour * 24;
          const millisecondsInAWeek = millisecondsInADay * 7;
          const millisecondsInAMonth = millisecondsInADay * 30.44; // Average month length
          const millisecondsInAYear = millisecondsInADay * 365.25; // Including leap years

          let timeduration:any;

          if (differenceInMilliseconds < millisecondsInAnHour) {
            const differenceInMinutes = Math.floor(
              differenceInMilliseconds / millisecondsInAMinute
            );
            timeduration = `${differenceInMinutes} minutes`;
          } else if (differenceInMilliseconds < millisecondsInADay) {
            const differenceInHours = Math.floor(
              differenceInMilliseconds / millisecondsInAnHour
            );
            timeduration = `${differenceInHours} hours`;
          } else if (differenceInMilliseconds < millisecondsInAWeek) {
            const differenceInDays = Math.floor(
              differenceInMilliseconds / millisecondsInADay
            );
            timeduration = `${differenceInDays} days`;
          } else if (differenceInMilliseconds < millisecondsInAMonth) {
            const differenceInWeeks = Math.floor(
              differenceInMilliseconds / millisecondsInAWeek
            );
            timeduration = `${differenceInWeeks} weeks`;
          } else if (differenceInMilliseconds < millisecondsInAYear) {
            const differenceInMonths = Math.floor(
              differenceInMilliseconds / millisecondsInAMonth
            );
            timeduration = `${differenceInMonths} months`;
          } else {
            const differenceInYears = Math.floor(
              differenceInMilliseconds / millisecondsInAYear
            );
            timeduration = `${differenceInYears} years`;
          }
          this.duration = timeduration;
        });
    });
  }
}
