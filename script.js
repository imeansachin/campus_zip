// Array to hold cart items
let cart = [];

// Function to update the cart display
function updateCart() {
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');
    
    // Clear current cart display
    cartItemsList.innerHTML = '';
    
    // Update the cart display with current items
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartItemsList.appendChild(li);
        total += parseFloat(item.price);
    });
    
    // Update total price and item count
    cartTotalElement.textContent = total.toFixed(2);
    cartCountElement.textContent = cart.length;
}

// Add event listeners to "Add to Cart" buttons
document.querySelectorAll('.product button').forEach(button => {
    button.addEventListener('click', event => {
        const productElement = event.target.parentElement;
        const productName = productElement.getAttribute('data-name');
        const productPrice = productElement.getAttribute('data-price');
        
        // Add product to cart array
        cart.push({ name: productName, price: productPrice });
        
        // Update the cart display
        updateCart();
    });
});

// Modal functionality
const cartModal = document.getElementById('cart-modal');
const cartLink = document.getElementById('cart-link');
const closeModal = document.querySelector('.close');

cartLink.addEventListener('click', () => {
    cartModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', event => {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Proceed to Order button
document.getElementById('proceed-btn').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const block = document.getElementById('block').value;
    const room = document.getElementById('room').value;
    const phone = document.getElementById('phone').value;

    if (name && block && room && phone) {
        let orderDetails = "Order Details:\n";
        
        // Append cart items to order details
        cart.forEach(item => {
            orderDetails += `${item.name} - $${item.price}\n`;
        });
        
        const total = document.getElementById('cart-total').textContent;
        orderDetails += `\nTotal: $${total}\n`;
        
        // Append address and phone number to order details
        orderDetails += `\nDelivery Address:\nName: ${name}\nHostel Block: ${block}\nRoom Number: ${room}\nPhone: ${phone}`;

        // Create a WhatsApp URL with the message
        const whatsappMessage = encodeURIComponent(orderDetails);
        const whatsappUrl = `https://wa.me/919507042837?text=${whatsappMessage}`;
        
        // Open WhatsApp with the message
        window.open(whatsappUrl, '_blank');
        
        // Clear the cart after sending the order
        cart = [];
        updateCart();
        
        // Close the cart modal
        cartModal.style.display = 'none';
    } else {
        alert('Please fill in all address fields.');
    }
});
