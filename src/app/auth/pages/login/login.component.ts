import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public invalidForm = true;
    public invalidAccount = false;
    public invalidPassword = false;

    public account = '';
    public password = '';
    public showPassword = false;
    public keepAlive = false;

    constructor() { }

    ngOnInit(): void {
    }

    validate(element: string = '') {
        const accountElement = document.getElementById('email') as HTMLInputElement;
        const passwordElement = document.getElementById('password') as HTMLInputElement;

        switch (element){
            case 'account':
                if (this.validateEmail(accountElement.value)) {this.invalidAccount = false;} else {this.invalidAccount = true;}
                break;
            case 'password':
                if (this.validatePassword(passwordElement.value)) {this.invalidPassword = false;} else {this.invalidPassword = true;}
                break;
            default:
                if (this.validatePassword(passwordElement.value)) {this.invalidPassword = false;} else {this.invalidPassword = true;}
                if (this.validateEmail(accountElement.value)) {this.invalidAccount = false;} else {this.invalidAccount = true;}
                break;
        }
        if(this.invalidAccount || this.invalidPassword) {this.invalidForm = true;} else {this.invalidForm = false;}
    }

    showHidePassword(){
        this.showPassword = !this.showPassword;
        const passwordElement = document.getElementById('password') as HTMLInputElement;
        if(this.showPassword) {passwordElement.type = 'text';} else {passwordElement.type = 'password';}
    }

    private validateEmail(email: string) {
        const r = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return r.test(String(email).toLowerCase());
    }
    private validatePassword(password: string){
        if(password.length < 8) {return false;}
        return true;
    }
}
