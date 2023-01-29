
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

export type TPurchases_products = {
purchase_id: string,
product_id: string,

}
export type TPurchases = {
    id_compra:string,
    buyer:string,
    buyer_id:string,
 totalPrice:string,
 paid: number
}