import { Categories } from "./categories"
import { Product } from "./product"

export interface BusinessInformation {

    id?:string,
    nameCompany:string,
    nameUser:string,
    emailCompany:string,
    create?:Date,
    urlImgRestaurante?: string,
    filePath?:string,
    idUSer?:string,
    idMenu?:string,
    adress?:string,
    horario?:string,
    phone?:number,
    principalColor?:string,
    secondaryColor?:string,
    terciaryColor?:string,
    url?:string
    products?: Product[],
    categories?:Categories[],
}
