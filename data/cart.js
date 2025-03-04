export let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

const saveToStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

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
    saveToStorage();
  } 

export const removeFromCart = (productId) => {

    let newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;

    saveToStorage();
}