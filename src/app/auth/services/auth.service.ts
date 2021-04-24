import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

// @ts-ignore
class AuthService {
    private id = -1;
    private email = '';
    private nombres = '';
    private apellidos = '';
    private telefono = '';
    private auth = 'none';

    constructor() {

    }

    getUserData(value = ''): number | string | boolean{
        switch(value){
            case 'id': return this.id;
            case 'email': return this.email;
            case 'nombres': return this.nombres;
            case 'apellidos': return this.apellidos;
            case 'telefono': return this.telefono;
            default:
                console.warn('El metodo get de AuthService ha sido llamado sin argumentos');
                return false;
        }
    }

    setUserData(cuenta: any, auth: string, keepAlive: boolean = false){
        this.id = parseInt(cuenta.id);
        this.email = cuenta.email;
        this.nombres = cuenta.nombres;
        this.apellidos = cuenta.apellidos;
        this.telefono = cuenta.telefono;
        this.auth = auth;

        if (keepAlive){
            localStorage.setItem('login', JSON.stringify({ cuenta: cuenta, auth: auth }));
        }
    }

    loadKeepAlive(){
        const loginString = localStorage.getItem('login');
        if(loginString !== null){
            const login = JSON.parse(loginString);
            this.setUserData(login.cuenta, login.auth, true);
            return true;
        }else return false;
    }

    logout(){
        localStorage.removeItem('login');
        this.id = -1;
        this.email = '';
        this.nombres = '';
        this.apellidos = '';
        this.telefono = '';
        this.auth = 'none';
    }

    async request(method: string, url: string, body: any){
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('User', `${this.id}`);
        headers.append('Auth', this.auth);
        const init = { method: method, headers: headers, body: JSON.stringify(body) };
        const request = new Request(url, init);
        let result = null;
        await fetch(request).then(response => result = response);
        return result;
    }
}

let sesion: any = null;

// @ts-ignore
export const authService = (...args): AuthService =>{
    if (sesion === null){
        // @ts-ignore
        sesion = new AuthService(args);
        return sesion;
    }else{
        return sesion;
    }
};
