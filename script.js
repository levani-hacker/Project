const cart = [];
const emptyCartButton = document.querySelector('.empty-cart-button');
const addCartButtons = document.querySelectorAll('.product button');

addCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-product-name');
        const productPrice = parseFloat(button.getAttribute('data-product-price'));
        addToCart(productName, productPrice);
    });
});

emptyCartButton.addEventListener('click', () => {
    emptyCart();
});

function addToCart(productName, price) {
    const item = {
        name: productName,
        price: price,
        quantity: 1
    };

    const existingItem = cart.find((item) => item.name === productName);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(item);
    }

    displayCart();
}

function emptyCart() {
    cart.length = 0;
    displayCart();
}

function displayCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPrice = document.getElementById('total-price');

    cartItemsContainer.innerHTML = '';
    totalPrice.textContent = '$0';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        let total = 0;

        cart.forEach((item) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <img src="product-image.jpg" alt="${item.name}">
                <span>${item.name}</span>
                <span>$${item.price}</span>
                <span>${item.quantity}</span>
                <button data-product-name="${item.name}">Remove</button>
            `;

            const removeButton = itemDiv.querySelector('button');
            removeButton.addEventListener('click', () => {
                removeFromCart(item.name);
            });

            cartItemsContainer.appendChild(itemDiv);
            total += item.price * item.quantity;
        });

        totalPrice.textContent = `$${total}`;
    }
}

function removeFromCart(productName) {
    const itemIndex = cart.findIndex((item) => item.name === productName);

    if (itemIndex !== -1) {
        cart[itemIndex].quantity--;
        if (cart[itemIndex].quantity === 0) {
            cart.splice(itemIndex, 1);
        }
    }

    displayCart();
}

displayCart();
