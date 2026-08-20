/* =========================================================
   CRYSTAL MOBILE BEAUTICIAN
   SERVICES + BOOKING SYSTEM
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
       BOOKING STATE
    ===================================================== */

  let selectedServices = [];

  let selectedDate = null;

  let selectedTime = null;

  /* =====================================================
       ELEMENTS
    ===================================================== */

  const serviceButtons = document.querySelectorAll(".add-service");

  const serviceCards = document.querySelectorAll(".booking-service");

  const continueService = document.getElementById("continue-service");

  const continueDate = document.getElementById("continue-date");

  const backDate = document.getElementById("back-date");

  const backReview = document.getElementById("back-review");

  const confirmBooking = document.getElementById("confirm-booking");

  const bookingDate = document.getElementById("booking-date");

  const timeSlots = document.getElementById("time-slots");

  const reviewServices = document.getElementById("review-services");

  const reviewDate = document.getElementById("review-date");

  const reviewTime = document.getElementById("review-time");

  const reviewDuration = document.getElementById("review-duration");

  const reviewTotal = document.getElementById("review-total");

  const bookingReference = document.getElementById("booking-reference");

  const confirmationDate = document.getElementById("confirmation-date");

  const confirmationTime = document.getElementById("confirmation-time");

  const confirmationTotal = document.getElementById("confirmation-total");

  /* =====================================================
       BOOKING STEPS
    ===================================================== */

  const steps = [
    document.getElementById("step-service"),
    document.getElementById("step-date"),
    document.getElementById("step-review"),
    document.getElementById("step-confirmation"),
  ];

  const progressSteps = document.querySelectorAll(".progress-step");

  /* =====================================================
       CHECK ELEMENTS
    ===================================================== */

  if (!steps[0]) {
    console.warn("Booking system not found on this page.");

    return;
  }

  /* =====================================================
       SHOW STEP
    ===================================================== */

  function showStep(stepNumber) {
    steps.forEach((step, index) => {
      if (!step) return;

      step.classList.toggle("active", index === stepNumber - 1);
    });

    /* Update progress */

    progressSteps.forEach((step, index) => {
      step.classList.remove("active");
      step.classList.remove("completed");

      if (index === stepNumber - 1) {
        step.classList.add("active");
      }

      if (index < stepNumber - 1) {
        step.classList.add("completed");
      }
    });

    /* Scroll to booking section */

    const bookingSection = document.querySelector(".booking-page");

    if (bookingSection) {
      bookingSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  /* =====================================================
       FORMAT CURRENCY
    ===================================================== */

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 0,
    }).format(amount);
  }

  /* =====================================================
       FORMAT DURATION
    ===================================================== */

  function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);

    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${remainingMinutes} min`;
    }

    if (remainingMinutes === 0) {
      return `${hours} hr`;
    }

    return `${hours} hr ${remainingMinutes} min`;
  }

  /* =====================================================
       CALCULATE TOTAL
    ===================================================== */

  function calculateTotals() {
    const totalPrice = selectedServices.reduce(
      (total, service) => total + service.price,
      0,
    );

    const totalDuration = selectedServices.reduce(
      (total, service) => total + service.duration,
      0,
    );

    return {
      totalPrice,
      totalDuration,
    };
  }

  /* =====================================================
       UPDATE SERVICE BUTTONS
    ===================================================== */

  function updateServiceButtons() {
    serviceCards.forEach((card) => {
      const serviceName = card.dataset.name;

      const button = card.querySelector(".add-service");

      const selected = selectedServices.some(
        (service) => service.name === serviceName,
      );

      card.classList.toggle("selected", selected);

      if (selected) {
        button.textContent = "Added";
      } else {
        button.textContent = "Add";
      }
    });

    /* Enable Continue button */

    if (continueService) {
      continueService.disabled = selectedServices.length === 0;
    }
  }

  /* =====================================================
       ADD / REMOVE SERVICE
    ===================================================== */

  serviceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".booking-service");

      if (!card) return;

      const service = {
        name: card.dataset.name,

        price: Number(card.dataset.price),

        duration: Number(card.dataset.duration),
      };

      const existingIndex = selectedServices.findIndex(
        (item) => item.name === service.name,
      );

      /* Remove */

      if (existingIndex !== -1) {
        selectedServices.splice(existingIndex, 1);
      } else {

      /* Add */
        selectedServices.push(service);
      }

      updateServiceButtons();
    });
  });

  /* =====================================================
       STEP 1 → STEP 2
    ===================================================== */

  if (continueService) {
    continueService.addEventListener("click", () => {
      if (selectedServices.length === 0) {
        return;
      }

      showStep(2);

      setupDatePicker();
    });
  }

  /* =====================================================
       DATE PICKER
    ===================================================== */

  function setupDatePicker() {
    if (!bookingDate) return;

    const today = new Date();

    const year = today.getFullYear();

    const month = String(today.getMonth() + 1).padStart(2, "0");

    const day = String(today.getDate()).padStart(2, "0");

    const todayString = `${year}-${month}-${day}`;

    bookingDate.min = todayString;

    /* Set default date */

    if (!bookingDate.value) {
      bookingDate.value = todayString;

      generateTimeSlots();
    }
  }

  /* =====================================================
       DATE CHANGE
    ===================================================== */

  if (bookingDate) {
    bookingDate.addEventListener("change", () => {
      selectedDate = bookingDate.value;

      selectedTime = null;

      generateTimeSlots();

      if (continueDate) {
        continueDate.disabled = true;
      }
    });
  }

  /* =====================================================
       GENERATE TIME SLOTS
    ===================================================== */

  function generateTimeSlots() {
    if (!timeSlots) return;

    timeSlots.innerHTML = "";

    if (!bookingDate.value) {
      timeSlots.innerHTML = `
                <p class="time-placeholder">
                    Select a date to view available times.
                </p>
            `;

      return;
    }

    selectedDate = bookingDate.value;

    /*
           Demo working hours:

           09:00 - 17:00

           30-minute intervals
        */

    const startHour = 9;

    const endHour = 17;

    const interval = 30;

    const slots = [];

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        slots.push({
          hour,
          minute,
        });
      }
    }

    slots.forEach((slot) => {
      const button = document.createElement("button");

      button.type = "button";

      button.className = "time-slot";

      const hour = slot.hour.toString().padStart(2, "0");

      const minute = slot.minute.toString().padStart(2, "0");

      button.textContent = `${hour}:${minute}`;

      button.addEventListener("click", () => {
        document
          .querySelectorAll(".time-slot")
          .forEach((btn) => btn.classList.remove("selected"));

        button.classList.add("selected");

        selectedTime = button.textContent;

        if (continueDate) {
          continueDate.disabled = false;
        }
      });

      timeSlots.appendChild(button);
    });
  }

  /* =====================================================
       STEP 2 → STEP 3
    ===================================================== */

  if (continueDate) {
    continueDate.addEventListener("click", () => {
      if (!selectedDate || !selectedTime) {
        return;
      }

      populateReview();

      showStep(3);
    });
  }

  /* =====================================================
       POPULATE REVIEW
    ===================================================== */

  function populateReview() {
    if (!reviewServices) return;

    reviewServices.innerHTML = "";

    selectedServices.forEach((service) => {
      const serviceElement = document.createElement("div");

      serviceElement.className = "review-service";

      serviceElement.innerHTML = `

                    <div>

                        <span class="review-service-name">
                            ${service.name}
                        </span>

                        <span class="review-service-duration">

                            ${formatDuration(service.duration)}

                        </span>

                    </div>

                    <span class="review-service-price">

                        ${formatCurrency(service.price)}

                    </span>

                `;

      reviewServices.appendChild(serviceElement);
    });

    /* Totals */

    const totals = calculateTotals();

    if (reviewDuration) {
      reviewDuration.textContent = formatDuration(totals.totalDuration);
    }

    if (reviewTotal) {
      reviewTotal.textContent = formatCurrency(totals.totalPrice);
    }

    /* Date */

    if (reviewDate) {
      reviewDate.textContent = formatDate(selectedDate);
    }

    /* Time */

    if (reviewTime) {
      reviewTime.textContent = selectedTime;
    }
  }

  /* =====================================================
       FORMAT DATE
    ===================================================== */

  function formatDate(dateString) {
    if (!dateString) {
      return "—";
    }

    const date = new Date(dateString + "T00:00:00");

    return date.toLocaleDateString("en-ZA", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  /* =====================================================
       STEP 3 → STEP 4
    ===================================================== */

  if (confirmBooking) {
    confirmBooking.addEventListener("click", () => {
      generateConfirmation();

      showStep(4);
    });
  }

  /* =====================================================
       GENERATE CONFIRMATION
    ===================================================== */

  function generateConfirmation() {
    const totals = calculateTotals();

    const reference = generateBookingReference();

    if (bookingReference) {
      bookingReference.textContent = reference;
    }

    if (confirmationDate) {
      confirmationDate.textContent = formatDate(selectedDate);
    }

    if (confirmationTime) {
      confirmationTime.textContent = selectedTime;
    }

    if (confirmationTotal) {
      confirmationTotal.textContent = formatCurrency(totals.totalPrice);
    }
  }

  /* =====================================================
       BOOKING REFERENCE
    ===================================================== */

  function generateBookingReference() {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);

    return `CMB-${randomNumber}`;
  }

  /* =====================================================
       BACK BUTTON — STEP 2
    ===================================================== */

  if (backDate) {
    backDate.addEventListener("click", () => {
      showStep(1);
    });
  }

  /* =====================================================
       BACK BUTTON — STEP 3
    ===================================================== */

  if (backReview) {
    backReview.addEventListener("click", () => {
      showStep(2);
    });
  }

  /* =====================================================
       BACK TO SERVICES
    ===================================================== */

  const backToServices = document.querySelector(".back-services");

  if (backToServices) {
    backToServices.addEventListener("click", (event) => {
      /*
                    We allow the link to work normally
                    if it points somewhere else.
                */

      const target = backToServices.getAttribute("href");

      if (target === "#services") {
        event.preventDefault();

        const bookingSection = document.querySelector(".booking-page");

        if (bookingSection) {
          bookingSection.style.display = "none";
        }

        const servicesSection = document.querySelector("#services");

        if (servicesSection) {
          servicesSection.style.display = "block";

          servicesSection.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    });
  }

  /* =====================================================
       INITIALIZE
    ===================================================== */

  updateServiceButtons();
});
