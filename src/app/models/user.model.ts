export interface User{
    uid:string,
    email: string,
    password: string,
    name: string,
    apellido: string,
    telefono: string,
    rol: string
}

export interface Viaje {
    uid:string,
    destino:string,
    conductor:User,
    valorPorPasajero:number,
    fecha:Date,
    pasajeros: User[]
}