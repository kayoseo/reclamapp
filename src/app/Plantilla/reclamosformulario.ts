export class Reclamos{
    constructor(
        public numero:number,
        public fecha: Date,
        public nombre:string,
        public telefono:string,
        public email:string, 
        public administrador:string,
        public direccion:string,
        public problema:string
    )
    {}
}