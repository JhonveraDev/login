import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { isOlder } from 'src/app/validators/born-date-validator';

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.scss']
})
export class UpdateDataComponent {
  constructor(private _router: Router, private _formBuilder: FormBuilder) { }

  updateForm = this._formBuilder.group({
    name: ['', [Validators.required, Validators.pattern(/^([a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]{2,60}[\,\-\.]{0,1}[\s]{0,1}){1,3}$/)]],
    surname: ['', [Validators.required, Validators.pattern(/^([a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]{2,60}[\,\-\.]{0,1}[\s]{0,1}){1,3}$/)]],
    bornDate: ['', [Validators.required, isOlder.age]],
    documentType: ['C.C', Validators.required],
    documentNumber: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
    address: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    salary: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(5)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(5)]]
  })

  onUpdate() {
    if (this.updateForm.valid) {
      this.updateForm.reset();
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
    Object.keys(this.updateForm.controls).forEach(controlName => {
      const control = this.updateForm.get(controlName);
      if (control && control.value === '' && control.invalid) {
        control.markAsTouched();
      }
    });
  }
}
