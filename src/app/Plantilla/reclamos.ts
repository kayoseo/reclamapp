export class Reclamos{
    constructor(
        public numero:string,
        public fecha: Date,
        public tiempoTranscurrido: string,
        public comunidad:string,
        public torreDpto:string,
        public residente:string, 
        public descripcion:string,
        public estado:string,
        public solucion:string
    )
    {}
}