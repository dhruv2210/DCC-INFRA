// Local JS extracted and consolidated

// Add 'no-touch' class for non-touch devices
(function () {
  if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    var root = document.getElementsByTagName('html')[0];
    if (root && root.className.indexOf('no-touch') === -1) {
      root.className += ' no-touch';
    }
  }
})();

// Initialize Revolution Slider if available
function setREVStartSize(e) {
  try {
    var pw = document.getElementById(e.c).parentNode.offsetWidth, newh;
    pw = pw === 0 || isNaN(pw) || (e.l === 'fullwidth' || e.layout === 'fullwidth') ? window.innerWidth : pw;
    e.tabw = e.tabw === undefined ? 0 : parseInt(e.tabw);
    e.thumbw = e.thumbw === undefined ? 0 : parseInt(e.thumbw);
    e.tabh = e.tabh === undefined ? 0 : parseInt(e.tabh);
    e.thumbh = e.thumbh === undefined ? 0 : parseInt(e.thumbh);
    e.tabhide = e.tabhide === undefined ? 0 : parseInt(e.tabhide);
    e.thumbhide = e.thumbhide === undefined ? 0 : parseInt(e.thumbhide);
    e.mh = e.mh === undefined || e.mh === '' || e.mh === 'auto' ? 0 : parseInt(e.mh, 0);
    if (e.layout === 'fullscreen' || e.l === 'fullscreen') newh = Math.max(e.mh, window.innerHeight);
    else {
      e.gw = Array.isArray(e.gw) ? e.gw : [e.gw];
      for (var i in e.rl) if (e.gw[i] === undefined || e.gw[i] === 0) e.gw[i] = e.gw[i - 1];
      e.gh = e.el === undefined || e.el === '' || (Array.isArray(e.el) && e.el.length === 0) ? e.gh : e.el;
      e.gh = Array.isArray(e.gh) ? e.gh : [e.gh];
      for (var j in e.rl) if (e.gh[j] === undefined || e.gh[j] === 0) e.gh[j] = e.gh[j - 1];
      var nl = new Array(e.rl.length), ix = 0, sl;
      e.tabw = e.tabhide >= pw ? 0 : e.tabw;
      e.thumbw = e.thumbhide >= pw ? 0 : e.thumbw;
      e.tabh = e.tabhide >= pw ? 0 : e.tabh;
      e.thumbh = e.thumbhide >= pw ? 0 : e.thumbh;
      for (var k in e.rl) nl[k] = e.rl[k] < window.innerWidth ? 0 : e.rl[k];
      sl = nl[0];
      for (var m in nl) if (sl > nl[m] && nl[m] > 0) { sl = nl[m]; ix = m; }
      var mlt = pw > (e.gw[ix] + e.tabw + e.thumbw) ? 1 : (pw - (e.tabw + e.thumbw)) / (e.gw[ix]);
      newh = (e.gh[ix] * mlt) + (e.tabh + e.thumbh);
    }
    var el = document.getElementById(e.c);
    if (el) el.style.height = newh + 'px';
    el = document.getElementById(e.c + '_wrapper');
    if (el) { el.style.height = newh + 'px'; el.style.display = 'block'; }
  } catch (err) {
    console.log('Failure at Presize of Slider:', err);
  }
}

// Mobile Navigation Toggle
(function initMobileNav() {
  var navControl = document.querySelector('.w-nav-control');
  var navList = document.querySelector('.w-nav-list.level_1');
  
  if (navControl && navList) {
    navControl.addEventListener('click', function(e) {
      e.preventDefault();
      navList.classList.toggle('show');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navControl.contains(e.target) && !navList.contains(e.target)) {
        navList.classList.remove('show');
      }
    });
  }
})();

