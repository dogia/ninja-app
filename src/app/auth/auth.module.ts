import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { authService } from './services/auth.service';

import { environment as env } from '../../environments/environment';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { AuthRoutingModule } from './auth-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


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
