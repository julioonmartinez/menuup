import { Credit } from "./credit"

export interface UserTap {

    id?:string
    uid?:string
    name?:string,
    displayName?: string
    email:string,
    photoURL?:string | null,
    role: 'free' | 'premium' | 'admin',
    create:Date,
    credits?: Credit[],
}
