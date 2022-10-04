import { ComponentFixture, TestBed } from '@angular/core/testing'
import { autoSpyObj } from 'angular-unit-test-helper'

import { AuthService } from '../auth/auth.service'
import { UiService } from '../common/ui.service'
import { HomeComponent } from './home.component'

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      //imports: [HttpClientTestingModule],
      providers: [AuthService, { provide: UiService, useValue: autoSpyObj(UiService) }],
      declarations: [HomeComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
