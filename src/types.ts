
export type TUsers = {
    id: string,
    name: string,
    email: string,
    password: string
}

export type TProducts = {
id: string,
name: string,
price: number,
description: string,
imageUrl: string
}
export type TPurchases = {
 userid:string,
 productid:string
 quantity:number,
 totalPrice:number
}