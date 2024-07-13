import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-devel-desc',
  templateUrl: './devel-desc.component.html',
  styleUrls: ['./devel-desc.component.css']
})
export class DevelDescComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public desc:any){

  }
  ngOnInit(): void {
    console.log(this.desc)
  }
}
