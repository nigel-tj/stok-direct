import { TestBed } from '@angular/core/testing'
import { MediaObserver } from '@angular/flex-layout'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'
import {
  ObservablePropertyStrategy,
  autoSpyObj,
  createComponentMock,
} from 'angular-unit-test-helper'

import { AppComponent } from './app.component'
import { AuthService } from './auth/auth.service'
import {
  DomSanitizerFake,
  MatIconRegistryFake,
  MediaObserverFake,
  commonTestingModules,
  commonTestingProviders,
} from './common/common.testing'

describe('AppComponent', () => {
  beforeEach(async () => {
    const authServiceSpy = autoSpyObj(
      AuthService,
      ['authStatus$'],
      ObservablePropertyStrategy.BehaviorSubject
    )
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, commonTestingModules],
      providers: commonTestingProviders.concat([
        { provide: MediaObserver, useClass: MediaObserverFake },
        { provide: MatIconRegistry, useClass: MatIconRegistryFake },
        { provide: DomSanitizer, useClass: DomSanitizerFake },
        { provide: AuthService, useValue: authServiceSpy },
      ]),
      declarations: [AppComponent, createComponentMock('NavigationMenuComponent')],
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it(`should have as title 'stok-direct-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app.title).toEqual('stok-direct-app')
  })

  it('should render app-container', () => {
    const fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement
    expect(compiled.querySelector('.app-container')).toBeDefined()
  })
})
