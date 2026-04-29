// Simulate cart count (demo purpose)
let cartCount = 0;

function addToCart() {
  cartCount++;
  document.querySelector(".cart-count").textContent = cartCount;
}

// Example: simulate adding item every 3 seconds (demo feel)
setInterval(() => {
  if (cartCount < 3) {
    addToCart();
  }
}, 3000);

// Add to cart animation + counter
const cartCountEl = document.querySelector(".cart-count");
let count = 0;

document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    count++;
    cartCountEl.textContent = count;

    // Animation effect
    button.textContent = "Added!";
    button.style.background = "#25D366";

    setTimeout(() => {
      button.textContent = "Add to Cart";
      button.style.background = "#000";
    }, 1000);
  });
});
