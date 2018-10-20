import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public usuario:string;
  constructor() { 
   this.usuario="nada"
  }

  ngOnInit() {
  }

  SelectUsuario(user:string)
  {
this.usuario=user;
console.log(this.usuario);
  }

}
