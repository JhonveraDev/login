import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../service/auth.service';
import User from '../interfaces/user.interface';
import { isOlder } from '../validators/born-date-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  loading: boolean = false;
  dateMin: string = '1943-01-01';
  actualDate = new Date();
  dateMax = this.formatDate(this.actualDate);
  documentTypeOptions: string[] = ['C.C', 'Tarjeta de Identidad', 'Pasaporte', 'Acta de Nacimiento', 'Cédula Profesional', 'Green Card'];
  user: User = {
    id: '',
    name: '',
    surname: '',
    bornDate: '',
    documentType: '',
    documentNumber: 0,
    address: '',
    email: '',
    salary: 0,
    password: '',
    confirmPassword: ''
  };

  registerForm = this._formBuilder.group({
    name: ['', [Validators.required, Validators.pattern(/^([a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]{2,60}[\,\-\.]{0,1}[\s]{0,1}){1,3}$/)]],
    surname: ['', [Validators.required, Validators.pattern(/^([a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]{2,60}[\,\-\.]{0,1}[\s]{0,1}){1,3}$/)]],
    bornDate: ['', [Validators.required, isOlder.age]],
    documentType: ['C.C', Validators.required],
    documentNumber: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
    address: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    salary: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });

  constructor(private _router: Router, private _formBuilder: FormBuilder, private _authService: AuthService) {
  }

  onRegister() {
    this.writeFields();
    if (this.registerForm.valid && !this.loading && (this.user.password === this.user.confirmPassword)) {
      this.registerUser();
    } else {
      this.emptyFields();
      this.showModal('error', 'Oops...', 'Por favor, verifica que todos los campos del formulario estén completos!');
    }
  }

  registerUser() {
    this.writeFields();
    this.disableForm();
    this.loading = true;
    this._authService.registerUser(this.user.email, this.user.documentNumber).subscribe(response => {
      this.user.id = response.user.uid;
      this.registerData();
    },
      () => {
        this.loading = false;
        this.enableForm();
        this.showModal('error', 'Oops...', 'El usuario ya se encuentra registrado en nuestra base de datos');
      });
  }

  registerData() {
    this._authService.registerData(this.user, this.user.id).subscribe(response => {
      this.loading = false;
      this.enableForm();
      if (response && response.success) {
        this.showModal('success', 'Correcto!', response.message);
        this.registerForm.reset();
      } else
        this.showModal('error', 'Oops...', response.message);
    });
  }

  writeFields() {
    this.user.name = this.registerForm.controls.name.value!;
    this.user.surname = this.registerForm.controls.surname.value!;
    this.user.bornDate = this.registerForm.controls.bornDate.value!;
    this.user.documentType = this.registerForm.controls.documentType.value!;
    this.user.documentNumber = Number(this.registerForm.controls.documentNumber.value!);
    this.user.address = this.registerForm.controls.address.value!;
    this.user.email = this.registerForm.controls.email.value!;
    this.user.salary = Number(this.registerForm.controls.salary.value!);
    this.user.password = this.registerForm.controls.password.value!;
    this.user.confirmPassword = this.registerForm.controls.confirmPassword.value!;
  }

  login() {
    this._router.navigate(['login']);
  }

  showModal(icon: any, title: string, text: string) {
    Swal.fire({ icon, title, text });
  }

  emptyFields() {
    Object.keys(this.registerForm.controls).forEach(controlName => {
      const control = this.registerForm.get(controlName);
      if (control && control.value === '' && control.invalid) {
        control.markAsTouched();
      }
    });
  }

  disableForm() {
    this.registerForm.disable();
  }

  enableForm() {
    this.registerForm.enable();
  }

  test() {
    console.log('Foco perdido');
  }

  private formatDate(actualDate: Date): string {
    const año = actualDate.getFullYear();
    const mes = ('0' + (actualDate.getMonth() + 1)).slice(-2);
    const dia = ('0' + actualDate.getDate()).slice(-2);
    return `${año}-${mes}-${dia}`;
  }
}


// revisar promise y subscribe
// revisar lo que hizo duvan
// validaciones register(mayor 18 años tipo de documento en un select, salario con pipe)

// update de datos
// archivo de localizacion

