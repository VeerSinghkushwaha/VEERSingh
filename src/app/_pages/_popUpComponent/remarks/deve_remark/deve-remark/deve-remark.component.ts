import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Message } from 'src/app/_models/messages';
import { MessageService } from 'src/app/_services/_messages/message.service';
import { AddUserService } from 'src/app/_services/addUserService/add-user.service';

@Component({
  selector: 'app-deve-remark',
  templateUrl: './deve-remark.component.html',
  styleUrls: ['./deve-remark.component.css']
})
export class DeveRemarkComponent implements OnInit{
  messageForm!:FormGroup<any>;
  MsgList:Message[] = [];
  formidNo:string[] = [];
  // get developer name
  developername!:string;
  // get current time and date
  
   formattedDateTime! :string ;
  constructor(private fb:FormBuilder,
    private msgService:MessageService,
    private userService:AddUserService,
    private dialogref:MatDialogRef<DeveRemarkComponent>,
    @Inject(MAT_DIALOG_DATA) public formid:any
  ){
    
// Initialize the the form
    this.messageForm = this.fb.group({
      tkt_FormId: '',
      tkt_message: '',
      tkt_Date: '',
      tkt_Resp: '',
      send_deve_name:this.developername
  });


 // initialized the date and current
 const currentDate = new Date();
 this.formattedDateTime = currentDate.toLocaleDateString();
 console.log(this.formattedDateTime,'formattedTime')
   this.gedevelopername();
   console.log(this.developername,'//////');
  this.developername = '';
    this.formidNo = formid;
    this.MsgList =[];
   
  }
  gedevelopername(){
    this.userService.getUsers().subscribe((users:any)=>{
      const userName = sessionStorage.getItem('roleName');
      console.log(users,'users')
     const user = users.find((name:any)=>name.roleName===userName);
     console.log(user,userName,'uername')
      this.developername = user.roleName;

if(users){
  this.messageForm  = this.fb.group({
    tkt_FormId:this.formid.id,
    tkt_message:'',
    tkt_Date:this.formattedDateTime,
    tkt_Resp:'UnResolved',
    send_deve_name:this.developername,
   });
  
}
    
      
    });

  };
  sendMsg(){

    if(this.messageForm.valid){
      console.log(this.messageForm.value)
      if(confirm()===true){
        this.msgService.postMSG(this.messageForm.value).subscribe((res:any)=>{
          console.log(res,"after submitted form")
          this.messageForm.reset();
           });
      }
    
      console.log(this.messageForm.value)
    }
  }
  ngOnInit(): void {
   
  
  }

  closePopup() {
    if (this.messageForm.valid) {
      this.dialogref.close(this.messageForm.value);
    }
    this.dialogref.close('closed using the popup');
  }

}
