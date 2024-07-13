import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gmaster-form',
  templateUrl: './gmaster-form.component.html',
  styleUrls: ['./gmaster-form.component.css']
})
export class GmasterFormComponent implements OnInit {

  constructor(
   @Inject(MAT_DIALOG_DATA) public Gmasterdata:any
  ){

  }

  ngOnInit(): void {
    console.log(this.Gmasterdata)
  }
}
