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

    private authorization = '';

    constructor() {

    }

    getUserData(value = ''){
        switch(value){
            case 'id': return this.id;
            case 'email': return this.email;
            case 'nombres': return this.nombres;
            case 'apellidos': return this.apellidos;
            case 'telefono': return this.telefono;
            default:
                console.warn('El metodo get de AuthService ha sido llamado sin argumentos');
                return null;
        }
    }

    request(method: string, url: string, body: any = {}){
        const headers = new Headers();
        headers.append('Auth', this.authorization);
        const mode = 'cors' as RequestMode;
        const cache = 'default' as RequestCache;
        const init = { method, headers, mode, cache, body: JSON.stringify(body) };
        const request = new Request(url, init);
        return fetch(request);
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
