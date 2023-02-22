import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  firstname = new FormControl('', Validators.compose([Validators.required]));
  lastname = new FormControl('', Validators.compose([Validators.required]));
  email = new FormControl('', Validators.compose([Validators.required, Validators.email]));
  passwordMinLength: number = 6;
  password = new FormControl('', Validators.compose([Validators.required, Validators.minLength(this.passwordMinLength)]));
  confPassword = new FormControl('', Validators.compose([Validators.required, Validators.minLength(this.passwordMinLength)]));
  hide1: boolean = true;
  hide2: boolean = true;
  notMatch: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.password.valueChanges.subscribe(_ => this.changePassword());
    this.confPassword.valueChanges.subscribe(_ => this.changePassword());
  }

  isDisabled() {
    return this.firstname.hasError('required') ||
      this.lastname.hasError('required') ||
      this.email.hasError('required') ||
      this.email.hasError('email') ||
      this.password.hasError('required') ||
      this.password.hasError('minlength') ||
      this.confPassword.hasError('required') ||
      this.confPassword.hasError('minlength') ||
      this.notMatch;
  }

  onRegister() {
    // TODO register request
    let firstnameValue = this.firstname.value;
    let lastnameValue = this.lastname.value;
    let emailValue = this.email.value;
    let passwordValue = this.password.value;
    console.log(`${firstnameValue} ${lastnameValue} ${emailValue} ${passwordValue}`);
  }

  changePassword() {
    this.notMatch = (!this.password.hasError('required') ||
      !this.password.hasError('minlength')) &&
      (!this.confPassword.hasError('required') ||
      !this.confPassword.hasError('minlength')) &&
      this.password.value !== this.confPassword.value;
    console.log('after change password');
    console.log(this.notMatch);
  }

}
