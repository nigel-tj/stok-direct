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
    >
      <div class="mat-display-1">Providing more value for your stock</div>
      <div class="mat-display-3">Welcome to StokDirect</div>
      <div class="mat-display-2">Online Buying Group</div>
    </div>
    <ng-template #doLogin>
      <app-login></app-login>
    </ng-template>
  `,
  styles: [
    `
      div[fxLayout] {
        margin-top: 32px;
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
