export let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

const saveToStorage = () => {
    // the fist argument is the key, the second argument is the value
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
            quantity: Quantity_increment,
            deliveryOptionId: '1' // default delivery option
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

export const updateQuantity = (productId, newQuantity) => {
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            cartItem.quantity = newQuantity;
        }
    });

    saveToStorage();
}

export const updateDeliveryOption = (productId, deliveryOptionId) => {
    
    let matchingItem;


    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchingItem = cartItem;
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();

}