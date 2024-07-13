import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  constructor(
    @Inject (MAT_DIALOG_DATA) public data:any
  ){

  }
  ngOnInit():void{
 console.log(this.data)
  }

}
