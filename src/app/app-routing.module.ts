import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './_pages/loginSystem/login/login.component';
import { PageNotFoundComponent } from './_pages/pageNotFound/page-not-found/page-not-found.component';
import { LayoutComponent } from './_pages/_layOut/layout/layout.component';
import { AdminComponent } from './_pages/dash_Layout/admin/admin.component';
import { CustodianComponent } from './_pages/dash_Layout/custodian/custodian.component';
import { DeveloperComponent } from './_pages/dash_Layout/developer/developer.component';
import { CustomerComponent } from './_pages/dash_Layout/customer/customer.component';
import { AboutComponent } from './_pages/dash_Layout/_common/about/about.component';
import { SettingsComponent } from './_pages/dash_Layout/_common/settings/settings.component';
import { authGuard } from './_guards/auth.guard';
import { roleGuard } from './_guards/role.guard';
import { AddUserComponent } from './_pages/_user/add-user/add-user.component';
import { EMasterComponent } from './_pages/dash_Layout/_common/generic-e-master/e-master/e-master.component';

const routes: Routes = [
  {
    path:'', redirectTo:'/login',pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent,
    title:'Login'
  },
  {
    path:'',
    component:LoginComponent,
    title:'Login'
    
  },
  {
    path:'layout',
    component:LayoutComponent,
    canActivate:[authGuard],
    children:[
      
      {
        path:'admin',
        component:AdminComponent,
        title:'admin/Page',
        canActivate:[authGuard, roleGuard],
        data:{
          role:"Admin"
        }
      },
      {
        path:'custodian',
        component:CustodianComponent,
        canActivate:[authGuard,roleGuard],
        data:{
          role:'Custodian'
        },
        title:'custodian/Page'
      },

      {
          path:'developer',
          component:DeveloperComponent,
          canActivate:[authGuard,roleGuard],
          data:{
            role:'Developer'
          },
          title:'developer/Page'
      },
      
      {
        path:'customer',
        component:CustomerComponent,
        canActivate:[authGuard,roleGuard],
        data:{
          role:'Customer'
        },
        title:'customer/Page'
      },

      {
        path:'about',
        component:AboutComponent,
        title:'about',
      },
      {
        path:'settings',
        component:SettingsComponent,
        title:'setting'
      },
      {
        path:'add-user',
        component:AddUserComponent,
        title:'addUser'
      },
      {
        path:'genericMaster',
        component:EMasterComponent,
        title:'Generic/Master'
      }
    ]

  },


  {
    path:'**',
    component:PageNotFoundComponent,
    title:'**'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
