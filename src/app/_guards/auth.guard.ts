import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../_services/loginService/auth.service';

export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {

  let _router =inject(Router);
  
  const loginService = inject(AuthService);
  const passwordToken = sessionStorage.getItem('password');
  const roleToken = sessionStorage.getItem('roleName');
  const roleType = sessionStorage.getItem('role');


   
    //console.log(loginService)
    if( roleToken && passwordToken && roleType){

      return true;
    }else{
      _router.navigate(['/login'])
      alert('You are InCorrect')
      return false
    }


  
};
