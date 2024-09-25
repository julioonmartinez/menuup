export interface Survey {
    id:string,
    servicio: number,  // Valor inicial 3 estrellas
    calidadComida: number,  // Valor inicial 3 estrellas
    tiempoEspera: 'si' | 'no',
    recomendacion: 'si' | 'no' ,
    sugerencias: string,
    telefono: string,
    email: string,
    create:Date,
}
