import { MatSnackBar,MatSnackBarConfig } from '@angular/material/snack-bar';
import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
//import { ChangeDetectorRef } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { TicketsData } from 'src/app/_models/TicketData';

import { DomSanitizer } from '@angular/platform-browser';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { TicketsService } from 'src/app/_services/ticketService/tickets.service';
import { TktLogComponent } from '../../ticket_log/tkt-log/tkt-log.component';
import { StorageService } from 'src/app/_services/storage_service/storage.service';
import { imageData } from 'src/app/_models/imgdata';
import { formData } from 'src/app/_models/formIdData';
import { tenant } from 'src/app/_models/tenantData';
import { EMasterService } from 'src/app/_services/e-masterService/e-master.service';
import { emasterFormdata } from 'src/app/_models/emaster';

@Component({
  selector: 'app-creatkt',
  templateUrl: './create-tkt.component.html',
  styleUrls: ['./create-tkt.component.css'],
})
export class PopupComponent implements OnInit {
  ticketForm: FormGroup;
  ticketFile: FormGroup;
  Priorities:emasterFormdata[]= [];
  DeveloperList:emasterFormdata[] =[];
  statusOptions:emasterFormdata[] =[];
  Categories:emasterFormdata[]=[];
  tenantFilterOption: emasterFormdata[] = [];
  statusFilterOption: emasterFormdata[] = [];
  formidFilterOption:emasterFormdata[] =[];

  @ViewChild('fileInput') fileInput: any;

  TodayDate ="2022/02/22";
  // get current date and time
  getDate_time(): string {
    return new Date().toISOString();
  }
  // for the automatic fill the tktNo
  serialNumber:number = 1;
  //image data
  selectedFile: File | null = null;
  imageBox: imageData[] = [];

  ticketDataTable: TicketsData[] = [];
  displayToticketDataTable: TicketsData[] = [];
  inputData: any;
  editData: any;
  form_id_no: formData[] = [];
  tenant_data: tenant[] = [];

  imageUrl: string = 'http://localhost:3000/imageData/imagefile';
  //ticket option form and container



  constructor(
 private gmasterService:EMasterService,
    private datepipe: DatePipe,
    private formBuilder: FormBuilder,
    private service: TicketsService,
    private loImgService: StorageService,
    private http: HttpClient,
    private _dialog: MatDialog,
    private _snackbar:MatSnackBar,
    private dialogref: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public imgdata:any
  ) {
    this.Priorities = [];

    this.inputData = this.data;
    this.imageBox = this.imageBox;
     this.serialNumber;
    this.ticketFile = formBuilder.group({
      imgfile: ['', Validators.required],
      tkt_No: [this.serialNumber, Validators.required],
    });

    // this.ticketForm = formBuilder.group({
    //   tkt_No: ['', Validators.required],
    //   tkt_Priority: ['33', Validators.required],
    //   tkt_Date: [this.getCurrentDate(), Validators.required],
    //   tkt_FormId: ['1849', Validators.required],
    //   tkt_TenantId: ['', Validators.required],
    //   tkt_Status: ['', Validators.required],
    //   tkt_Problem: ['New Form', Validators.required],
    //   tkt_ReleaseId: [''],
    //   tkt_ResolutionId: [''],
    //   tkt_Desc: ['', Validators.required],
    //   tkt_Assign: ['None', Validators.required],
    //   OS: ['', Validators.required],
    // });

    this.ticketForm = new FormGroup({
      tkt_No: new FormControl('',[ Validators.required]),
        tkt_Priority:new FormControl('33',[ Validators.required]),
        tkt_Date:new FormControl(this.getCurrentDate(),[ Validators.required]),
        tkt_FormId: new FormControl('',[ Validators.required]),
        tkt_TenantId: new FormControl('',[ Validators.required]),
        tkt_Status: new FormControl('',[ Validators.required]),
        tkt_Problem: new FormControl('New Form', [Validators.required]),
        tkt_ReleaseId: new FormControl('',[Validators.required]),
        tkt_ResolutionId: new FormControl('',[Validators.required]),
        tkt_Desc:new FormControl('',[Validators.required]),
        tkt_Assign: new FormControl('None',[ Validators.required]),
        OS:new FormControl( '',[ Validators.required])
    })

    this.ticketDataTable = [];
    this.displayToticketDataTable = this.ticketDataTable;
    console.log(
      'transfer Data',
      (this.inputData = this.data),
      this.setPopupData(this.inputData)
    );
    // Intialize the array
    this.form_id_no = [];
    this.tenant_data = [];
  }

// get and set method to use the anywhere
get tkt_No(){
  return this.ticketForm.get('tkt_No')
}
get tkt_Priority(){
  return this.ticketForm.get('tkt_Priority')
}
get tkt_Date(){
  return this.ticketForm.get('tkt_Date')
}
get tkt_FormId(){
  return this.ticketForm.get('tkt_FormId')
}
get tkt_Tenant(){
  return this.ticketForm.get('tkt_TenantId')
}
get tkt_Status(){
  return this.ticketForm.get('tkt_Status')
}
get tkt_Problem(){
  return this.ticketForm.get('tkt_Problem')
}
get tkt_ReleaseId(){
  return this.ticketForm.get('tkt_ReleaseId')
}
  // get currect date in form
  getCurrentDate(): string {
    return this.datepipe.transform(new Date(), 'tkt_Date')!;
  }

