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

// Filter functionality
const filterButtons = document.querySelectorAll(".filter-btn");
const products = document.querySelectorAll(".product-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Active button
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.dataset.category;

    products.forEach((product) => {
      if (category === "all" || product.dataset.category === category) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  });
});
