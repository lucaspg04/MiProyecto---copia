export interface User{
    uid:string,
    email: string,
    password: string,
    name: string,
    apellido: string,
    telefono: string,
    rol: string
}

export interface viaje {
    uid:string,
    destino:string,
    conductor:User,
    precio:number,
    fecha:Date,
    pasajeros: User[]
}