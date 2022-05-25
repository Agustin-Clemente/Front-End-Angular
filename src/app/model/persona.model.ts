export class persona {
    id?: number; //el signo ? es para que no sea obligatorio en el constructor
    nombre: String;
    apellido: String;
    img: String;
    acercade: String;
    profesion: String;
    ubicacion: String;

    constructor(nombre: String, apellido: String, img: String, acercade:String, profesion:String, ubicacion:String){
        this.nombre = nombre;
        this.apellido = apellido;
        this.img = img;
        this.acercade= acercade;
        this.profesion = profesion;
        this.ubicacion= ubicacion;

    }

}