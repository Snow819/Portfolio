const menuButton = document.getElementById("menuButton");
const menu = document.getElementById("menu");
const menuIcon = document.getElementById("menuIcon");

menuButton.addEventListener("click", () => {
  menu.classList.toggle("show");

  // toggle between hamburger and close icon
  if (menu.classList.contains("show")) {
    menuIcon.classList.remove("bi-list");
    menuIcon.classList.add("bi-x"); // close icon
  } else {
    menuIcon.classList.remove("bi-x");
    menuIcon.classList.add("bi-list"); // hamburger icon
  }
});

// carousel

class TestimonialCarousel {
  constructor() {
    this.currentSlide = 0;
    this.totalSlides = 7;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000;

    this.initializeElements();
    this.bindEvents();
    this.startAutoPlay();
  }

  initializeElements() {
    this.carousel = document.querySelector('.carousel-container');
    this.prevBtn = document.getElementById('prev');
    this.nextBtn = document.getElementById('next');
    this.dots = document.querySelectorAll('.dot');
  }

  bindEvents() {
    // Navigation buttons
    this.prevBtn.addEventListener('click', () => this.prevSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());

    // Dot indicators
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });

    // Touch/swipe support
    let startX = 0;
    let endX = 0;

    this.carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      this.pauseAutoPlay();
    });

    this.carousel.addEventListener('touchmove', (e) => {
      e.preventDefault();
    });

    this.carousel.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }
      this.startAutoPlay();
    });

    // Pause autoplay on hover
    const section = document.querySelector('.testimonial-section');
    section.addEventListener('mouseenter', () => this.pauseAutoPlay());
    section.addEventListener('mouseleave', () => this.startAutoPlay());
  }

  goToSlide(slideIndex) {
    this.currentSlide = slideIndex;
    this.updateCarousel();
    this.updateDots();
    this.resetAutoPlay();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateCarousel();
    this.updateDots();
    this.resetAutoPlay();
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateCarousel();
    this.updateDots();
    this.resetAutoPlay();
  }

  updateCarousel() {
    const translateX = -this.currentSlide * (100 / this.totalSlides);
    this.carousel.style.transform = `translateX(${translateX}%)`;
  }

  updateDots() {
    this.dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentSlide);
    });
  }

  startAutoPlay() {
    this.pauseAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDelay);
  }

  pauseAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  resetAutoPlay() {
    this.startAutoPlay();
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new TestimonialCarousel();
});

// Add some visual feedback animations
document.addEventListener('DOMContentLoaded', () => {
  // Add entrance animation
  const testimonialSection = document.querySelector('.testimonial-section');
  testimonialSection.style.opacity = '0';
  testimonialSection.style.transform = 'translateY(50px)';

  setTimeout(() => {
    testimonialSection.style.transition = 'all 0.8s ease';
    testimonialSection.style.opacity = '1';
    testimonialSection.style.transform = 'translateY(0)';
  }, 100);
});

// Add smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add intersection observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe contact cards for staggered animation
document.querySelectorAll('.contact-card').forEach(card => {
  observer.observe(card);
});

// Add click tracking for analytics (placeholder)
document.querySelectorAll('.contact-link, .social-link, .cta-button').forEach(link => {
  link.addEventListener('click', function () {
    // Analytics tracking would go here
    console.log(`Contact interaction: ${this.textContent.trim()}`);
  });
});

// Add copy to clipboard functionality for email and phone
function copyToClipboard(text, element) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = element.textContent;
    element.textContent = 'Copied!';
    element.style.color = '#ac04ac';

    setTimeout(() => {
      element.textContent = originalText;
      element.style.color = '';
    }, 2000);
  });
}

// Add click handlers for copy functionality
document.addEventListener('DOMContentLoaded', () => {
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

  emailLinks.forEach(link => {
    link.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      copyToClipboard(link.textContent.trim(), link);
    });
  });

  phoneLinks.forEach(link => {
    link.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      copyToClipboard(link.textContent.trim(), link);
    });
  });
});