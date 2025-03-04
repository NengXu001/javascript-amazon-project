export const cart = [];

export const addToCart = (productId) => {
    // get the product id from the button
    
    //count the number of items in the cart
    let matchingItem;
  
    cart.forEach((CartItem) => {
        if (CartItem.productId === productId) {
            matchingItem = CartItem;
        }
    });
  
    const Quantity_increment = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
  
    if (matchingItem) {
        matchingItem.quantity+= Quantity_increment;
    }
    else{
        cart.push({
            productId: productId,
            quantity: Quantity_increment
        })
    }
  } 
