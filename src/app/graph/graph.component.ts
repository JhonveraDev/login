import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent {
  constructor(private _router: Router, private _authService: AuthService) {}

  logOut() {
    this._authService.loggedOut();
    this._router.navigate(['login']);
  }
}
