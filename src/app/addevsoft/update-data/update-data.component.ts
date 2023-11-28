import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.scss']
})
export class UpdateDataComponent {
  constructor(private _router: Router, private _formBuilder: FormBuilder) { }

  updateForm = this._formBuilder.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    bornDate: ['', Validators.required],
    documentType: ['', Validators.required],
    documentNumber: ['', Validators.required],
    address: ['', Validators.required],
    email: ['', Validators.required],
    salary: ['', Validators.required],
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
