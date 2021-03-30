import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public invalidAccount: boolean = false;
  public invalidPassword: boolean = false;
  public invalidRepassword: boolean = false;
  public invalidNames: boolean = false;
  public invalidLastnames: boolean = false;
  public invalidPhone: boolean = false;
  public invalidForm: boolean = true;

  public account: string = '';
  public password: string = '';
  public repassword: string = '';
  public names: string = '';
  public lastnames: string = '';
  public phone: string = '';
  public tyc: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
