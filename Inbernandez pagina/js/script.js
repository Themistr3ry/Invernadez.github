// Scroll to Top Button Functionality
document.addEventListener('DOMContentLoaded', () => {
  // Create the button element
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollToTopBtn.className = 'scroll-to-top';
  scrollToTopBtn.setAttribute('aria-label', 'Volver arriba');
  
  // Add styles dynamically to avoid editing all CSS files
  Object.assign(scrollToTopBtn.style, {
    position: 'fixed',
    bottom: '40px',
    left: '40px', // Left side to avoid conflict with WhatsApp button
    width: '50px',
    height: '50px',
    backgroundColor: '#003366', // Dark blue matching theme
    color: '#ffffff',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'none', // Hidden by default
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
    zIndex: '1000',
    transition: 'opacity 0.3s, transform 0.3s'
  });

  // Hover effects
  scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'scale(1.1)';
    scrollToTopBtn.style.backgroundColor = '#004080';
  });
  scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'scale(1)';
    scrollToTopBtn.style.backgroundColor = '#003366';
  });

  document.body.appendChild(scrollToTopBtn);

  // Show/Hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.style.display = 'flex';
      setTimeout(() => scrollToTopBtn.style.opacity = '1', 10);
    } else {
      scrollToTopBtn.style.opacity = '0';
      setTimeout(() => {
        if (window.scrollY <= 300) scrollToTopBtn.style.display = 'none';
      }, 300);
    }
  });

  // Scroll to top action
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // --- CAROUSEL LOGIC ---
  let slideIndex = 1;
  const slides = document.getElementsByClassName("carousel-slide");
  const dots = document.getElementsByClassName("dot");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  // Only run if carousel exists
  if (slides.length > 0) {
    showSlides(slideIndex);

    // Auto advance slides every 5 seconds
    let slideInterval = setInterval(() => {
      plusSlides(1);
    }, 8000);

    // Button event listeners
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        plusSlides(-1);
        resetInterval();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        plusSlides(1);
        resetInterval();
      });
    }

    // Dot event listeners
    // We need to expose currentSlide globally or attach listeners here
    // Since onclick="currentSlide(n)" is in HTML, let's define it globally
    window.currentSlide = function(n) {
      showSlides(slideIndex = n);
      resetInterval();
    }

    function plusSlides(n) {
      showSlides(slideIndex += n);
    }

    function showSlides(n) {
      let i;
      if (n > slides.length) {slideIndex = 1}
      if (n < 1) {slideIndex = slides.length}
      
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].classList.remove("active");
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      
      slides[slideIndex-1].style.display = "block";
      // Small timeout to allow display:block to apply before adding opacity transition class if needed
      setTimeout(() => {
         slides[slideIndex-1].classList.add("active");
      }, 10);
      
      if (dots.length > 0) {
        dots[slideIndex-1].className += " active";
      }
    }

    function resetInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(() => {
        plusSlides(1);
      }, 8000);
    }
  }
});
