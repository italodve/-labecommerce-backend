import express, { Request, response, Response } from 'express'
import cors from 'cors'

import { TUsers,TProducts } from './types'
import { db } from './knex'

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
app.get("/users", async (req: Request, res: Response) => {
    try {
        const result = await db("users")
          

res.status(200).send({result})
} catch (error: any) {
    console.log(error)

    if (res.statusCode === 200) {
        res.status(500)
    }

    res.send(error.message)
}
})
app.post("/users", async (req:Request, res: Response) => {
    try{
        const { id, name, email, password} = req.body
    
    if (typeof id !== "string") {
        res.status(400)
        throw new Error("'id' inválido, deve ser string")
    }
    if (typeof name !== "string") {
        res.status(400)
        throw new Error("'name' inválido, deve ser string")
    }
    if (typeof email !== "string") {
        res.status(400)
        throw new Error("'email' inválido, deve ser string")
    }
    if (typeof password !== "string") {
        res.status(400)
        throw new Error("'password' inválido, deve ser string")
    }
    const [ userIdAlreadyExists ]: TUsers[] | undefined[] = await db("users").where({ id })
    
    if (userIdAlreadyExists) {
        res.status(400)
        throw new Error("'id' já existe")
    }
    
    const [ userEmailAlreadyExists ]: TUsers[] | undefined[] = await db("users").where({ email })
    
    if (userEmailAlreadyExists) {
        res.status(400)
        throw new Error("'email' já existe")
    }
    
    const newUser: TUsers= {
        id,
        name,
        email,
        password
    }
    
    await db("users").insert(newUser)
    
    res.status(201).send({
        message: "User criado com sucesso",
        user: newUser
    })
    } catch (error) {
        console.log(error)
    
        if (req.statusCode === 200) {
            res.status(500)
        }
    
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
    })
    
app.post("/products", async (req:Request, res:Response)=>{
    try{
const id = req.body.id
const name = req.body.name
const price = req.body.price
const description = req.body.description
const imageUrl = req.body.imageUrl


if (typeof id !== "string") {
    res.status(400)
    throw new Error("'id' inválido, deve ser string")
}
if (typeof name !== "string") {
    res.status(400)
    throw new Error("'name' inválido, deve ser string")
}
if (typeof price !== "number") {
    res.status(400)
    throw new Error ("'price' inválido, deve ser string")

}if (typeof description !== "string") {
    res.status(400)
    throw new Error ("'description' inválido, deve ser string")
}
if (typeof imageUrl !== "string") {
    res.status(400)
    throw new Error ("'imageUrl' inválido, deve ser string")
}

const [ productIdAlreadyExists ]: TProducts[] | undefined[] = await db("products").where({ id })
if (productIdAlreadyExists) {
    res.status(400)
    throw new Error("'id' já existe")
}
const [ nameAlreadyExists ]: TProducts[] | undefined[] = await db("products").where({name})

if(nameAlreadyExists) {
    res.status(400)
    throw new Error("'name' já existe")

}
 const newProduct: TProducts= {
        id,
        name,
       price,
      description,
      imageUrl
    }
    
    await db("products").insert(newProduct)
    
    res.status(201).send({
        message: "Produto criado com sucesso",
        product: newProduct
    })
} catch (error) {
    console.log(error)

    if (req.statusCode === 200) {
        res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
}
})
//
app.get("/products", async (req: Request, res: Response) => {
    try {
        const result = await db("products")
      
        res.status(200).send({result})
        } catch (error: any) {
            console.log(error)
        
            if (res.statusCode === 200) {
                res.status(500)
            }
        
            res.send(error.message)
        }
})
app.get("/purchases", async (req: Request, res: Response) => {
    try {
        const result = await db("purchases")
        
        res.status(200).send({result})
        } catch (error: any) {
            console.log(error)
        
            if (res.statusCode === 200) {
                res.status(500)
            }
        
            res.send(error.message)
        }
})
//
app.get("/products/search", async (req:Request, res: Response) => { 
try{
    const q = req.query.q as string

        const product = await db.raw(`
        SELECT * FROM products
        WHERE name = "${q}";
        `)

if (q !== undefined) {
   
    // validamos que é uma string
  if (typeof q !== "string") {
        throw new Error("' deve ser uma string")
    }

    if (q.length < 1) {
        throw new Error("'query' deve possuir no mínimo 1 caractere")
    }
}

//const productFilter = products.filter(
//(product) => product.name.toLowerCase().includes(q.toLowerCase())
//)
res.status(200).send({products: product})
} catch (error: any) {
    console.log(error)

    if (res.statusCode === 200) {
        res.status(500)
    }

    res.send(error.message)
}
})
//

app.delete("/users/:id",(req: Request, res: Response)=>{
 const id = req.params.id

 //const indexRemove = users.findIndex((user)=>  user.id === id)

    //if (indexRemove >= 0) {

     //   users.splice(indexRemove, 1)
   // }



    res.status(200).send("Item deletado")
})
app.delete("/products/:id",(req: Request, res: Response)=>{
    const id = req.params.id
   
    //const indexRemove = products.findIndex((product)=>  product.id === id)
   
       //if (indexRemove >= 0) {
   
           //products.splice(indexRemove, 1)
       //}
   
   
   
       res.status(200).send("produto deletado")
   })

   app.put('/products/:id', (req: Request, res: Response) => {

    const id = req.params.id
    
    const newId = req.body.id as string | undefined         // cliente pode ou não enviar id
    const newName = req.body.name as string | undefined     // cliente pode ou não enviar name
    const newPrice  = req.body.price as number | undefined
    const newCategory = req.body.category as string | undefined
    

    
    //const product = products.find((product) => product.id === id)
    
            
    /*if (product) {
    
    product.id = newId || product.id
    product.name = newName || product.name
    product.category = newCategory || product.category               
   
    product.price = isNaN(newPrice) ? product.price: newPrice

    }
    */
    res.status(200).send("Atualização realizada com sucesso")
    })

    /*app.put("/users/:id",(req:Request, res:Response) =>{
        const id = req.params.id

        const newId = req.body.id as string | undefined
        const newEmail = req.body.email as string | undefined
        const newPassword =  req.body.password as string | undefined

       //const user = users.find((user) => user.id === id)

       if (user) {
        user.id = newId || user.id
        user.email = newEmail || user.email
        user.password = newPassword || user.password
       }
       res.status(200).send("Atualização de user realizada com sucesso")
    })
 */  
//
app.post("/purchases", async (req:Request, res:Response)=>{
    try{
const {id,buyer,totalPrice,createdAt,paid} = req.body


if (typeof id !== "string") {
    res.status(400)
    throw new Error("'id' inválido, deve ser string")
}


if (typeof buyer !== "string") {
    res.status(400)
    throw new Error("'buyer' inválido, deve ser string")
}

if (typeof totalPrice !== "string") {
    res.status(400)
    throw new Error("'totalPrice' inválido, deve ser string")
}

if (typeof createdAt !== "string") {
    res.status(400)
    throw new Error("'createdAt' inválido, deve ser string")
}

if (typeof paid !== "boolean") {
    res.status(400)
    throw new Error("'paid' inválido, deve ser boolean")
}
await db.raw(`
INSERT INTO purchases (id,buyer,totalPrice,createdAt,paid)
VALUES ("${id}", "${buyer}", "${totalPrice}", "${createdAt}", "${paid}");
`) 
res.status(200).send("produto cadastrado com sucesso")
} catch (error) {
    console.log(error)

    if (req.statusCode === 200) {
        res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
}
})

app.get("/purchases_products/:id", async (req: Request, res:Response) =>{
    
    const id = req.params.id
    try{
        const compra = await db("purchases")
        .innerJoin(
            "users",
            " purchases.buyer_id",
            "=",
            "users.id"
            )

        const productsList = await db("purchases_products")
         

            .innerJoin(
                "products",
                " purchases_products.product_id",
                "=",
                "products.id",
                
		        )

                 
              

        res.status(200).send({
            compra,productsList
          })
    } catch (error: any) {
        console.log(error)
    
        if (res.statusCode === 200) {
            res.status(500)
        }
    
        res.send(error.message)
    }
    
//const result = purchases.find((purchase)=>  purchase.userid === id)
//res.status(200).send(result)
})