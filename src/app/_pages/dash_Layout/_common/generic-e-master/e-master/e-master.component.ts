import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import {
  FormBuilder,
  FormGroup,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import { get } from 'mongoose';
import { catchError, tap, throwError } from 'rxjs';
import { emasterFormdata } from 'src/app/_models/emaster';
import { DeveStatusComponent } from 'src/app/_pages/_popUpComponent/status/deve_status/deve-status/deve-status.component';
import { EMasterService } from 'src/app/_services/e-masterService/e-master.service';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { GmasterFormComponent } from 'src/app/_pages/_popUpComponent/generic_master-form/gmaster-form/gmaster-form.component';

@Component({
  selector: 'app-e-master',
  templateUrl: './e-master.component.html',
  styleUrls: ['./e-master.component.css'],
})
export class EMasterComponent implements OnInit {
  emasterForm!: FormGroup<any>;
  searchForm!: FormGroup<any>;
  isformIdDisabled: boolean = false;
  listdata: emasterFormdata[] = [];
  database: emasterFormdata[] = [];
  searchText: emasterFormdata[] = [];
  submittedForm:boolean = true;
//snackbar
horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private fb: FormBuilder,
    private emasterService: EMasterService,
    private http: HttpClient,
    private matdialog:MatDialog,
    private _snackbar:MatSnackBar
  ) {}

  ngOnInit(): void {
    // this.showGmasterData();
    this.searchForm = this.fb.group({
      baseid: [''],
      searchText: [''],
    });
    this.emasterForm = this.fb.group({
      tkt_abbr_name: ['', Validators.required],
      head_name: ['', Validators.required],
      formId: ['', { value: '', disabled: true }, Validators.required],
    });

    // Subscribe to changes in head_name to update the disabled status of formId


    this.emasterForm.get('head_name')?.valueChanges.subscribe((value) => {
      const formIdControl = this.emasterForm.get('formId');

      if (formIdControl) {
        if (value === 'formiddata') {
          formIdControl.enable();
        } else {
          formIdControl.disable();
        }
      }
    });

    // searchid form
    this.emasterForm.get('searchText')?.valueChanges.subscribe((value) => {
      const formIdControl = this.emasterForm.get('searchText');
      console.log(formIdControl, 'search form');
    });
  }

  // add the data in the generic form
  add() {
    
    if(this.emasterForm.valid){
    this.emasterService
      .sendDataToDatabase(this.emasterForm.value)
      .subscribe((response: any) => {
        this.openSnackBar();

        this.emasterForm.reset();
      });
    }else{
      this.emasterForm.markAllAsTouched();
    }
  }
  // reset the form
  ResetForm(){
    this.emasterForm.reset()
  }
  // filter the value
  filterValue(name: string, password: string) {
    const getheadName = this.searchForm.get('baseid')?.value;
    const gettktabbrname = this.searchForm.get('searchText')?.value;

    if(this.searchForm.valid){
    this.emasterService
      .getDataAndText(getheadName, gettktabbrname)
      .pipe(
        tap((data) => {}),
        // Log the response
        catchError((error) => {
          console.error('Error:', error);
          alert('Please fill correct Credentials');
          return throwError(error);
        })
      )
      .subscribe((resData) => {
        const users = resData.find((user: any) => {
          return (
            (user.head_name === getheadName &&
              user.tkt_abbr_name === gettktabbrname) ||
            (user.head_name === getheadName && user.formId === gettktabbrname)
          );
        });

        if (users) {
          this.listdata = [users];
        } else {
          alert('Invalid data');
        }
      });
    }{
      this.searchForm.markAllAsTouched();
    }
  }
  //Open th dialog box
  updateGmaster(headName:any,abbrName:any){
    this.matdialog.open(GmasterFormComponent,{
      width:'40%',
      height:'40%',
      exitAnimationDuration:'500ms',
      enterAnimationDuration:'500ms',
      data:{
        headName,
        abbrName
      }
    })
  }
  //Snackbar toasting
  durationInSecond=1;
  openSnackBar(){
 this._snackbar.open(
  'Successfull!!', 'Submitted', {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,

    duration:this.durationInSecond*1000,
  });

  }
}
