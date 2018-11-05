import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'; 
import {routing,appRoutingProviders} from './app.routing';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { ReclamoComponent } from './reclamo/reclamo.component';
import { VerReclamoComponent } from './ver-reclamo/ver-reclamo.component';
import { LoginComponent } from './login/login.component';
import { GerenteComponent } from './gerente/gerente.component';
import { SecretariaComponent } from './secretaria/secretaria.component';

@NgModule({
  declarations: [
    AppComponent,
    AdministradorComponent,
    ReclamoComponent,
    VerReclamoComponent,
    LoginComponent,
    GerenteComponent,
    SecretariaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpClientModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
