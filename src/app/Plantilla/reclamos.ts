export class Reclamos{
    constructor(
        public _id:string,
        public fecha: Date,
        public fechaTermino: Date,
        public nombre:string, //nombre residente
        public telefono:string,
        public email:string, 
        public administrador:string,
        public comunidad:string,
        public torreDpto:string,
        public direccion:string,
        public problema:string,
        public estado:string,
        public solucion:string,
        public encuesta:string
    )
    {}
}