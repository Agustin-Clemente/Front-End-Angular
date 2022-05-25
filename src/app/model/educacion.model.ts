export class educacion {
    id?: number;
    institucion: String;
    titulo: String;
    desde: String;
    hasta: String;
    img: String;

    constructor(institucion: String, titulo: String, desde: String, hasta: String, img: String) {
        this.desde = desde;
        this.hasta = hasta;
        this.institucion = institucion;
        this.titulo = titulo;
        this.img=img;
        
    }

}