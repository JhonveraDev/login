import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private _router: Router, private _formBuilder: FormBuilder) { }

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

  onRegister() {
    if (this.registerForm.valid) {
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
