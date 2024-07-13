import { Component, OnInit } from '@angular/core';
import { loginData } from 'src/app/_models/user_Status';
import { UserStatusService } from 'src/app/_services/user_status_Service/user-status.service';

@Component({
  selector: 'app-user-online',
  templateUrl: './user-online.component.html',
  styleUrls: ['./user-online.component.css']
})
export class UserOnlineComponent implements OnInit{
  userStatus:loginData[]=[];
  constructor(private trackService:UserStatusService){
this.userStatus = [];
  }
ngOnInit(): void {

  this.trackingUser();
}

trackingUser(){
  this.trackService.track().subscribe((res:loginData[])=>{
    const isonline = res.filter((active:any)=>{
     return active.isOnline == true;
    });
    console.log(isonline,'isOnline')
    this.userStatus = isonline;
  });
  console.log(this.userStatus,"tracking system");
}
}
