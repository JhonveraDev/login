import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
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

  constructor(private _router: Router, private _authService: AuthService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.user = this._authService.getUser();
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
}
