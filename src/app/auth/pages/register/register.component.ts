import { Component, OnInit } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { authService } from '../../services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    public invalidAccount = false;
    public invalidPassword = false;
    public invalidRepassword = false;
    public invalidNames = false;
    public invalidLastnames = false;
    public invalidPhone = false;
    public invalidTyC = false;
    public invalidForm = true;

    public account = '';
    public password = '';
    public repassword = '';
    public names = '';
    public lastnames = '';
    public phone = '';
    public tyc = false;

    constructor() { }

    ngOnInit(): void {
    }

    async send(){
        if(!this.validate()) {return;}
        const form =
            {
                account: this.account,
                password: this.password,
                names: this.names,
                lastnames: this.lastnames,
                phone: this.phone
            };
        const auth = authService();
        const request = auth.request('POST', env.router.auth.register, form);
        request.then(
            async (response: any) => {
                const json = await response.json();
                console.log(json);
            }
        );
    }

    switchTyC(){
        this.tyc = !this.tyc;
        this.validate('tyc');
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
            case 'repassword':
                if (this.password === this.repassword) {this.invalidRepassword = false;} else {this.invalidRepassword = true;}
                break;
            case 'names':
                if (this.names !== '') {this.invalidNames = false;} else {this.invalidNames = true;}
                break;
            case 'lastnames':
                if (this.lastnames !== '') {this.invalidLastnames = false;} else {this.invalidLastnames = true;}
                break;
            case 'phone':
                if (this.phone.length > 5) {this.invalidPhone = false;} else {this.invalidPhone = true;}
                break;
            case 'tyc':
                if (this.tyc) {this.invalidTyC = false;} else {this.invalidTyC = true;}
                break;
            default:
                if (this.validatePassword(passwordElement.value)) {this.invalidPassword = false;} else {this.invalidPassword = true;}
                if (this.validateEmail(accountElement.value)) {this.invalidAccount = false;} else {this.invalidAccount = true;}
                if (this.password === this.repassword) {this.invalidRepassword = false;} else {this.invalidRepassword = true;}
                if (this.names !== '') {this.invalidNames = false;} else {this.invalidNames = true;}
                if (this.lastnames !== '') {this.invalidLastnames = false;} else {this.invalidLastnames = true;}
                if (this.phone.length > 5) {this.invalidPhone = false;} else {this.invalidPhone = true;}
                break;
        }
        if(
                this.invalidAccount ||
                this.invalidPassword ||
                this.invalidRepassword ||
                this.invalidNames ||
                this.invalidLastnames ||
                this.invalidPhone ||
                !this.tyc
            )
                {this.invalidForm = true;}
            else
                {this.invalidForm = false;}
        return !this.invalidForm;
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
