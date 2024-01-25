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
  showEye: boolean = true;
  loading: boolean = false;

  constructor(private _router: Router, private _authService: AuthService) {
    localStorage.removeItem("token");
  }

  login() {
    this.loading = true;
    this._authService.login(this.correo, this.password).subscribe(res => {
      if (res && !res.user.multiFactor.user.emailVerified) {
        this.showModal('error', 'Oops...', 'El email no ha sido verificado');
      }else {
        localStorage.setItem("token", res.user.uid);
        this._authService.writeDataById(localStorage.getItem("token")).subscribe(response => {
          if (response.login) {
            this.loading = false;
            this._router.navigate(['graph']);
          }
        });
      }
    },
    (error) => {
      this.loading = false;
      this.showModal('error', 'Oops...', 'Su usuario o contraseña son incorrectos');
    });
  }

  disabledSubmit() {
    return this.password && this.correo;
  }

  toggleEye() {
    this.showEye = !this.showEye;
  }

  register() {
    this._router.navigate(['register']);
  }

  showModal(icon: any, title: string, text: string) {
    Swal.fire({ icon, title, text });
  }
}
