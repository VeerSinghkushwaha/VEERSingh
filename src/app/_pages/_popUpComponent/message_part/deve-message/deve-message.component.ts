import { Component, OnInit } from '@angular/core';
import { TicketsData } from 'src/app/_models/TicketData';
import { TicketsService } from 'src/app/_services/ticketService/tickets.service';

@Component({
  selector: 'app-deve-message',
  templateUrl: './deve-message.component.html',
  styleUrls: ['./deve-message.component.css']
})
export class DeveMessageComponent implements OnInit {

  tktProblemList:TicketsData[]= [];
  constructor(private tktService:TicketsService){
 this.tktProblemList = [];
  }
  
  ngOnInit(): void {
    this.showMSGList();
  }
 
  showMSGList(){
    const tktAssign = sessionStorage.getItem('roleName');
    const tktAssignrole = sessionStorage.getItem('role');
    this.tktService.getDataByName(tktAssign).subscribe((res:any)=>{
      const user = res.filter((roleName:any) => roleName.tkt_Assign === tktAssign);
      console.log(user)
      if(user){
          this.tktProblemList = user;
        console.log(this.tktProblemList)
      }
   
     });
      
  }
}
