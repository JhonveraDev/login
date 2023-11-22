import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  disabledButton: boolean = true;
  password: any = '';
  name: any = '';
  faEye: any = faEye;
  faLock: any = faLock;
  showEye: boolean = true;
  fakeName = 'Anderson';
  fakePassword = 'Hola123!';

  constructor(private _router: Router) {
    sessionStorage.removeItem("token");
  }

  disabledSubmit() {
    return this.password.length > 5 && this.name.length > 5;
  }

  login() {
    if (this.name === this.fakeName && this.password === this.fakePassword) {
      sessionStorage.setItem("token", "true"); 
      this._router.navigate(['graph']);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Your password or name are incorrect!",
      });
    }
  }

  toggleEye() {
    this.showEye = !this.showEye;
  }
}
