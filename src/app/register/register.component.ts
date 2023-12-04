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
  loading: boolean = false;
  user: User = {
    id: '',
    name: '',
    surname: '',
    bornDate: '',
    documentType: '',
    documentNumber: 0,
    address: '',
    email: '',
    salary: 0
  };

  constructor(private _router: Router, private _formBuilder: FormBuilder, private _authService: AuthService) {}

  registerForm = this._formBuilder.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    bornDate: ['', Validators.required],
    documentType: ['', Validators.required],
    documentNumber: ['', Validators.required],
    address: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    salary: ['', Validators.required],
  });

  onRegister() {
    if (this.registerForm.valid) {
      this.writeFields();
      this.disableForm();
      this.loading = true;
      this._authService.registerData(this.user).subscribe(response => {
        this.loading = false;
        this.enableForm();
        if (response && response.success) {
          this.showModal('success', 'Correcto!', response.message);
          this.registerForm.reset();
        } else
          this.showModal('error', 'Oops...', response.message);
      });
    } else {
      this.emptyFields();
      this.showModal('error', 'Oops...', 'Por favor, verifica que todos los campos del formulario estén completos!');
    }
  }

  showModal(icon: any, title: string, text: string) {
    Swal.fire({icon, title,text,});
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

  writeFields () {
    this.user.name = this.registerForm.controls.name.value!;
    this.user.surname = this.registerForm.controls.surname.value!;
    this.user.bornDate = this.registerForm.controls.bornDate.value!;
    this.user.documentType = this.registerForm.controls.documentType.value!;
    this.user.documentNumber = Number(this.registerForm.controls.documentNumber.value!);
    this.user.address = this.registerForm.controls.address.value!;
    this.user.email = this.registerForm.controls.email.value!;
    this.user.salary = Number(this.registerForm.controls.salary.value!);
  }

  disableForm() {
    this.registerForm.disable();
  }

  enableForm() {
    this.registerForm.enable();
  }
}

// preguntar si user existe
// revisar promise y subscribe
// revisar lo que hizo duvan
// validaciones register(mayor 18 años tipo de documento en un select, salario con pipe)

// update de datos y servicio de login
// archivo de localizacion

