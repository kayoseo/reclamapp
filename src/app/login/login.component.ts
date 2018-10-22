import { Component, OnInit } from '@angular/core';
import {Loguearse} from '../Plantilla/userLogin'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public usuario:string;
  public acceso: Loguearse;
  constructor() { 
   this.usuario="nada";
   this.acceso=new Loguearse('','');
  }

  ngOnInit() {
  }

  SelectUsuario(user:string)
  {
this.usuario=user;
console.log(this.usuario);
  }

}
