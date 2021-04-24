import { Component, OnInit } from '@angular/core';
import { authService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showid(){
    const auth = authService();
    return auth.getUserData('id');
  }

}
