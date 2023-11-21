import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  disabledButton: boolean = true;
  password: any = '';
  name: any = '';

  disabledSubmit() {
    return this.password.length > 5 && this.name.length > 5;
  }

  login() {
    console.log('enter');
  }
}
