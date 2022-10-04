import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-page-not-found',
  template: `
    <h1>Oops</h1>
    <p>
      This page doesn't exist. Go back to
      <a routerLink="/home">home</a>.
    </p>
  `,
  styles: [],
})
export class PageNotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
