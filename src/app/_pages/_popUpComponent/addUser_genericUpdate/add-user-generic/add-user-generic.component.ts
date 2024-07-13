import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-user-generic',
  templateUrl: './add-user-generic.component.html',
  styleUrls: ['./add-user-generic.component.css']
})
export class AddUserGenericComponent implements OnInit{
  constructor(
    private _dialogRef:MatDialogRef<AddUserGenericComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any){}
ngOnInit():void{
  console.log(this.data)
}
}
