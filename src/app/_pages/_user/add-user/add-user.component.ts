import { AddUserGenericComponent } from './../../_popUpComponent/addUser_genericUpdate/add-user-generic/add-user-generic.component';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { emasterFormdata } from 'src/app/_models/emaster';
import { tenant } from 'src/app/_models/tenantData';
import { UsersData } from 'src/app/_models/user_role';
import { AddUserService } from 'src/app/_services/addUserService/add-user.service';
import { EMasterService } from 'src/app/_services/e-masterService/e-master.service';
import { TicketsService } from 'src/app/_services/ticketService/tickets.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{
  hide:boolean = true;
  tenant_data:emasterFormdata[] =[];
  userDataForm:FormGroup;
  searchForm: FormGroup;
  userDataTable:UsersData[] =[];
  Listdata:UsersData[]= [];
  displayToUserDataTable:UsersData[]=[];
  fieldNameInput:any='';
  constructor(
    //private userData:UsersData,
    //private adminService:AdminUserService,
    private gmasterService:EMasterService,
    private tktService:TicketsService,
    private userService:AddUserService,
    private fB:FormBuilder,
    private dialogref:MatDialog,
    private _snackbar:MatSnackBar,
   // @Inject(MAT_DIALOG_DATA) public username:UsersData
    ){
      this.userDataForm = this.fB.group([]);
      this.searchForm = this.fB.group([]);
      this.userDataTable = [];
      this.displayToUserDataTable= this.userDataTable;
      this. tenant_data=[];


    }


  Registration(id:any){


 if(this.userDataForm.valid){
  console.warn(this.userDataForm.value)
 }
  }
  //reset the form
  resetForm(id:any){
    this.userDataForm.reset(id)
  }

  ngOnInit(): void {
    this.userDataForm = this.fB.group({
      roleName:['', Validators.required],
      role:['', Validators.required],
      loginId:['', Validators.required],
      tenantId:['',{ value: '', disabled: true }, Validators.required],
      password:['', Validators.required],
      isActive:['', Validators.required],

    }  );

    this.searchForm = this.fB.group({
      role: ['', Validators.required],
      userName: ['', Validators.required]
    });


 this.getTenantData();

 // Subscribe to changes in head_name to update the disabled status of formId
 this.userDataForm.get('role')?.valueChanges.subscribe((value) => {
  const formIdControl = this.userDataForm.get('tenantId');

  // if (formIdControl){
  //       if (value === 'Customer') {
  //         formIdControl.enable();
  //       }
  //       else {
  //         formIdControl.disable();
  //       }
  //     }
    });

    this.onRoleChange();
    this.searchBox();

  }
  onRoleChange() {
    this.userDataForm.get('role')!.valueChanges.subscribe(role => {
      if (role === 'Customer') {
        this.userDataForm.get('tenantId')!.enable();
      } else {
        this.userDataForm.get('tenantId')!.disable();
      }
    });
  }

  save(){
      if(this.userDataForm.valid){
        this.userService.addUser(this.userDataForm.value).subscribe((res)=>{
          this.snackBar();
        });
     }else{
      this.userDataForm.markAllAsTouched();
     }
  }
  reset(){
  this.userDataForm.reset();
  }
  // get tenant id and  name
   getTenantData(){
    this.gmasterService.getAllGmaster().subscribe((res:any)=>{

      const filterTenant = res.filter((tenant:any)=>{
        return tenant.head_name ==='tenantdata'&& tenant.head_name !== undefined;
      });
      this.tenant_data = filterTenant;
      console.log(res);

    });
   }

       //snackbar and toasting
       snackBar(){
        const config = new MatSnackBarConfig();
        config.panelClass=[];
        config.horizontalPosition = 'end';
        config.verticalPosition = 'top';
        config.duration = 2000;
        this._snackbar.open("Successfully","Submitted",config)
       }

       listdata:any;
       // search box
       searchBox(){
        if(this.searchForm.valid){


        const getUserName= this.searchForm.get('role')?.value;
        const getSearchBox=this.searchForm.get('userName')?.value;
        this.userService.getUsersById(getUserName).subscribe((res:any)=>{
          //this.Listdata=res;
          const listDeveloper = res.find((deve:any)=>{
           return deve.role==getUserName && deve.roleName==getSearchBox
          });
          if(listDeveloper){
            this.Listdata = [listDeveloper];
          }else{
            alert("Data not found")
          }


        })

       }else{
        this.searchForm.markAllAsTouched();
       }
      }
      // update Popup
      updateUser(rolename:any){
        this.dialogref.open(AddUserGenericComponent,{
          width:"50%",
          height:"50%",
          data: this.Listdata


        })

      }
  }





