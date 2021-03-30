import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { AuthRoutingModule } from './auth-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NgbModule,
    FormsModule
  ]
})
export class AuthModule { }
