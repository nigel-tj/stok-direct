import { HttpHeaders } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'

import { EmailValidation, RequiredTextValidation } from '../common/validations'
import { UserService } from '../user/user/user.service'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup

  constructor(private userService: UserService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildRegistrationForm()
  }

  buildRegistrationForm() {
    this.registrationForm = this.formBuilder.group({
      email: ['', EmailValidation],
      full_name: ['', RequiredTextValidation],
    })
  }

  register(submittedForm: FormGroup) {
    this.userService.registerNewUser(
      submittedForm.value.full_name,
      submittedForm.value.email
    )
  }
}
