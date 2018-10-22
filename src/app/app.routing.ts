//Importar modulos del router
import { ModuleWithProviders } from "@angular/core";
import {Routes, RouterModule} from '@angular/router';

//Importar Componentes
import { AdministradorComponent} from "./administrador/administrador.component";
import { ReclamoComponent } from "./reclamo/reclamo.component";
import {VerReclamoComponent} from "./ver-reclamo/ver-reclamo.component";
import {LoginComponent} from "./login/login.component";
import {GerenteComponent} from "./gerente/gerente.component";
import {SecretariaComponent} from "./secretaria/secretaria.component";

//Array de rutas
const appRoutes: Routes= [
    {path: '',component: ReclamoComponent},
    {path: 'verReclamo',component: VerReclamoComponent},
    {path: 'verReclamo/:numero',component: VerReclamoComponent},
    {path: 'administrador',component: AdministradorComponent},
    {path: 'login',component: LoginComponent},
    {path: 'gerente',component: GerenteComponent},
    {path: 'secretaria',component: SecretariaComponent},
    {path: '**',component: ReclamoComponent}
];

//Exportar el modulo del router
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);