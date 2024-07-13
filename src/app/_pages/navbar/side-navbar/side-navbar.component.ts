import { Component, OnInit,Output,Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/loginService/auth.service';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {
  @Input() SidNavbarStatus:boolean = false;
  // @Output() logOutfun = new EventEmitter<any>;
   logout:boolean = false;
   role: string = '';
  
 constructor(private router:Router,
  private authservice:AuthService){
  //this.authservice.getUserRole();
 }
 items:any =[];

 ngOnInit(): void {
// get role from the database
this.role = this.authservice.getUserRole();
 this.updateItemsBasedOnRole();
 }

 updateItemsBasedOnRole() {

  if (this.role == 'Admin') {
    this.items = [
      { number: 1, path: 'admin', icon: 'fa-solid fa-dashboard' },
      { number: 2, path: 'add-user', icon: 'fa-solid fa-users' },
      { number: 6, path: 'about', icon: 'fa-solid fa-info-circle' },
      { number: 7, path: 'settings', icon: 'fa-solid fa-gear' },
      {number:8, path:'genericMaster', icon:'fa-solid fa-database'}
    ];

  } else if (this.role == 'Customer') {
    this.items = [
      { number: 5, path: 'customer', icon: 'fa-solid fa-solid fa-dashboard' },
      { number: 6, path: 'about', icon: 'fa-solid fa-info-circle' },
      { number: 7, path: 'settings', icon: 'fa-solid fa-gear' }
    ];

  } else if (this.role == 'Developer') {
    this.items = [
      { number: 4, path: 'developer', icon: ' fa-brands fa-solid fa-dashboard' },
      { number: 6, path: 'about', icon: 'fa-solid fa-info-circle' },
      { number: 7, path: 'settings', icon: 'fa-solid fa-gear' }
    ];
    
  } else if (this.role == 'Custodian') {
    this.items = [
      { number: 3, path: 'custodian', icon: 'fa-solid fa-solid fa-dashboard' },
      { number: 2, path: 'add-user', icon: 'fa-solid fa-users' },
      { number: 6, path: 'about', icon: 'fa-solid fa-info-circle' },
      { number: 7, path: 'settings', icon: 'fa-solid fa-gear' },
      {number:8, path:'genericMaster',icon:'fa-solid fa-database'}
    ];
  }
}

 logOut(){
  sessionStorage.clear();
  this.router.navigate(['/login']);
 };

}
