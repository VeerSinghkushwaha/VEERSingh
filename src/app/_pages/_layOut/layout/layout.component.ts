import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/loginService/auth.service';
import { StorageService } from 'src/app/_services/storage_service/storage.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  SidNavbarStatus:boolean = false;

  private roles:string[]=[];
   isLoggedIn:boolean = true;
   showAdmin:boolean = false;
   showCustodian:boolean = false;
   showDeveloper:boolean = false;
   showCustomer:boolean = false;
   showUser:boolean = false;
   userName:string='VeerSingh';
   constructor(
     private storageService:StorageService,
     private authService:AuthService,
     private router:Router ){}
 
   ngOnInit(): void {
     this.isLoggedIn = this.storageService.isLoggedIn();
     if(this.isLoggedIn){
   const user = this.storageService.getUser();
   if(user && user.roles){
     this.roles = user.roles;
     this.showAdmin = this.roles.includes('ROLE_ADMIN');
     this.showCustodian = this.roles.includes('ROLE_CUSTODIAN');
     this.showCustomer = this.roles.includes('ROLE_CUSTOMER');
     this.showDeveloper = this.roles.includes('ROLE_DEVELOPER');
     this.userName = user.userName
 
   }
 
     }
   }
 
   logOut(){
 
 
     this.authService.logout().subscribe((res)=>{
      console.log(res);
       if(res){
         this.storageService.clean();
        //user window.location.reload();
         this.router.navigate(['/login']);
       }else{
         alert("error")
       }
 
     })
   }
 

}
