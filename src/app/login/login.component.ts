import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { faEye } from '@fortawesome/free-solid-svg-icons';
// import { faLock } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  disabledButton: boolean = true;
  password: any = '';
  correo: any = '';
  // faEye: any = faEye;
  // faLock: any = faLock;
  showEye: boolean = true;

  constructor(private _router: Router, private _authService: AuthService) {
    sessionStorage.removeItem("token");
  }

  disabledSubmit() {
    return this.password && this.correo;
  }

  login() {
    this._authService.login(this.correo, this.password).subscribe(res => {
      if (res && res.user) {
        sessionStorage.setItem("token", res.user.uid);
        this._router.navigate(['graph']);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Su usuario o contraseña son incorrectos",
        });
      }
    });
  }

  toggleEye() {
    this.showEye = !this.showEye;
  }

  register() {
    this._router.navigate(['register']);
  }
}
