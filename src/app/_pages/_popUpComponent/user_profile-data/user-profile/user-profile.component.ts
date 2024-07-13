import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
constructor(
  private dialogRef:MatDialogConfig<UserProfileComponent>,
 // private dialogref:MatDialogRef<DeveRemarkComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any

){}
ngOnInit():void{
  console.log(this.data,"99999999")
  console.log(this.data,"99999999")
  console.log(this.data,"99999999")
}
}
