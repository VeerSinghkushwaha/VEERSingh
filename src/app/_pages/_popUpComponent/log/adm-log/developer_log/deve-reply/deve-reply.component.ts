import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-deve-reply',
  templateUrl: './deve-reply.component.html',
  styleUrls: ['./deve-reply.component.css']
})
export class DeveReplyComponent implements OnInit {
  rplyInput:any;
  constructor(
    private dialogref:MatDialogRef<DeveReplyComponent>,
    @Inject(MAT_DIALOG_DATA) public rplyDevData:any
  ){
    this.rplyInput = this.rplyDevData;
  }
  ngOnInit(): void {
    
  }
 closePopup(){
  console.log('Dialog is closed')
  this.dialogref.afterClosed().subscribe((result:any)=>{
    console.log('Dialog is closed',result)
  })
 }
}
