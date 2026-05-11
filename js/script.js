// Mobile Menu Toggle
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
});

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

// Change main product image
function changeImage(element) {
  document.getElementById("main-image").src = element.src;
}

// Cart calculation
function updateCart() {
  let subtotal = 0;

  document.querySelectorAll(".cart-item").forEach((item) => {
    const price = parseInt(item.dataset.price);
    const qty = parseInt(item.querySelector(".qty").textContent);

    subtotal += price * qty;
  });

  const delivery = subtotal > 500 ? 0 : 50;
  const total = subtotal + delivery;

  document.getElementById("subtotal").textContent = "R" + subtotal;
  document.getElementById("delivery").textContent = "R" + delivery;
  document.getElementById("total").textContent = "R" + total;
}

// Quantity buttons
document.querySelectorAll(".plus").forEach((btn) => {
  btn.addEventListener("click", () => {
    let qtyEl = btn.parentElement.querySelector(".qty");
    qtyEl.textContent = parseInt(qtyEl.textContent) + 1;
    updateCart();
  });
});

document.querySelectorAll(".minus").forEach((btn) => {
  btn.addEventListener("click", () => {
    let qtyEl = btn.parentElement.querySelector(".qty");
    let qty = parseInt(qtyEl.textContent);

    if (qty > 1) {
      qtyEl.textContent = qty - 1;
      updateCart();
    }
  });
});

// Remove item
document.querySelectorAll(".remove").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.remove();
    updateCart();
  });
});

// Initial calculation
updateCart();

// FAQ Accordion
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

// ==============================
// ⬆ Scroll To Top Button
// ==============================

const scrollTopBtn = document.getElementById("scrollTopBtn");

// Show button when scrolling
window.addEventListener("scroll", () => {

  if (window.pageYOffset > 300) {

    scrollTopBtn.classList.add("show");

  } else {

    scrollTopBtn.classList.remove("show");

  }

});

// Scroll to top
scrollTopBtn.addEventListener("click", () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});
