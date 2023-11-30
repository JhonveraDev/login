import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../service/auth.service';
import User from '../interfaces/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  user: User = {
    id: '',
    name: ''
  };

  constructor(private _router: Router, private _formBuilder: FormBuilder, private _authService: AuthService) { }

  registerForm = this._formBuilder.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    bornDate: ['', Validators.required],
    documentType: ['', Validators.required],
    documentNumber: ['', Validators.required],
    address: ['', Validators.required],
    email: ['', Validators.required],
    salary: ['', Validators.required],
  })

  async onRegister() {
    if (this.registerForm.valid) {
      this.user.name = this.registerForm.controls.name.value!;
      let responseRegister = await this._authService.registerData(this.user)
      
      this.registerForm.reset();
      Swal.fire({
        icon: "success",
        title: "Correcto!",
        text: "Te has registrado correctamente!",
      });
    } else {
      this.emptyFields();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, verifica que todos los campos del formulario estén completos!",
      });
    }
  }

  emptyFields() {
    Object.keys(this.registerForm.controls).forEach(controlName => {
      const control = this.registerForm.get(controlName);
      if (control && control.value === '' && control.invalid) {
        control.markAsTouched();
      }
    });
  }

  login() {
    this._router.navigate(['login']);
  }
}
// Firebase Subscribe
