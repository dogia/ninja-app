import { Component, OnInit, TemplateRef } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { authService } from '../../services/auth.service';

import { NgxSpinnerService } from "ngx-spinner";
import { ToastService } from 'src/app/toast.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    public messages = {
        title: '',
        body: ''
    };
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

    constructor(private spinner: NgxSpinnerService, private toast: ToastService, private router: Router) { }

    ngOnInit(): void {
    }

    async send(success: TemplateRef<any>, error: TemplateRef<any>){
        this.spinner.show();
        if(!this.validate()) {return;}
        const form =
            {
                email: this.account,
                password: this.password,
                nombres: this.names,
                apellidos: this.lastnames,
                telefono: this.phone
            };

        const auth = authService();
        const request = auth.request('POST', `${env.root}/${env.router.auth.register}`, form);
        request.then(
            async (response: any) => {
                const json = await response.json();
                for(const i in json.messages){
                    this.messages.title = i;
                    this.messages.body = json.messages[i];
                    json.code == 200 ? this.toast.show(success,{ classname: 'bg-success text-light', delay: 50000 }) : this.toast.show(error,{ classname: 'bg-danger text-light', delay: 5000 });
                }

                if (json.code == 200){
                    this.spinner.show();
                    // Reset form
                    this.account = '';
                    this.password = '';
                    this.repassword = '';
                    this.names = '';
                    this.lastnames = '';
                    this.phone = '';
                    this.tyc = false;

                    // Iniciar sesión e ir al inicio
                    // TODO
                    //this.router.navigate()
                }
            },
            ()=>{
                this.messages.title = 'Error';
                this.messages.body = 'No se ha podido establecer conexión con el servidor';
                this.toast.show(error,{ classname: 'bg-danger text-light', delay: 5000 });
            }
        ).finally(() => this.spinner.hide());
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
