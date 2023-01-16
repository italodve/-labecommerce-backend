import express, { Request, response, Response } from 'express'
import cors from 'cors'
import { users, products, purchases } from './database'
import { TUsers,TProducts } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3002, () => {
console.log("Servidor rodando na porta 3002")
})

app.get("/ping", (req: Request, res: Response) => {
res.send("Pong!")
})
//
app.get("/users", (req: Request, res: Response) => {
    try {
res.status(200).send(users)
} catch (error: any) {
    console.log(error)

    if (res.statusCode === 200) {
        res.status(500)
    }

    res.send(error.message)
}
})
//
app.get("/products", (req: Request, res: Response) => {
    try {
        res.status(200).send(products)
        } catch (error: any) {
            console.log(error)
        
            if (res.statusCode === 200) {
                res.status(500)
            }
        
            res.send(error.message)
        }
})
app.get("/purchases", (req: Request, res: Response) => {
    try {
        res.status(200).send(purchases)
        } catch (error: any) {
            console.log(error)
        
            if (res.statusCode === 200) {
                res.status(500)
            }
        
            res.send(error.message)
        }
})
//
app.get("/products/search", (req:Request, res: Response) => {
try{
const q = req.query.q as string
if (q !== undefined) {

    // validamos que é uma string
  if (typeof q !== "string") {
        throw new Error("' deve ser uma string")
    }

    if (q.length < 1) {
        throw new Error("'query' deve possuir no mínimo 1 caractere")
    }
}

const productFilter = products.filter(
(product) => product.name.toLowerCase().includes(q.toLowerCase())
)
res.status(200).send(productFilter)
} catch (error: any) {
    console.log(error)

    if (res.statusCode === 200) {
        res.status(500)
    }

    res.send(error.message)
}
})
//
app.post("/users", (req:Request, res: Response) => {
const id = req.body.id
const email = req.body.email
const password = req.body.password

const newUser: TUsers = {
id,
email,
password
}
users.push(newUser)
res.status(201).send("user criado com sucesso")
})
//
app.post("/products", (req:Request, res:Response)=>{
const id = req.body.id
const name = req.body.name
const price = req.body.price
const category = req.body.category

const newProduct: TProducts = {
id,
name,
price,
category,
}
 products.push(newProduct)
res.status(201).send("produto criado com sucesso")

})
//
app.get("/products/:id" ,(req: Request, res:Response) =>{
    try {
    const id = req.params.id 
    
const result = products.find((product)=>  product.id === id)
res.status(200).send(result)
} catch (error: any) {
    console.log(error)

    if (res.statusCode === 200) {
        res.status(500)
    }

    res.send(error.message)
}
})
//
app.get("/purchases/:id" ,(req: Request, res:Response) =>{
    const id = req.params.id
    
const result = purchases.find((purchase)=>  purchase.userid === id)
res.status(200).send(result)
})
app.delete("/users/:id",(req: Request, res: Response)=>{
 const id = req.params.id

 const indexRemove = users.findIndex((user)=>  user.id === id)

    if (indexRemove >= 0) {

        users.splice(indexRemove, 1)
    }



    res.status(200).send("Item deletado")
})
app.delete("/products/:id",(req: Request, res: Response)=>{
    const id = req.params.id
   
    const indexRemove = products.findIndex((product)=>  product.id === id)
   
       if (indexRemove >= 0) {
   
           products.splice(indexRemove, 1)
       }
   
   
   
       res.status(200).send("produto deletado")
   })

   app.put('/products/:id', (req: Request, res: Response) => {

    const id = req.params.id
    
    const newId = req.body.id as string | undefined         // cliente pode ou não enviar id
    const newName = req.body.name as string | undefined     // cliente pode ou não enviar name
    const newPrice  = req.body.price as number | undefined
    const newCategory = req.body.category as string | undefined
    

    
    const product = products.find((product) => product.id === id)
    
            
    if (product) {
    
    product.id = newId || product.id
    product.name = newName || product.name
    product.category = newCategory || product.category               
   
    product.price = isNaN(newPrice) ? product.price: newPrice

    }
    
    res.status(200).send("Atualização realizada com sucesso")
    })

    app.put("/users/:id",(req:Request, res:Response) =>{
        const id = req.params.id

        const newId = req.body.id as string | undefined
        const newEmail = req.body.email as string | undefined
        const newPassword =  req.body.password as string | undefined

       const user = users.find((user) => user.id === id)

       if (user) {
        user.id = newId || user.id
        user.email = newEmail || user.email
        user.password = newPassword || user.password
       }
       res.status(200).send("Atualização de user realizada com sucesso")
    })