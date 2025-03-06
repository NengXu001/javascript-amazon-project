import {cart, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import {formatCurrency} from '.././utils/money.js';
import { removeFromCart } from '../../data/cart.js';
import { updateQuantity } from '../../data/cart.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';


export function renderOrderSummary () {

    let cartSummaryHTML = '';

    // display the number of products in the cart.
    const UpdateCartQuantity = () => {
        
        let cartCount = 0;  
        cart.forEach((CartItem) => {
            cartCount += CartItem.quantity;
        });
    
        document.querySelector('.js-cart-quantity-checkout-page').textContent = cartCount;
    
    }

    UpdateCartQuantity();

    const deliveryOptionsHTML = (matchingProduct, cartItem) => {
        let html = '';

        deliveryOptions.forEach((option) => {

            const today = dayjs();
            const dateString = today.add(option.deliveryDays, 'days').format('dddd, MMMM D');

            const priceString = option.priceCents === 0 ? 'FREE' : `$${formatCurrency(option.priceCents)}-`;

            const isChecked = cartItem.deliveryOptionId === option.id ? 'checked' : '';

            html += `
            <div class="delivery-option js-delivery-option" 
            data-product-id = "${matchingProduct.id}"
            data-delivery-option-id="${option.id}">
                <input type="radio" ${isChecked}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} Shipping
                </div>
                </div>
            </div>
            `

        });

        return html;

    }

    cart.forEach((cartItem) => {
        
        const productId = cartItem.productId;

        const matchingProduct = getProduct(productId);  

        const deliveryOptionId = cartItem.deliveryOptionId;

        const deliveryOption = getDeliveryOption(deliveryOptionId);


        const today = dayjs();
        const dateString = today.add(deliveryOption.deliveryDays, 'days').format('dddd, MMMM D');


        cartSummaryHTML +=
        `
        <div class="cart-item-containesr js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id = "${matchingProduct.id}">
                    Update
                    </span>
                    <input class = 'quantity-input js-quantity-input-${matchingProduct.id}'>
                    <span
                    class = 'save-quantity-link link-primary js-save-link'
                    data-product-id = "${matchingProduct.id}">
                    Save
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProduct.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
            </div>
            </div>`

    });



    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

    document.querySelectorAll('.js-delete-link').forEach((link) => {
        link.addEventListener('click', (event) => {
            const productId = link.dataset.productId;
            removeFromCart(productId);

            document.querySelector(`.js-cart-item-container-${productId}`).remove();

            UpdateCartQuantity();
            renderPaymentSummary();
        });
    });

    document.querySelectorAll('.js-update-link').forEach((link) => {
        link.addEventListener('click', (event) => {
            const productId = link.dataset.productId;

            document.querySelector(`.js-cart-item-container-${productId} `).classList.add('is-editing-quantity');


        });
    });

    document.querySelectorAll('.js-save-link').forEach((link) => {

        link.addEventListener('click', () => {
            const productId = link.dataset.productId;


            const quantityInput = document.querySelector(
                `.js-quantity-input-${productId}`
            );
            
            const newQuantity = Number(quantityInput.value);

            if (newQuantity < 0 || newQuantity >= 1000) {
                alert('Quantity must be at least 0 and less than 1000');
                return;
            }

            document.querySelector(`.js-cart-item-container-${productId} `).classList.remove('is-editing-quantity');

            document.querySelector('.quantity-label').textContent = newQuantity;

            updateQuantity(productId,newQuantity);

            UpdateCartQuantity();   

        });
    });

    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', (event) => {

            const {productId, deliveryOptionId} = element.dataset;

            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    })
    
}


