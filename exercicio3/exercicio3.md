# Exercício 3
Mesmo fluxo do exercício 2.

## Create User
- method HTTP (POST)
- path ("/users")
- body
    - id
    - email
    - password
- response
    - status 201
    - "Cadastro realizado com sucesso"

## Create Product
- method HTTP (POST)
- path ("/products")
- body
    - id
    - name
    - price
    - category
- response
    - status 201
    - "Produto cadastrado com sucesso"

## Create Purchase
- method HTTP (POST)
- path ("/purchases")
- body
    - userId
    - productId
    - quantity
    - totalPrice
- response
    - status 201
    - "Compra realizada com sucesso"

