import { Component, OnInit, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustmrReplyComponent } from '../../customer_log/custmr-reply/custmr-reply.component';
import { TicketsService } from 'src/app/_services/ticketService/tickets.service';
import { MessageService } from 'src/app/_services/_messages/message.service';
import { TicketsData } from 'src/app/_models/TicketData';
import { UsersData } from 'src/app/_models/user_role';
@Component({
  selector: 'app-costdn-reply',
  templateUrl: './costdn-reply.component.html',
  styleUrls: ['./costdn-reply.component.css']
})
export class CostdnReplyComponent implements OnInit {
tktRplyForm!:FormGroup;
inputRply:any;
messageContent: string = '';
developList:UsersData[]=[];
Current_date_time:string ='';
    // get current date and time
    getDate_time():string{
      return new Date().toISOString();
    }
constructor(
  private messagingService:MessageService,
  private tktService:TicketsService,
  private dialogref:MatDialogRef<CustmrReplyComponent>,
  @Inject(MAT_DIALOG_DATA) public Rplydata:any
){
  this.inputRply = Rplydata;
  this.Current_date_time = this.getDate_time();
}

closePopup() {
  if (this.tktRplyForm.valid) {
    this.dialogref.afterClosed().subscribe(result => {
      console.log('Dialog was closed');
    });
  }

}

ngOnInit(): void {
  this.inputRply = this.Rplydata;
  this.Users_list(2);
}

// download the user list
 Users_list(id:any){
  this.tktService.get_user(id).subscribe((data:any)=>{
    this.developList = data;
    console.log(data,"developerlist")
  })
 }
sendMessage() {
  const message = {
    id: '1', // Generate a unique ID
    senderId: 'admin', // Use actual sender ID
    receiverId: 'user1', // Use actual receiver ID
    content: this.messageContent, 
    timestamp: new Date()
  };
  // this.messagingService.getMessage(message);
  // this.messageContent = '';
  // console.log(this.messagingService.getMessage(message))
}
}
