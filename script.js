document.addEventListener("DOMContentLoaded", () => {
  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const sections = document.querySelectorAll('.fade-in-section');
  sections.forEach(section => {
    observer.observe(section);
  });

  // Navbar background change on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- CAROUSEL LOGIC ---
  // Store the state of each carousel track
  window.carouselState = {
    'track-coffee': { currentSlide: 0, totalSlides: 2 },
    'track-kitchen': { currentSlide: 0, totalSlides: 2 }
  };

  window.moveCarousel = (trackId, direction) => {
    const track = document.getElementById(trackId);
    if (!track) return;

    const state = window.carouselState[trackId];

    // Calculate new slide index
    state.currentSlide += direction;

    // Loop back around
    if (state.currentSlide < 0) {
      state.currentSlide = state.totalSlides - 1;
    } else if (state.currentSlide >= state.totalSlides) {
      state.currentSlide = 0;
    }

    // Apply transform (move by -100% per slide)
    const translateX = -(state.currentSlide * 100);
    track.style.transform = `translateX(${translateX}%)`;
  };

  // --- WHATSAPP RESERVATION LOGIC ---
  const reservationForm = document.getElementById('whatsapp-form');
  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent standard page reload

      const name = document.getElementById('res-name').value;
      const date = document.getElementById('res-date').value;
      const time = document.getElementById('res-time').value;
      const guests = document.getElementById('res-guests').value;

      // Ensure form fields are inherently validated by HTML5 'required' attribute

      const phone = "+60127023664"; // Placeholder Business Number

      // Construct the message
      const message = `Hello 117 Coffee Dine! I would like to make a reservation:
Name: ${name}
Date: ${date}
Time: ${time}
Guests: ${guests}

Looking forward to it!`;

      // URI Encode the message
      const encodedMessage = encodeURIComponent(message);

      // Redirect to WhatsApp
      const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank'); // Open in new tab

      // Optional: Clear form after opening link
      reservationForm.reset();
    });
  }

  // --- FEEDBACK FORM LOGIC ---
  const feedbackForm = document.getElementById('feedback-form');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const feedbackText = document.getElementById('feedback-text').value;

      // TODO: Replace GOOGLE_SCRIPT_URL with your actual Google Apps Script Web App URL
      // Example implementation:

      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx0F6RU4gS0_gaAkRhgwBt8LBaZMear5v1QiGKe_7XM5Tfji8xghIaQApOk3yHOLIFVng/exec';
      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // typical for simple google form sumbissions
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback: feedbackText })
      })


      // Simulate successful submission
      const statusText = document.getElementById('feedback-status');
      statusText.style.display = 'block';

      // Clear form
      feedbackForm.reset();

      // Hide success message after 4 seconds
      setTimeout(() => {
        statusText.style.display = 'none';
      }, 4000);
    });
  }

});