// Initialize simple carousels if owl is present
(function initCarousels() {
  if (typeof jQuery === 'undefined') return;
  var $ = jQuery;
  $(function () {
    if ($.fn.owlCarousel) {
      $('#us_grid_1 .w-grid-list').owlCarousel({ items: 4, loop: true, dots: true, nav: true, responsive: {0:{items:1},600:{items:2},900:{items:3},1200:{items:4}} });
      $('#us_grid_2 .w-grid-list').owlCarousel({ items: 5, loop: true, dots: true, nav: true, responsive: {0:{items:2},600:{items:3},900:{items:4},1200:{items:5}} });
    }
  });
})();

// Smooth scroll for back to top
(function initSmoothScroll() {
  var topLink = document.querySelector('.w-toplink');
  if (topLink) {
    topLink.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Show/hide back to top button
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        topLink.style.display = 'flex';
      } else {
        topLink.style.display = 'none';
      }
    });
  }
})();

// Enhanced Carousel Functionality
(function initEnhancedCarousels() {
  // Products Carousel
  const productsCarousel = document.querySelector('.carousel-container');
  const productCards = document.querySelectorAll('.product-card');
  const prevBtn = document.querySelector('.carousel-btn.prev-btn');
  const nextBtn = document.querySelector('.carousel-btn.next-btn');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  
  let currentProductIndex = 0;
  const cardsPerView = window.innerWidth > 768 ? 4 : 1;
  
  if (productsCarousel && productCards.length > 0) {
    function updateProductsCarousel() {
      const cardWidth = productCards[0].offsetWidth + 30; // width + gap
      const translateX = -currentProductIndex * cardWidth;
      productsCarousel.style.transform = `translateX(${translateX}px)`;
      
      // Update dots
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentProductIndex);
      });
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (productCards.length <= cardsPerView) {
          // If all products fit, cycle through them
          currentProductIndex = (currentProductIndex - 1 + productCards.length) % productCards.length;
        } else {
          currentProductIndex = Math.max(0, currentProductIndex - 1);
        }
        updateProductsCarousel();
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (productCards.length <= cardsPerView) {
          // If all products fit, cycle through them
          currentProductIndex = (currentProductIndex + 1) % productCards.length;
        } else {
          currentProductIndex = Math.min(productCards.length - cardsPerView, currentProductIndex + 1);
        }
        updateProductsCarousel();
      });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentProductIndex = index;
        updateProductsCarousel();
      });
    });
    
    // Auto-play carousel
    setInterval(() => {
      if (productCards.length <= cardsPerView) {
        // If all products fit, cycle through them
        currentProductIndex = (currentProductIndex + 1) % productCards.length;
      } else {
        if (currentProductIndex < productCards.length - cardsPerView) {
          currentProductIndex++;
        } else {
          currentProductIndex = 0;
        }
      }
      updateProductsCarousel();
    }, 5000);
  }
  
  // Testimonials Carousel
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const testimonialPrevBtn = document.querySelector('.testimonial-btn.prev-btn');
  const testimonialNextBtn = document.querySelector('.testimonial-btn.next-btn');
  const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
  
  let currentTestimonialIndex = 0;
  
  if (testimonialCards.length > 0) {
    function updateTestimonialsCarousel() {
      testimonialCards.forEach((card, index) => {
        card.classList.toggle('active', index === currentTestimonialIndex);
      });
      
      testimonialDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTestimonialIndex);
      });
    }
    
    if (testimonialPrevBtn) {
      testimonialPrevBtn.addEventListener('click', () => {
        currentTestimonialIndex = currentTestimonialIndex === 0 ? testimonialCards.length - 1 : currentTestimonialIndex - 1;
        updateTestimonialsCarousel();
      });
    }
    
    if (testimonialNextBtn) {
      testimonialNextBtn.addEventListener('click', () => {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialCards.length;
        updateTestimonialsCarousel();
      });
    }
    
    // Testimonial dot navigation
    testimonialDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentTestimonialIndex = index;
        updateTestimonialsCarousel();
      });
    });
    
    // Auto-play testimonials
    setInterval(() => {
      currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialCards.length;
      updateTestimonialsCarousel();
    }, 6000);
  }
})();

