import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatDividerModule } from '@angular/material/divider'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatMenuModule } from '@angular/material/menu'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../common/shared.module'
import { EmptyCartGuard } from './empty-cart.guard'
import { CodesComponent } from './pages/codes/codes.component'
import { EmptyComponent } from './pages/empty/empty.component'
import { SummaryComponent } from './pages/summary/summary.component'

@NgModule({
  declarations: [SummaryComponent, CodesComponent, EmptyComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        canActivate: [EmptyCartGuard],
        children: [
          { path: 'cart', component: SummaryComponent },
          { path: 'codes', component: CodesComponent },
        ],
      },
      { path: 'empty', component: EmptyComponent },
    ]),
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class CartModule {}
