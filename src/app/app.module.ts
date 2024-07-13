import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { PopUpCompoentModule } from './_pages/_popUpComponent/-pop-up-Module/-pop-up-compoent.module';'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AdmLogComponent } from './_pages/_popUpComponent/log/adm-log/adm-log.component';
import { AdmActionComponent } from './_pages/_popUpComponent/action_box/adm-action/adm-action.component';
import { LoginComponent } from './_pages/loginSystem/login/login.component';
import { LayoutComponent } from './_pages/_layOut/layout/layout.component';
import { PageNotFoundComponent } from './_pages/pageNotFound/page-not-found/page-not-found.component';
import { HeaderComponent } from './_pages/navbar/header/header.component';
import { SideNavbarComponent } from './_pages/navbar/side-navbar/side-navbar.component'
import { PopUpCompoentModule } from './_pages/_popUpComponent/-pop-up-Module/-pop-up-compoent.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './_pages/dash_Layout/_common/about/about.component';
import { SettingsComponent } from './_pages/dash_Layout/_common/settings/settings.component';
import { DatePipe } from '@angular/common';
import { AddUserComponent } from './_pages/_user/add-user/add-user.component';

import { DashCommonComponent } from './_pages/dash_Layout/_common/dash-common/dash-common.component';
import { DeveLogComponent } from './_pages/_popUpComponent/log/adm-log/developer_log/deve-log/deve-log.component';
import { DeveReplyComponent } from './_pages/_popUpComponent/log/adm-log/developer_log/deve-reply/deve-reply.component';
import { CustmrLogComponent } from './_pages/_popUpComponent/log/adm-log/customer_log/custmr-log/custmr-log.component';
import { CustmrReplyComponent } from './_pages/_popUpComponent/log/adm-log/customer_log/custmr-reply/custmr-reply.component';
import { CustdnLogComponent } from './_pages/_popUpComponent/log/adm-log/custodian_log/custdn-log/custdn-log.component';
import { DeveMessageComponent } from './_pages/_popUpComponent/message_part/deve-message/deve-message.component';
import { TktLogComponent } from './_pages/_popUpComponent/ticket_log/tkt-log/tkt-log.component';
import { CustmrTktComponent } from './_pages/_popUpComponent/custmr_tkt/custmr-tkt/custmr-tkt.component';
import { AuthService } from './_services/loginService/auth.service';
import { TicketsService } from './_services/ticketService/tickets.service';
import { DeveRemarkComponent } from './_pages/_popUpComponent/remarks/deve_remark/deve-remark/deve-remark.component';
import { DevelDescComponent } from './_pages/_popUpComponent/descriptions/devel-desc/devel-desc.component';
import { EMasterComponent } from './_pages/dash_Layout/_common/generic-e-master/e-master/e-master.component';
import { GmasterFormComponent } from './_pages/_popUpComponent/generic_master-form/gmaster-form/gmaster-form.component';
import { AddUserGenericComponent } from './_pages/_popUpComponent/addUser_genericUpdate/add-user-generic/add-user-generic.component';
import { UserProfileComponent } from './_pages/UserProfile/user-profile/user-profile.component';
import { UserOnlineComponent } from './_pages/_popUpComponent/UserStatus/user-online/user-online.component';



@NgModule({
  declarations: [
    AppComponent,
    AdmLogComponent,
    AdmActionComponent,
    LoginComponent,
    LayoutComponent,
    PageNotFoundComponent,
    HeaderComponent,
    SideNavbarComponent,
    AboutComponent,
    SettingsComponent,
   // AddUserComponent,
   
    DeveLogComponent,
    DeveReplyComponent,
    CustmrLogComponent,
    CustmrReplyComponent,
    CustdnLogComponent,
    DeveMessageComponent,
    TktLogComponent,
    CustmrTktComponent,
    DeveRemarkComponent,
    DevelDescComponent,
    EMasterComponent,
    GmasterFormComponent,
    AddUserGenericComponent,
    UserProfileComponent,
    UserOnlineComponent,
   
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    
    PopUpCompoentModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
   
  ],
  providers: [
    DatePipe,
    AuthService,
    TicketsService
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
