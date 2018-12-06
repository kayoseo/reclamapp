import { Component, OnInit } from '@angular/core';
import { Login } from '../Plantilla/login';
import { UsuarioService } from '../services/usuario.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuarioService]
})
export class LoginComponent implements OnInit {
  public usuario: string;
  public acceso: Login;
  public numeroUser: any;
  public tipoUser: any;
  public respuesta: any;
  public alerta: boolean;
  constructor(private _usuarioService: UsuarioService, private _router: Router) {
    this.usuario = "nada";
    this.acceso = new Login('', '');
    this.alerta = false;

  }

  ngOnInit() {
  }

  SelectUsuario(user: string) {
    this.usuario = user;
    //console.log(this.usuario);
  }

  Logearse(form) {
    this.acceso.mail = this.acceso.mail.toLowerCase();
    // console.log("submit lanzado", this.acceso);
    this._usuarioService.Login(this.acceso).subscribe(
      response => {
        this.respuesta = response;
        //   console.log(this.respuesta);
        if (response[0] === undefined) {
          this.alerta = true;
        }
        else {
          this.numeroUser = response[0]._id;
          //  console.log(this.numeroUser);
          this.tipoUser = response[0].usuario;
          localStorage.setItem("rut", this.numeroUser);
          //   console.log(this.numeroUser);
          //   console.log(this.tipoUser);

          if (this.tipoUser == "secretaria") {
            this._router.navigate(['/secretaria/']);
          }
          if (this.tipoUser == "administrador") {
            this._router.navigate(['/administrador/']);
          }
          if (this.tipoUser == "gerente") {
            this._router.navigate(['/gerente/']);
          }
          form.reset();
        }
      },
      error => {
        console.log(<any>error);


      }
    )
  }

}