// Smooth Navigation Scrolling
(function initSmoothNavigation() {
  const navLinks = document.querySelectorAll('.w-nav-anchor[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerHeight = document.querySelector('.l-header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const mobileMenu = document.querySelector('.w-nav-list.level_1');
        if (mobileMenu && mobileMenu.classList.contains('show')) {
          mobileMenu.classList.remove('show');
        }
      }
    });
  });
})();

// Form Handling
(function initFormHandling() {
  const contactForm = document.querySelector('.inquiry-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const name = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const phone = this.querySelector('input[type="tel"]').value;
      const product = this.querySelector('select').value;
      const message = this.querySelector('textarea').value;
      
      // Simple validation
      if (!name || !email || !phone || !product || !message) {
        alert('Please fill in all fields.');
        return;
      }
      
      // Simulate form submission
      const submitBtn = this.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<span class="btn-icon">⏳</span><span>Sending...</span>';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        alert('Thank you for your inquiry! We will contact you soon.');
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }
})();

// Intersection Observer for Animations
(function initScrollAnimations() {
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
  
  // Observe elements for animation
  const animatedElements = document.querySelectorAll('.product-card, .area-card, .testimonial-card, .client-card, .info-card');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
})();

// Enhanced Mobile Responsiveness
(function initMobileEnhancements() {
  function handleResize() {
    const isMobile = window.innerWidth <= 768;
    const heroStats = document.querySelector('.hero-stats');
    const contactContent = document.querySelector('.contact-content');
    
    if (heroStats) {
      if (isMobile) {
        heroStats.style.flexDirection = 'column';
        heroStats.style.gap = '15px';
      } else {
        heroStats.style.flexDirection = 'row';
        heroStats.style.gap = '30px';
      }
    }
    
    if (contactContent) {
      if (isMobile) {
        contactContent.style.gridTemplateColumns = '1fr';
        contactContent.style.gap = '40px';
      } else {
        contactContent.style.gridTemplateColumns = '1fr 1fr';
        contactContent.style.gap = '60px';
      }
    }
  }
  
  window.addEventListener('resize', handleResize);
  handleResize(); // Initial call
})();

// Hero Carousel Functionality
(function initHeroCarousel() {
  const heroSlides = document.querySelectorAll('.hero-slide');
  const prevBtn = document.querySelector('.hero-nav-btn.prev-btn');
  const nextBtn = document.querySelector('.hero-nav-btn.next-btn');
  const indicators = document.querySelectorAll('.indicator');
  
  let currentSlide = 0;
  const totalSlides = heroSlides.length;
  
  function showSlide(index) {
    heroSlides.forEach((slide, i) => {
      slide.classList.remove('active', 'prev');
      if (i === index) {
        slide.classList.add('active');
      } else if (i < index) {
        slide.classList.add('prev');
      }
    });
    
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
  }
  
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });
  
  // Auto-play carousel
  setInterval(nextSlide, 6000);
})();

