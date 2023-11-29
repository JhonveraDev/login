import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  name: string = 'Pepito Perez';
  constructor(private _router: Router, private _authService: AuthService) {}

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
