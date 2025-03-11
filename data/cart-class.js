class Cart{
    cartItems; // public property
    #localStorageKey; // private property

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }


    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
    }

    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

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
    }

    removeFromCart(productId) {
        this.cartItems = this.cartItems.filter((cartItem) => cartItem.productId !== productId);
        this.saveToStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem = this.cartItems.find((cartItem) => cartItem.productId === productId);
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage()
    }
}


const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business'); 

