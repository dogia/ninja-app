import { NgModule } from '@angular/core';
import { NavigationStart, Router, RouterModule, Routes } from '@angular/router';
import { authService } from './auth/services/auth.service';

import { environment as env } from '../environments/environment';

const routes: Routes = [
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule) },
    { path: 'ninjabot', loadChildren: () => import('./ninjabot/ninjabot.module').then(m => m.NinjabotModule) },
    { path: 'legal', loadChildren: () => import('./legal/legal.module').then(m => m.LegalModule) },
    { path: '**', redirectTo: 'auth' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
    getModule(rute: NavigationStart): string {
        const url = rute.url.split('/');
        for(const module of url){
            if(module != '') return module;
        }
        return '';
    }

    private authRequiredModules = ['ninjabot'];

    private isAuth(){
        const auth = authService();
        auth.loadKeepAlive();
        return (auth.getUserData('id') != (-1));
    }

    constructor(private router: Router){
        this.router.events.subscribe(
            (event)=>{
                if (event instanceof NavigationStart){
                    const authorized = this.isAuth();
                    const isPublic = (this.authRequiredModules.indexOf(this.getModule(event)) == -1);

                    // No está autorizado para entrar en el módulo.
                    if(!authorized && !isPublic){
                        this.router.navigate([env.router.auth.login]);
                    }

                    // Está logueado por lo tanto no tiene por que estar en auth
                    if(authorized && (this.getModule(event) == 'auth')){
                        this.router.navigate([env.router.ninjabot.dashboard]);
                    }
                }
            }
        );
    }
}
