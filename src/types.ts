
export type TUsers = {
id: string,
email: string,
password: string
}

export type TProducts = {
id: string,
name: string,
price: number,
category: string
}
export type TPurchases = {
 userid:string,
 productid:string
 quantity:number,
 totalPrice:number
}