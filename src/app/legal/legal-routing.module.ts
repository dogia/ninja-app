import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { TerminosYCondicionesComponent } from './pages/terminos-y-condiciones/terminos-y-condiciones.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'terminos-y-condiciones', component: TerminosYCondicionesComponent },
      { path: '**', redirectTo: 'terminos-y-condiciones'}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LegalRoutingModule { }