  //Logs Modals Modal button which is used modal service
  openModallog() {
    //this.modalservice.openModallogs();
  }
  close(): void {
    //this.modalservice.close()
  }
  ngOnInit(): void {
    this.Gmasterdata();
    this.ticketFile = this.formBuilder.group({
      imgfile: this.formBuilder.control(''),
      tkt_No: this.formBuilder.control(''),
    });
    //this used for the patching value in ticketForm

    this.ticketForm = this.formBuilder.group({
      tkt_No:'',
      tkt_TenantId: '',
      tkt_FormId: '',
      tkt_Desc: '',
      tkt_Status: 'Pending',
      tkt_ReleaseId: '',
      tkt_ResolutionId: '',
      tkt_Priority: '33',
      tkt_Problem: 'New Form',
      tkt_Date: 'yyyy-mm-dd',
      tkt_Assign: 'None',
      OS: 'IND - GOFLEET - DESKTOP',
    });
    this.service.getTicket().subscribe((res) => {
      console.log(res.length);
    //  this.serialNumber += res.length;
      this.ticketDataTable = res;
    });
    //patching data

    this.inputData = this.data;
    if (this.inputData.code >0) {
      this.setPopupData(this.inputData);
    }
    console.log("transfer Data",this.data,this.inputData)
    this.setPopupData(this.data);

    //recall the getFormid
    this.getFormId();
    // update the date
      //this.updateDate();
    // it is used the changeDetectorRef for the recall the method
    this.getSerialnumber();

  }
  // this setpopupData is used the fill the data in popup form
  setPopupData(id: any) {
    this.service.getTicketById(id).subscribe((item) => {
      this.editData = item;
      if (this.editData.title === 'Edit Ticket') {
        const editData = this.data.editData;
        this.ticketForm.setValue({
          // Add other form controls as needed
        });

      };
    });
    this.ticketForm.patchValue(this.data);
    console.log(this.data.tkt_FormId,
      this.inputData.title,'44445555',
      this.data.tkt_FormId,
      this.tkt_Date);

    // image file data
    this.loImgService.getimgData(id).subscribe((img: any) => {
      this.imageBox = img;
      this.ticketFile.get('tkt_No')?.setValue(id.tkt_No);

    });
    this.ticketFile.patchValue(this.imgdata);
  }

  // Submitted the form logic
  submitTickets() {
    if (this.ticketForm.valid) {
      if (this.data._id) {
        const id = this.data._id;
        this.service.updateTicket(id, this.ticketForm.value).subscribe({
          next: (val: any) => {
            alert('Ticket Updated Successfully');
            this.dialogref.close(true);
          },
          error: (err: any) => {
            //alert(err);
          },
        });
      } else {
        if (this.ticketForm.valid) {
          this.service
            .createTicket(this.ticketForm.value)
            .subscribe((res: any) => {
              this.ticketDataTable.unshift(res);
              this.dialogref.close(true);
            //  this.closePopup();
              //this.dialogref.close(true);
            });
            this. snackBar();
            //alert('Successfully Submitted');
          this.clearForm();

          // Image file uploaded method

          this.loImgService
            .sendImg(this.ticketFile.value)
            .subscribe((res: any) => {
              this.imageBox = res;
              console.log(res,"imgebox");
            });
        }
      }
    } else {
      this.ticketForm.markAllAsTouched();
    }
  }
  //this function is for the reset the form after the sibmit the form
  clearForm() {
    this.ticketForm.reset();
  }
  ResetForm() {
    this.ticketForm.reset();
  }

  // img uploaded function
  urls: string[] = ['./assets/img1.jpg'];

