import { UserStatusService } from './../../../_services/user_status_Service/user-status.service';
import { MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBarConfig

 } from '@angular/material/snack-bar';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/_services/loginService/auth.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/_services/storage_service/storage.service';
import { tap, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

   isLoggedIn: boolean = true;
  roles: string[] = [];
  userData: any;
  responseData: any;
  // isAuthenticatedSubject: boolean = true;
  isActive: boolean = true;
  //snackbar or toasting box
  //horizontalPosition:MatSnackBarHorizontalPosition ='center';
 // verticalPosition:MatSnackBarVerticalPosition ='top';
  constructor(
    private router: Router,
    private authservice: AuthService,
    private trackService:UserStatusService,
    private fb: FormBuilder,
    private storageservice: StorageService,
    private _snackbar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      roleName: this.fb.control(''),
      password: this.fb.control(''),
      role: this.fb.control(''),
      date:this.fb.control(Date()),
      isOnline: this.fb.control(true) // Initialize with a boolean value, e.g., false
    });

    localStorage.clear();
  }

  login(): void {


    if (this.loginForm.valid) {
      const role = this.loginForm.get('role')?.value;
      const roleName = this.loginForm.get('roleName')?.value;
      const password = this.loginForm.get('password')?.value;

      //call service from the authService
      this.authservice
        .getById(roleName, password, role)
        .pipe(
          tap((data) => {

          }),
          // Log the response
          catchError((error) => {
            console.error('Error:', error);
            alert('Please fill correct Credentials');
            return throwError(error);
          })
        )
        .subscribe((resData) => {
          this.userData = resData;

          const users = this.userData.find(
            (user: any) =>{

             return user.password === password && user.role === role && user.roleName===roleName;
        });

          if (users && users.isActive) {          
            // tracking system
            console.log(this.loginForm.value)
            this.trackService.loginPost(this.loginForm.value).pipe(
              catchError((error: any) => {
                // this.snackBar.open('Login failed. Please try again.', 'Close', {
                //   duration: 3000,
                // });
                console.log('login failed try another')
                return of(null); // or you can return throwError(error) if you want to propagate the error
              })
            ).subscribe((res: any) => {
              if (res) {
                // Assuming `role`, `roleName`, `password` come from `res`
                sessionStorage.setItem('role', JSON.stringify(role));
                sessionStorage.setItem('roleName', roleName);
                sessionStorage.setItem('password', password);
                this.router.navigate(['/layout']);
                console.log('Login Successfull')
              } else {
                // Handle case when response is falsy
              
                console.log('login failed')
              }
            });
          this.resetform();
            // isActive pages when User is active
          } else {
            alert('Invalid credentials/deActive');
            this.resetform();
          }
        });
    }
  }

  ngOnInit(): void {
    // if(navigator.onLine){

    // }
    if (this.storageservice.isLoggedIn()) {
       this.isLoggedIn = true;
      this.roles = this.storageservice.getUser().roles;
    }
    // this.userData;
    //this content is used because  in the html code the easy to handle and can access this data
  }

  reloadPage() {
    window.location.reload();
  }
  resetform() {
    this.loginForm.reset();
  }
  // snackbar or toasting
  //durationInSecond = 2;
  snackBar(login:any){
    const config = new MatSnackBarConfig();
      config.panelClass = ['custom-snackbar',
      ];
    config.horizontalPosition = 'center';
    config.verticalPosition = 'top';
    config.duration = 2000;
this._snackbar.open("Successful","LoggedIn",config
);
  }

}
