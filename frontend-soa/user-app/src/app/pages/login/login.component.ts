import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', Validators.compose([Validators.required, Validators.email]));
  passwordMinLength: number = 6;
  password = new FormControl('', Validators.compose([Validators.required, Validators.minLength(this.passwordMinLength)]));
  hide: boolean = true;

  constructor() {}

  ngOnInit(): void {
  }

  isDisabled() {
    return this.email.hasError('required') ||
      this.email.hasError('email') ||
      this.password.hasError('required') ||
      this.password.hasError('minlength');
  }

  onLogin() {
    // TODO login request
    let emailValue = this.email.value;
    let passwordValue = this.password.value;
  }
}
