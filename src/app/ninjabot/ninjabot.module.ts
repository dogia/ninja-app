import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { NinjabotRoutingModule } from './ninjabot-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';


@NgModule({
  declarations: [DashboardComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    NinjabotRoutingModule,
    NgbModule,
    FormsModule
  ]
})
export class NinjabotModule { }
