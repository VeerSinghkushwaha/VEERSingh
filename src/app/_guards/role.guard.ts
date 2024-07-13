import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Data, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../_services/loginService/auth.service';

export const roleGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  let router = inject(Router);
  let authService = inject(AuthService);
  const requiredState:Data = state;
  const role1 = sessionStorage.getItem('role');
  const requiredRole:Data = route.data;
  const url = state.url;
  
  const role = authService.getUserRole();
 console.log(role,"Admin",requiredRole)
 console.log(state.url.startsWith('/layout/Admin'),"this is path")
 console.log("some",requiredRole,requiredState);
  if(
    (role=="Admin" && state.url.startsWith('/layout/admin')) ||
    (role==='Custodian' && state.url.startsWith('/layout/custodian'))||
    (role==='Developer' && state.url.startsWith('/layout/developer')) ||
    (role==='Customer' && state.url.startsWith('/layout/customer'))
   
  ){
    console.log(state.url.startsWith('layout/admin'))
    
    return true;
  }else{
   
    return  router.navigate(['/login']);
    
  }
 
};
