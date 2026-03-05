
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      menuToggle.innerHTML = mainNav.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('#mainNav a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });

    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      // Hero parallax shapes
      document.querySelectorAll('.parallax-shape').forEach((shape, index) => {
        const speed = 0.03 + (index * 0.015);
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.01}deg)`;
      });
      
      // Doodle accents parallax
      document.querySelectorAll('.doodle-accent').forEach((doodle, index) => {
        const speed = 0.02 + (index * 0.01);
        doodle.style.transform = `translateY(${scrolled * speed}px)`;
      });
    });

    // Simple fade-in on scroll
    const fadeOnScroll = () => {
      const elements = document.querySelectorAll('.journey-stage, .program-item, .principle-item');
      
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight - 100) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
    };

    // Initialize elements for scroll animation
    document.querySelectorAll('.journey-stage, .program-item, .principle-item').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', fadeOnScroll);
    window.addEventListener('load', fadeOnScroll);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Header scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const header = document.querySelector('header');
      const currentScroll = window.pageYOffset;
      
      if (currentScroll <= 0) {
        header.style.boxShadow = 'none';
        return;
      }
      
      if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 20px rgba(15, 42, 68, 0.1)';
      } else {
        header.style.boxShadow = 'none';
      }
      
      lastScroll = currentScroll;
    });

  // ===== PERFORMANCE ARTS CAROUSEL =====
  const performanceSlides = document.querySelectorAll('.performance-slide');
  const backgroundSlides = document.querySelectorAll('.performance-bg-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  let currentSlide = 0;
  let autoPlayInterval;

  function goToSlide(index) {
    // Remove active class from all slides
    performanceSlides.forEach(slide => slide.classList.remove('active'));
    backgroundSlides.forEach(bg => bg.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide
    performanceSlides[index].classList.add('active');
    backgroundSlides[index].classList.add('active');
    dots[index].classList.add('active');
    
    currentSlide = index;
  }

  function nextSlide() {
    const next = (currentSlide + 1) % performanceSlides.length;
    goToSlide(next);
  }

  function prevSlide() {
    const prev = (currentSlide - 1 + performanceSlides.length) % performanceSlides.length;
    goToSlide(prev);
  }

  // Event listeners
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoPlay();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoPlay();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
      resetAutoPlay();
    });
  });

  // Auto-play functionality
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 6000); // Change slide every 6 seconds
  }

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }

  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  const carousel = document.querySelector('.performance-carousel');

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      nextSlide();
      resetAutoPlay();
    }
    if (touchEndX > touchStartX + 50) {
      prevSlide();
      resetAutoPlay();
    }
  }

  // Start auto-play when page loads
  startAutoPlay();

  // Pause on hover
  carousel.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
  });

  carousel.addEventListener('mouseleave', () => {
    startAutoPlay();
  });
