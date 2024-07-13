import { UserStatusService } from 'src/app/_services/user_status_Service/user-status.service';
import { UserOnlineComponent } from './../../_popUpComponent/UserStatus/user-online/user-online.component';
import { UserProfileComponent } from './../../UserProfile/user-profile/user-profile.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Component, Output, EventEmitter, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/loginService/auth.service';
import { AddUserService } from 'src/app/_services/addUserService/add-user.service';
import { UsersData } from 'src/app/_models/user_role';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() SidNavbarToggled = new EventEmitter<boolean>();
  @Output() logOutfun = new EventEmitter<any>();
  //@Input() username ='';
  username: string = '';
  menuStatus: boolean = false;
  logout: boolean = false;
  UserShowbutton: boolean = false;
  showName: String = '';
  userNameData: UsersData[] = [];
  constructor(
    private router: Router,
    private authservice: AuthService,
    private userService: AddUserService,
    private _dialog: MatDialog,
    private logoutService: UserStatusService
  ) {}

  SidNavbarToggle() {
    this.menuStatus = !this.menuStatus;
    this.SidNavbarToggled.emit(this.menuStatus);
  }

  ngOnInit(): void {
    this.showName = this.authservice.getUserRole();
    this.username = this.authservice.getAllRole();
    console.log(this.showName);
    this.userProfiledata();
    this.UserShow();
  }

  // userFrofile
  userProfile(name: any) {
    const dialogRef = this._dialog.open(UserProfileComponent, {
      width: '45%',
      height: '50%',
      //feeding the data into the popup form
      data: this.userNameData,
      /* your data here */
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // Handle the result here
    });
  }

  logOut() {
    this.router.navigate(['/login']);
    const roleName = sessionStorage.getItem('roleName');

    this.logoutService.deleteResource(roleName || '').subscribe((res: any) => {
      alert('444');
      console.log(res, '4444555');
    });
    sessionStorage.clear();
    this.logout = !this.logout;
    this.logOutfun.emit(this.logout);
  }

  userProfiledata() {
    const roleName = sessionStorage.getItem('roleName');
    console.log(roleName, 'headerr');
    if (roleName) {
      this.userService.getUsers().subscribe((res: any) => {
        const userFilter = res.find((user: any) => {
          return user.roleName == roleName;
        });
        this.userNameData = userFilter;
      });
    }
  }
  // User is online or not i.e online userlist
  UserOnline() {
    this._dialog.open(UserOnlineComponent, {
      width: '50%',
      height: '75%',
    });
  }
  // usershow for Admin and Custodian
  UserShow(): void {
    const showUser = sessionStorage.getItem('role');
    // strict comparison "Custodian" and "Admin"

    if (showUser === '"Custodian"' || showUser === '"Admin"') {
      this.UserShowbutton = true;
    } else {
      this.UserShowbutton = false;
    }
  }
}
