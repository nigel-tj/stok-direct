import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { NgxMaskModule } from 'ngx-mask'

import { AppMaterialModule } from '../app-material.module'
import { AuthGuard } from '../auth/auth-guard.service'
import { FieldErrorModule } from '../user-controls/field-error/field-error/field-error.module'
import { LogoutComponent } from './logout/logout.component'
import { NameInputComponent } from './name-input/name-input.component'
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component'
import { ProfileComponent } from './profile/profile.component'
import { UserMaterialModule } from './user-material.module'
import { UserRoutingModule } from './user-routing.module'
import { ViewUserComponent } from './view-user/view-user.component'

@NgModule({
  declarations: [
    ProfileComponent,
    LogoutComponent,
    NameInputComponent,
    ViewUserComponent,
    NavigationMenuComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    AppMaterialModule,
    UserMaterialModule,
    ReactiveFormsModule,
    FieldErrorModule,
    NgxMaskModule.forChild(),
  ],
})
export class UserModule {}
