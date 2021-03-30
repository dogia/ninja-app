import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public invalidForm: boolean = true;
  public invalidAccount: boolean = false;
  public invalidPassword: boolean = false;

  public account: string = '';
  public password: string = '';
  public showPassword = false;
  public keepAlive: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  private validateEmail(email: string) {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
  }
  private validatePassword(password: string){
    if(password.length < 8) return false;
    return true;
  }
  validate(element: string = '') {
    const accountElement = <HTMLInputElement>document.getElementById('email');
    const passwordElement = <HTMLInputElement>document.getElementById('password');

    switch (element){
      case 'account':
        if (this.validateEmail(accountElement.value)) this.invalidAccount = false; else this.invalidAccount = true;
        break;
      case 'password':
        if (this.validatePassword(passwordElement.value)) this.invalidPassword = false; else this.invalidPassword = true;
        break;
      default:
        if (this.validatePassword(passwordElement.value)) this.invalidPassword = false; else this.invalidPassword = true;
        if (this.validateEmail(accountElement.value)) this.invalidAccount = false; else this.invalidAccount = true;
        break;
    }    
    if(this.invalidAccount || this.invalidPassword) this.invalidForm = true; else this.invalidForm = false;
  }

  showHidePassword(){
    this.showPassword = !this.showPassword;
    const passwordElement = <HTMLInputElement>document.getElementById('password');
    if(this.showPassword) passwordElement.type = 'text'; else passwordElement.type = 'password';
  }
}
