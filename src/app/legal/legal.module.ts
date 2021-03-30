import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LegalRoutingModule } from './legal-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TerminosYCondicionesComponent } from './pages/terminos-y-condiciones/terminos-y-condiciones.component';

@NgModule({
  declarations: [TerminosYCondicionesComponent],
  imports: [
    CommonModule,
    LegalRoutingModule,
    NgbModule
  ]
})
export class LegalModule { }