  onFileSelected(e: any) {
    if (e.target.files) {
      const files = e.target.files;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = (event: any) => {
          // Check file type
          const fileType = file.type;
          if (fileType.startsWith('image')) {
            // Image file
            this.urls.push(event.target.result);
          } else {
            // Other file types
            // Handle other file types as needed
          }
        };

        // Read file as data URL
        reader.readAsDataURL(file);
      }
    }
  };

  UploadImage(event: any) {};

  closePopup() {
    if (this.ticketForm.valid) {
      this.dialogref.close(this.ticketForm.value);
    }
    this.dialogref.close('closed using the popup');
  };

  //filter the row and column tenantId
  // statusOptions = [
  //   'Pending',
  //   'Resolved',
  //   'Closed',
  //   'Schedule',
  //   'Working',
  //   'Hold',
  //   'Details Required',
  //   'Hold By Client',
  //   'Rejected By Sanjay Sir',
  //   'Released Awaited',
  //   'Urgent',
  //   'Level 3',
  //   'API Release',
  //   'Duplicated',
  //   'Clarified',
  //   'Document Awaited',
  //   'Approvel Awaited Client ',
  // ];



  ProductList = [
    'IND - GOFLEET - DESKTOP',
    'IND - GOFLEET - MOBILE',
    'AFC - GOFLEET - DESKTOP',
  ];


  // get form id no and name from the database
  getFormId() {
    this.service.getFormId().subscribe({
      next: (res: any) => {
        const filterformid = res.filter((formdid: any) => {
          return formdid.FormName !== undefined && formdid.FormName !== null;
        });

        this.form_id_no = filterformid.sort((a: any, b: any) =>
          a.FormName.localeCompare(b.FormName)
        );

      },
      error: (error: any) => {
        console.error('Error fetching form IDs:', error);
        // Handle error, e.g., show an error message to the user
      },
    });
  };

// date update ticket for
updateDate() {
  this.ticketForm.get('tkt_Date')?.patchValue(this.getCurrentDate());
};
getSerialnumber(){
  return this.service.getTicket().subscribe((serial)=>{
    this.serialNumber += serial.length;
    // fill the this.serial number in the form group
    this.ticketFile = this.formBuilder.group({
      imgfile: this.formBuilder.control(''),
      tkt_No: this.formBuilder.control(this.serialNumber),
    });
  });
};

  openticktlog(id: any) {
    this._dialog.open(TktLogComponent, {
      width: '80%',
      height: '50%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '400ms',
      data: {
        id,
      },
    });
  };
  //Generic master data comming from the database
   Gmasterdata(){
    this.gmasterService.getAllGmaster().subscribe({next:(response:any)=>{
      console.log(response)
      // priority list
      const filterPriority = response.filter((priority:any)=>{
        return priority.head_name !== undefined && priority.head_name == 'priority';
      });
      this.Priorities = filterPriority;

        // developer list
        const filterDeveloper = response.filter((developer:any)=>{
          return developer.head_name !== undefined && developer.head_name == 'assign';
        });
        //get ascending order alphaber order
        const alphabetOrder = filterDeveloper.sort((a:any, b:any) => {
          const nameA = (a.tkt_abbr_name || '').toLowerCase();
          const nameB = (b.tkt_abbr_name || '').toLowerCase();
          return nameA.localeCompare(nameB);
        });
        this.DeveloperList = alphabetOrder;

        // Status pending
        const filterStatus = response.filter((status:any)=>{
           return status.head_name !==undefined && status.head_name == 'status';
        });
        this.statusOptions = filterStatus;

        // Categories list
         const filterCategory = response.filter((category:any)=>{
          return category.head_name !==undefined && category.head_name == 'category';
         });
         this.Categories = filterCategory;

         // Tenantdata or Client Name

         const filterTenant = response.filter((tenant:any)=>{
          return tenant.head_name !==undefined && tenant.head_name == 'tenantdata';
         });
         //sorting the data in alphabet order
        const sortinTenant = filterTenant.sort((a:any, b:any) => {
          const nameA = (a.tkt_abbr_name || '').toLowerCase();
          const nameB = (b.tkt_abbr_name || '').toLowerCase();
          return nameA.localeCompare(nameB);
        });
         this.tenantFilterOption =  sortinTenant;

          // Formid and name

          const filterformid = response.filter((formid:any)=>{
            return formid.head_name !==undefined && formid.head_name == 'formiddata';
           });
           this.formidFilterOption = filterformid;
    }

   });
   }
   // snackbar or toasting
   snackBar(){
    const config = new MatSnackBarConfig();
    config.panelClass = ['custom-snackbar'];
    config.horizontalPosition = 'center';
    config.verticalPosition = 'top';
    config.duration = 2000;
    this._snackbar.open("Successfully","Submitted",config)
   }
}
