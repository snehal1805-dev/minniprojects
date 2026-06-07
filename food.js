// Cart array
let cart = [];

// Select all "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll(".add-to-cart");

// Attach event listeners
addToCartButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const card = button.parentElement;
    const itemName = card.querySelector("h2").innerText;
    const itemPrice = parseFloat(card.querySelector("p").innerText.replace("$", ""));
    
    // Add item to cart
    cart.push({ name: itemName, price: itemPrice });
    displayCart();
  });
});

// Display cart items
function displayCart() {
  const cartContainer = document.querySelector(".cart-items");
  cartContainer.innerHTML = ""; // clear old content

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty 🛒</p>";
    document.querySelector(".cart-total h3").innerText = "Total: $0.00";
    return;
  }

  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <h4>${item.name}</h4>
      <p>$${item.price.toFixed(2)}</p>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;

    cartContainer.appendChild(cartItem);
  });

  // Update total
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.querySelector(".cart-total h3").innerText = `Total: $${total.toFixed(2)}`;
}

// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  displayCart();
}

// Checkout button
document.querySelector(".checkout").addEventListener("click", async () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  document.querySelector(".cart-total h3").innerText = "Processing order... ⏳";

  // Simulate server delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const orderId = "ORD" + Math.floor(Math.random() * 10000);
  document.querySelector(".cart-total h3").innerText = `✅ Order Confirmed! ID: ${orderId}`;

  // Clear cart
  cart = [];
  displayCart();
});


// Ordered history array
let orderedHistory = [];

document.querySelector(".checkout").addEventListener("click", async () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  document.querySelector(".cart-total h3").innerText = "Processing order... ⏳";

  // Simulate server delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const orderId = "ORD" + Math.floor(Math.random() * 10000);

  // Save current cart items into ordered history
  orderedHistory.push({
    id: orderId,
    date: new Date().toLocaleString(),
    items: [...cart]
  });

  // Show confirmation
  document.querySelector(".cart-total h3").innerText = `✅ Order Confirmed! ID: ${orderId}`;

  // Clear cart
  cart = [];
  displayCart();

  // Update ordered foods section
  displayOrderedFoods();
});

// Display ordered foods permanently
function displayOrderedFoods() {
  const orderedContainer = document.querySelector(".ordered-list");
  orderedContainer.innerHTML = "";

  if (orderedHistory.length === 0) {
    orderedContainer.innerHTML = "<p>No orders yet.</p>";
    return;
  }

  orderedHistory.forEach(order => {
    const orderDiv = document.createElement("div");
    orderDiv.classList.add("order-entry");

    let itemsHtml = order.items.map(i => `${i.name} ($${i.price})`).join(", ");

    orderDiv.innerHTML = `
      <h4>Order ID: ${order.id}</h4>
      <p>Date: ${order.date}</p>
      <p>Items: ${itemsHtml}</p>
    `;

    orderedContainer.appendChild(orderDiv);
  });
}



// Checkout button
document.querySelector(".checkout").addEventListener("click", async () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Play sound
  const sound = new Audio("sounds/checkout.mp3");
  sound.play();

  document.querySelector(".cart-total h3").innerText = "Processing order... ⏳";

  // Simulate server delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const orderId = "ORD" + Math.floor(Math.random() * 10000);
  document.querySelector(".cart-total h3").innerText = `✅ Order Confirmed! ID: ${orderId}`;

  // Clear cart
  cart = [];
  displayCart();

  // Update ordered foods section
  displayOrderedFoods();
});



