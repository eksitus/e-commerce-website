

async function getProducts(){
  const response = await fetch('https://dummyjson.com/products')
  const result = await response.json()
  console.log(result.products[0])
}

getProducts()


