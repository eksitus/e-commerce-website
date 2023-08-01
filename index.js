const body = document.body;
const productContainer = document.querySelector('.product-container')
const loadingIcon = document.createElement('img')
loadingIcon.setAttribute('src','icons/loading.png')
loadingIcon.setAttribute('class','loading-icon')
const cartNumber = document.querySelector('.number')
const loadingIconContainer = document.querySelector('.loading-icon-container')

let addToCartButtons
let inCartCount = 0
loadingIconContainer.appendChild(loadingIcon)
appendProducts().then(()=>{
  loadingIconContainer.removeChild(loadingIcon)
  addToCartButtons = document.querySelectorAll('.buy-button')
  addToCart(addToCartButtons)
})

async function appendProducts() {
  for (let index = 0; index <30; index++){
    await getProducts(index)
  }
}


async function getProducts(count){
  const response = await fetch('https://dummyjson.com/products')
  const result = await response.json()
  const product = result.products[count]
  // getProducts(imgLink,rating)
  cardCreator(product)
  return result;
}

function cardCreator(product) {
  const imgLink = product.images[0]
  const rating = product.rating
  const name = product.title
  const description = product.description
  const price = product.price
  const stockNumber = product.stock 

  const productCard = document.createElement('div')
  productCard.setAttribute('class','product-card')  
  
  const productImageContainer = document.createElement('div')
  productImageContainer.setAttribute('class','product-image-container')  
  
  const productImage = document.createElement('img')
  productImage.setAttribute('class','product-image')  
  productImage.setAttribute('src',imgLink)
  productImage.setAttribute('loading','lazy')  
  productImageContainer.appendChild(productImage)

  const productFeatures = document.createElement('div')
  productFeatures.setAttribute('class','product-features')  
  
  const productName = document.createElement('div')
  productName.setAttribute('class','product-name') 
  productName.innerText = name
   
  const productDescription = document.createElement('div')
  productDescription.setAttribute('class','product-description')
  productDescription.innerText = description  
   
  const productRating = document.createElement('div')
  productRating.setAttribute('class','product-rating')  

  const productPrice = document.createElement('div')
  productPrice.setAttribute('class','product-price')
  productPrice.innerText = `\$ ${price}`
    
  const stock = document.createElement('div')
  stock.setAttribute('class','product-stock')
  stock.innerText = 'Stock: ' + stockNumber
  
  const buyButtonContainer = document.createElement('div')
  buyButtonContainer.setAttribute('class','buy-button-container')
  
  const buyButton = document.createElement('button')
  buyButton.setAttribute('class','buy-button')
  buyButton.innerText = 'Add to Cart'
  buyButtonContainer.appendChild(buyButton)
  
  

  for (let index = 0; index < Math.round(rating); index++) {
    const star = document.createElement('div')
    star.setAttribute('class','star-rating')
    star.innerHTML = '&#9733;'
    productRating.appendChild(star)
  }
  productFeatures.appendChild(productName)
  productFeatures.appendChild(productDescription)
  productFeatures.appendChild(productRating)
  productFeatures.appendChild(productPrice) 
  productFeatures.appendChild(stock) 
  productFeatures.appendChild(buyButtonContainer)

  productCard.appendChild(productImageContainer)
  productCard.appendChild(productFeatures)
  
  productContainer.appendChild(productCard)
}

function addToCart(addToCartButtons) {
  addToCartButtons.forEach(element => {
    element.addEventListener('click',()=>{
      inCartCount++
      
      cartNumber.innerText = inCartCount
    })
  });
}