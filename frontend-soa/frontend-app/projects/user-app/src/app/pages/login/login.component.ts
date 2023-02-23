import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";

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

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {}

  isDisabled() {
    return this.email.hasError('required') ||
      this.email.hasError('email') ||
      this.password.hasError('required') ||
      this.password.hasError('minlength');
  }

  onLogin() {
    let emailValue = this.email.value;
    let passwordValue = this.password.value;
    if(emailValue !== null && passwordValue !== null) {
      this.userService.login(emailValue, passwordValue).subscribe(token => {
        console.log('Token', token);
        if(token !== null) {
          localStorage.setItem('token', JSON.stringify(token));
          this.router.navigate(['/']);
        }
      });
    }
  }
}
