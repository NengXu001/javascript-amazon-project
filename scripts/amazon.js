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
            $${(product.priceCents / 100).toFixed(2)}
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


// add-to-cart button functionality
document.querySelectorAll('.js-add-to-cart').forEach((button) =>{
    
    let timeout1;

    button.addEventListener('click', () => {
        // cancel the last timeout if the user click again
        if (timeout1) {
            clearTimeout(timeout1);
        }

        const productId = button.dataset.productId;

        //count the number of items in the cart
        let matchingItem;

        cart.forEach((item) => {
            if (item.productId === productId) {
                matchingItem = item;
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

    // isplay the number of products in the cart.
    let cartCount = 0;  
    cart.forEach((item) => {
        cartCount += item.quantity;
    });

    document.querySelector('.js-cart-quantity').textContent = cartCount;

    //added-to-cart sign
    document.querySelector(`.added-to-cart-opacity-${productId}`).classList.add('added-to-cart-opacity-active');

    timeout1 = setTimeout(() => {
        document.querySelector(`.added-to-cart-opacity-${productId}`).classList.remove('added-to-cart-opacity-active');
    }, 2000);

    // clearTimeout(timeout1);

    

    });
});
