import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent {
  constructor(private _router: Router) {

  }

  logOut() {
    sessionStorage.removeItem("token");
    this._router.navigate(['login']);
  }
}
