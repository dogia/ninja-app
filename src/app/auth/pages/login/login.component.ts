import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from 'src/app/toast.service';

import { environment as env } from 'src/environments/environment';
import { authService } from '../../services/auth.service';

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

    public messages = {
        title: '',
        body: ''
    }

    constructor(private spinner: NgxSpinnerService, private toast: ToastService, private router: Router) { }

    ngOnInit(): void { }

    login(success: TemplateRef<any>, error: TemplateRef<any>){
        this.spinner.show();
        const auth = authService();
        const form = { user: this.account, password: this.password };
        const request = auth.request('POST', `${env.root}/${env.router.auth.login}`, form);
        request.then(
            async (response: any) => {
                const json = await response.json();
                for(const i in json.messages){
                    this.messages.title = i;
                    this.messages.body = json.messages[i];
                    json.code == 200 ? this.toast.show(success,{ classname: 'bg-success text-light', delay: 50000 }) : this.toast.show(error,{ classname: 'bg-danger text-light', delay: 5000 });
                }
                
                if(json.code == 200){
                    auth.setUserData(json.data.cuenta, json.data.auth, this.keepAlive);
                    this.router.navigate([env.router.ninjabot.dashboard]);
                }
            },
            () => {
                this.messages.title = 'Error';
                this.messages.body = 'No se ha podido establecer conexión con el servidor';
                this.toast.show(error,{ classname: 'bg-danger text-light', delay: 5000 });
            }
        ).finally(()=>this.spinner.hide());
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
