import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';

import { formatCurrency } from './utils/money.js';

let productsHTML = '';

// generate the html for each product
products.forEach((product) => {
    
    productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class = 'js-quantity-selector-${product.id}'>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart added-to-cart-opacity-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = '${product.id}'>
            Add to Cart
          </button>
        </div>`;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;


const updateCartQuantity = () => {
  // display the number of products in the cart.
  let cartCount = 0;  
  cart.forEach((CartItem) => {
      cartCount += CartItem.quantity;
  });

  document.querySelector('.js-cart-quantity').textContent = cartCount;

}

const InitialCartQuantity = () => {
  // display the number of products in the cart.
  let cartCount = 0;  
  cart.forEach((CartItem) => {
      cartCount += CartItem.quantity;
  });

  document.querySelector('.js-cart-quantity-initial').textContent = cartCount;

}

InitialCartQuantity();

const AddedToCartMessage = (productId,timeout1) => {

  //added-to-cart sign
  document.querySelector(`.added-to-cart-opacity-${productId}`).classList.add('added-to-cart-opacity-active');

  timeout1 = setTimeout(() => {
      document.querySelector(`.added-to-cart-opacity-${productId}`).classList.remove('added-to-cart-opacity-active');
  }, 2000);

  if (timeout1) {
    clearTimeout(timeout1);
  }
}


document.querySelectorAll('.js-add-to-cart').forEach((button) =>{
    
    let timeout1;

    button.addEventListener('click', () => {
        // cancel the last timeout if the user click again

        const productId = button.dataset.productId;

        addToCart(productId);
        updateCartQuantity();
        AddedToCartMessage(productId,timeout1);

    });
});
