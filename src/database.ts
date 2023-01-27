import {  TUsers, TProducts, TPurchases } from "./types"


export const users: TUsers[] = [
    {
    id: "001",
    name: "joas",
    email: "user1@gmail.com",
    password: "123"
    },
]
export const products: TProducts[] = [
    {
        id: "01",
        name: "papel",
        price: 25,
        category:"material escolar"
    },
    {
        id: "02",
        name: "caneta",
        price: 30,
        category: "material escolar"
    }
]
export const purchases: TPurchases[] = [
    {
        userid: "001",
        productid: "01",
        quantity:1,
        totalPrice:25
    }
]