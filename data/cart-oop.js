
const cart ={
    cartItems: JSON.parse(localStorage.getItem('cart-oop')) || [],

    saveToStorage() {
        localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
    },

    addToCart(productId) {
        let matchingItem = this.cartItems.find((cartItem) => cartItem.productId === productId);
        const quantityElement = document.querySelector(`.js-quantity-selector-${productId}`);
        const Quantity_increment = quantityElement ? Number(quantityElement.value) : 1;

        if (matchingItem) {
            matchingItem.quantity += Quantity_increment;
        }
        else {
            this.cartItems.push({
                productId: productId,
                quantity: Quantity_increment,
                deliveryOptionId: '1' // default delivery option
            })
        }
        this.saveToStorage();
    },

    removeFromCart(productId) {
        this.cartItems = this.cartItems.filter((cartItem) => cartItem.productId !== productId);
        this.saveToStorage();
    },

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem = this.cartItems.find((cartItem) => cartItem.productId === productId);
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }
}
