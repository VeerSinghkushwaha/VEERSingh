import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatBadgeModule } from'@angular/material/badge';
import {MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatLabel } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatSnackBarModule } from '@angular/material/snack-bar'

import { DeveStatusComponent } from '../status/deve_status/deve-status/deve-status.component';
import { AddUserComponent } from '../../_user/add-user/add-user.component';
import { PopupComponent } from '../tickets/create-tkt/create-tkt.component';
import { CustodianComponent } from '../../dash_Layout/custodian/custodian.component';
import { AdminComponent } from '../../dash_Layout/admin/admin.component';
import { LayoutComponent } from '../../_layOut/layout/layout.component';
import { DeveloperComponent } from '../../dash_Layout/developer/developer.component';
import { CustomerComponent } from '../../dash_Layout/customer/customer.component';
import { CostdnReplyComponent } from '../log/adm-log/custodian_log/costdn-reply/costdn-reply.component';
import { DashCommonComponent } from '../../dash_Layout/_common/dash-common/dash-common.component';

const materialContent = [
  MatButtonModule,
  MatMenuModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatBadgeModule,
  MatIconModule,
  MatTableModule,
  MatDialogModule,
  MatToolbarModule,
  MatSelectModule,
  MatDatepickerModule,
  MatRadioModule,
  MatCheckboxModule,
  MatCardModule,
  MatAutocompleteModule,
  MatNativeDateModule,
  ReactiveFormsModule,
  MatOptionModule,
  MatTooltipModule,
  MatSnackBarModule

]

@NgModule({
  declarations: [
    PopupComponent,
    CustodianComponent,
   DeveloperComponent,
   CustomerComponent,
   CostdnReplyComponent,
   DashCommonComponent,
   AdminComponent,
   AddUserComponent,
   DeveStatusComponent

  ],
  imports: [
    CommonModule,
  materialContent,

  ],

  exports: [
  materialContent,
  MatLabel,

  ]
})

export class PopUpCompoentModule { }
