import {cart} from '../../data/cart.js';


export const renderCheckoutHeader = () => {
    let cartCount = 0;

    cart.forEach((cartItem) => {
        cartCount += cartItem.quantity;
    });

    const checkoutHeaderHTML = `

    <div class="header-content">
    <div class="checkout-header-left-section">
      <a href="amazon.html">
        <img class="amazon-logo" src="images/amazon-logo.png">
        <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
      </a>
    </div>

    <div class="checkout-header-middle-section">
      Checkout (<a class="return-to-home-link"
        href="amazon.html"> ${cartCount} items</a>)
    </div>

    <div class="checkout-header-right-section">
      <img src="images/icons/checkout-lock-icon.png">
    </div>
  </div>
  `;

  document.querySelector('.js-checkout-header').innerHTML = checkoutHeaderHTML;

}