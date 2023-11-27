import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GraphComponent } from './addevsoft/graph/graph.component';
import { RegisterComponent } from './register/register.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { authGuard } from './guard/auth.guard';
import { UpdateDataComponent } from './addevsoft/update-data/update-data.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'graph', component: GraphComponent, canActivate:[authGuard] },
  { path: 'update-data', component: UpdateDataComponent, canActivate:[authGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'recover-password', component: RecoverPasswordComponent },
  { path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
