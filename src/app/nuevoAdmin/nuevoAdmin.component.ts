import { Component } from "@angular/core";

@Component({
    selector: 'nuevoAdmin',
    templateUrl: './nuevoAdmin.component.html',
    styleUrls: ['./nuevoAdmin.component.css']
})
export class NuevoadminComponent{
    public nombre:string;

    constructor(){
        this.nombre="Manuel";
        console.log("Componente nuevo Admin");
    }
}