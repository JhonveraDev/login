import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import User from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isFirstTime: boolean = true;
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

  constructor(private _router: Router, private _authService: AuthService, private _translateService: TranslateService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.user = this._authService.getUser();
    if (!this.user.id) {
      this._authService.getDataById(localStorage.getItem("token")).subscribe(user => {
        this._authService.setUser(user.data());
        this.user = this._authService.getUser();
      });
    }
  }

  logOut() {
    this._authService.loggedOut();
    this._router.navigate(['login']);
  }

  UpdateData() {
    this._router.navigate(['update-data']);
  }

  Graph() {
    this._router.navigate(['graph']);
  }

  ChangeLan() {
      const currentLang = this._translateService.currentLang;
      if (currentLang === 'es')
        this._translateService.setDefaultLang('en');
      else
        this._translateService.setDefaultLang('es');

      this._translateService.use(this._translateService.getDefaultLang());
  }
}
