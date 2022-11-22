import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { combineLatest, filter, tap } from 'rxjs'

import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-home',
  template: `
    <div
      *ngIf="(authService.authStatus$ | async)?.isAuthenticated; else doLogin"
      fxLayout="column"
      fxLayoutAlign="center"
      class="no-margin"
    >
      <picture class="landing-image">
        <source
          media="(min-width:0px)"
          srcset="
            https://res.cloudinary.com/dctvhclrx/image/upload/v1668769751/Stok_1_-2_p8t5gs.png
          "
        />
        <img mat-card-image src="" alt="STOK DIRECT" />
      </picture>
    </div>
    <ng-template #doLogin>
      <app-login></app-login>
    </ng-template>
  `,
  styles: [
    `
      .mat-card-image {
        width: 100%;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  displayLogin = true
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.authService.login('manager@test.com', '12345678')

    combineLatest([this.authService.authStatus$, this.authService.currentUser$])
      .pipe(
        filter(([authStatus, user]) => authStatus.isAuthenticated && user?._id !== ''),
        tap(([authStatus, user]) => {
          this.router.navigate(['/manager'])
        })
      )
      .subscribe()
  }
}
