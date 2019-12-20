export class Usuario {
    nombre: string;
    apellido: string;
    dni: number;
    tipo: string;
    foto: string;
    email: string;
    password: string;

    public constructor(nombre: string, apellido: string, dni: number, tipo: string, foto: string, email: string, password?: string) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.tipo = tipo;
        this.foto = foto;
        this.email = email;
        this.password = password;
    }
}