// Product Popup Modals
(function initProductModals() {
  const productModal = document.getElementById('product-modal');
  const aboutModal = document.getElementById('about-modal');
  const welcomeAboutModal = document.getElementById('welcome-about-modal');
  const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
  const aboutReadMoreBtn = document.querySelector('.about-read-more-btn');
  const welcomeReadMoreBtn = document.querySelector('.welcome-read-more-btn');
  const closeBtns = document.querySelectorAll('.close-btn');
  
  const productData = {
    'office-building': {
      title: 'Office Building',
      description: 'With the firm commitment to quality, we are offering sustainable spectrum of Portable Office to our esteemed patrons. The entire product-line is fabricated using high-grade raw material, which is sourced from the most reliable vendor in the market.',
      features: [
        'Modular construction',
        'Portable',
        'Easy to erect',
        'Ideal for site office/mini office and office extensions',
        'Suitable for all types of thermal condition'
      ],
      specifications: {
        'Length': 'No limited',
        'Width': 'Less than 15m',
        'Wall height': '3000mm',
        'Clear height': '2600mm',
        'Roof slope': '1:5',
        'Earthquake resistant': '6 degree',
        'Temperature range': '-25°C to +50°C',
        'Wind load': '9 degree',
        'Design speed': '24m/S',
        'Thickness': '1.0mm to 5.00mm'
      }
    },
    'labour-quarter': {
      title: 'Labour Quarter',
      description: 'With the constant support of our competent professionals, we can offer attractive Portable Labour Quarter to patrons as per their detailed specifications. We design the provided labor quarters as per the latest trend and manufacture these by utilizing premium grade material.',
      features: [
        'In line with industry-set quality standards',
        'Suitable for all types of thermal conditions',
        'Excellent finish',
        'Sturdy construction'
      ],
      specifications: {
        'Overall weight': '50-60KG/SQM',
        'Seismic fortification': '8 grade',
        'Wind speed': '20m/s, resist 8 grade wind'
      }
    },
    'boundary-wall': {
      title: 'Boundary Wall',
      description: 'A boundary wall is an ideal space to add some greenery to your compound. To ensure the safeguarding of various go-down areas or storage areas, we are engaged in manufacturing and supplying best-grade boundary walls.',
      features: [
        'Fine shape',
        'Everlasting performance',
        'Long lasting durability',
        'Sturdy construction',
        'Conventional designs',
        'Qualitative material'
      ],
      specifications: {
        'Beams': '8×8 inches (200mm x 200mm), PCC steel with 4 mm and per beams 8 pieces',
        'Plank': 'Length 7 feet, Height 1 feet, Width 2 inches (65mm), PCC steel with 4 mm and per sheet 4 pieces'
      }
    },
    'compound-wall': {
      title: 'Compound Wall',
      description: 'Compound Wall which are produced by us are specially designed which are available in various designs and colors. Our Designs are widely used for Developing, Commercial, Municipal facilities, Utilities, and Road Projects which are suitable for secure fencing and screening walls.',
      features: [
        'Quality assured by structural engineers',
        'Cost-effective',
        'Fastest Installation',
        'Re-Installable',
        'Economical Compared to Conventional Products',
        'Ready in a Single Day',
        'Easily erected',
        'Less Space is Required',
        'Plastering not required',
        'Space saving – JUST 1½" thick – Equally Strong'
      ],
      specifications: {
        'Height options': '4ft, 6ft, 8ft, and 10ft',
        'Beam height': '6ft, 8ft, and 10ft',
        'Material': 'RCC with Steel reinforcement',
        'Installation': 'Single day completion'
      }
    }
  };
  
  function showProductModal(productId) {
    const product = productData[productId];
    if (!product) return;
    
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    modalTitle.textContent = product.title;
    
    modalContent.innerHTML = `
      <div class="product-modal-content">
       
        <div class="product-modal-details">
          <h3>${product.title}</h3>
          <p>${product.description}</p>
          
          <h4>Key Features:</h4>
          <ul class="product-features-list">
            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
          </ul>
          
          <div class="product-specifications">
            <h4>Specifications:</h4>
            ${Object.entries(product.specifications).map(([key, value]) => 
              `<p><strong>${key}:</strong> ${value}</p>`
            ).join('')}
          </div>
        </div>
      </div>
    `;
    
    productModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
  
  function showAboutModal() {
    aboutModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
  
  function showWelcomeAboutModal() {
    welcomeAboutModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
  
  function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
  
  // Event listeners
  learnMoreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const productId = btn.getAttribute('data-product');
      showProductModal(productId);
    });
  });
  
  if (aboutReadMoreBtn) {
    aboutReadMoreBtn.addEventListener('click', showAboutModal);
  }
  
  if (welcomeReadMoreBtn) {
    welcomeReadMoreBtn.addEventListener('click', showWelcomeAboutModal);
  }
  
  closeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal');
      closeModal(modal);
    });
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      closeModal(e.target);
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModal = document.querySelector('.modal[style*="block"]');
      if (openModal) {
        closeModal(openModal);
      }
    }
  });
})();


