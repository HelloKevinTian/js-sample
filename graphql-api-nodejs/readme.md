## Building APIs with GraphQL, NodeJs and Mongoose
### Setup

```
npm install
```

### Run the Application

```
npm start
```

### Test Case

```
curl http://localhost:3000/5c8a0a64a24a99b7f28af880?fields=title,qty,obj{name}
curl http://localhost:3000/aa/allProducts?fields=title,qty,obj{name,age}
```

```
mutation{
  createProduct(input:{
    title: "GraphQL Course",
    qty: 1
  })
  {
    _id
    title
    qty
  }
}

# {
#   allProducts{
#     # title
#     # _id
#     qty
#   }
# }

# {
#   getProduct(_id: "5c8a0789780f507be6d81883"){
#     title
#     _id
#     qty
#   }
# }

# mutation{
#   updateProduct(_id:"5c8a0789780f507be6d81883",input:{
#     title: "Building APIS with GraphQL",
#     qty:2
#   }){
#     title
#     qty
#   }
# }

# mutation{
#   deleteProduct(_id:"5c8a0789780f507be6d81883"){
#     title,
#     qty
#   }
# }
```