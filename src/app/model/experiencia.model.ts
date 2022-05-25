export class experiencia {
    id?: number;
    cargo: String;
    sector: String;
    jornada: String;
    desde: String;
    hasta: String;
    img: String;

    constructor (cargo: String, sector: String, jornada: String, desde: String, hasta: String, img: String){
        this.cargo=cargo;
        this.jornada=jornada;
        this.sector=sector;
        this.desde = desde;
        this.img=img;
        this.hasta = hasta;
    }
}