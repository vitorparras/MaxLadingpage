/**
* Template Name: KnightOne
* Template URL: https://bootstrapmade.com/knight-simple-one-page-bootstrap-template/
* Updated: Oct 16 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Carousel infinite loop with drag functionality and WhatsApp integration
   */
  function initCarouselInfinite() {
    const carouselTracks = document.querySelectorAll('.carousel-track');
    
    if (!carouselTracks.length) return;

    carouselTracks.forEach((track, index) => {
      // Clone items for true infinite loop - create 4 sets for perfect seamless experience
      const originalItems = [...track.children];
      const itemWidth = originalItems[0] ? originalItems[0].offsetWidth + 30 : 280; // Include gap
      const totalWidth = originalItems.length * itemWidth;
      
      // Create 4 complete sets for ultra-smooth infinite scrolling
      for (let i = 0; i < 3; i++) {
        originalItems.forEach(item => {
          const clone = item.cloneNode(true);
          track.appendChild(clone);
        });
      }
      
      // Drag functionality state
      let isDragging = false;
      let startPos = 0;
      let currentTranslate = -totalWidth * 2; // Start at middle set (2nd of 4 sets)
      let prevTranslate = -totalWidth * 2;
      let animationId;
      let isHovered = false;
      let hasMoved = false;
      let clickStartTime = 0;
      
      // Get direction and reduced speed for elegant movement
      const direction = track.getAttribute('data-direction') === 'left' ? 1 : -1;
      const speed = 0.2; // Significantly reduced speed for elegant, smooth movement
      
      // Set initial position
      track.style.transform = `translateX(${currentTranslate}px)`;
      track.style.cursor = 'grab';
      
      // Animation loop for continuous movement with perfect infinite loop
      function animate() {
        if (!isDragging && !isHovered) {
          currentTranslate += direction * speed;
          
          // Perfect seamless loop repositioning with 4 sets
          // Reposition when reaching the boundaries of middle sets
          if (currentTranslate <= -totalWidth * 3) {
            // Jump from end of 3rd set to end of 1st set
            currentTranslate = -totalWidth;
          } else if (currentTranslate >= -totalWidth) {
            // Jump from beginning of 1st set to beginning of 3rd set
            currentTranslate = -totalWidth * 3;
          }
          
          track.style.transform = `translateX(${currentTranslate}px)`;
        }
        requestAnimationFrame(animate);
      }
      
      // Start animation
      requestAnimationFrame(animate);
      
      // Hover control - pause animation smoothly
      track.addEventListener('mouseenter', () => {
        isHovered = true;
      });

      track.addEventListener('mouseleave', () => {
        if (!isDragging) {
          isHovered = false;
        }
      });

      // Touch events for mobile
      track.addEventListener('touchstart', dragStart, { passive: false });
      track.addEventListener('touchmove', dragMove, { passive: false });
      track.addEventListener('touchend', dragEnd);

      // Mouse events for desktop
      track.addEventListener('mousedown', dragStart);
      track.addEventListener('mousemove', dragMove);
      track.addEventListener('mouseup', dragEnd);
      track.addEventListener('mouseleave', (e) => {
        if (isDragging) {
          dragEnd(e);
        } else {
          isHovered = false;
        }
      });

      function dragStart(e) {
        isDragging = true;
        isHovered = true;
        hasMoved = false;
        clickStartTime = Date.now();
        track.style.cursor = 'grabbing';
        
        startPos = getPositionX(e);
        prevTranslate = currentTranslate;
        
        track.style.transition = 'none';
        
        // Prevent click events during drag preparation
        e.preventDefault();
      }

      function dragMove(e) {
        if (!isDragging) return;
        
        const currentPosition = getPositionX(e);
        const diff = currentPosition - startPos;
        
        // Mark as moved if significant movement
        if (Math.abs(diff) > 5) {
          hasMoved = true;
        }
        
        currentTranslate = prevTranslate + diff;
        
        // Handle infinite loop during drag with 4 sets
        if (currentTranslate <= -totalWidth * 3.5) {
          // Seamlessly jump from end of 4th set to middle of 2nd set
          currentTranslate = -totalWidth * 1.5 + (currentTranslate + totalWidth * 3.5);
          prevTranslate = currentTranslate - diff;
          startPos = currentPosition; // Reset start position for smooth continuation
        } else if (currentTranslate >= -totalWidth * 0.5) {
          // Seamlessly jump from beginning of 1st set to middle of 3rd set
          currentTranslate = -totalWidth * 2.5 + (currentTranslate + totalWidth * 0.5);
          prevTranslate = currentTranslate - diff;
          startPos = currentPosition; // Reset start position for smooth continuation
        }
        
        track.style.transform = `translateX(${currentTranslate}px)`;
        e.preventDefault();
      }

      function dragEnd(e) {
        if (!isDragging) return;
        
        isDragging = false;
        track.style.cursor = 'grab';
        
        // Add gentle momentum if dragged with speed
        const dragTime = Date.now() - clickStartTime;
        const currentPosition = getPositionX(e);
        const dragDistance = currentPosition - startPos;
        
        if (hasMoved && dragTime < 300 && Math.abs(dragDistance) > 50) {
          // Add reduced momentum for smoother, more elegant movement
          const momentum = (dragDistance / dragTime) * 4; // Reduced momentum multiplier
          currentTranslate += momentum;
          
          // Handle infinite loop after momentum with 4 sets
          if (currentTranslate <= -totalWidth * 3.5) {
            currentTranslate = -totalWidth * 1.5 + (currentTranslate + totalWidth * 3.5);
          } else if (currentTranslate >= -totalWidth * 0.5) {
            currentTranslate = -totalWidth * 2.5 + (currentTranslate + totalWidth * 0.5);
          }
        }
        
        // Ensure position stays within safe bounds for infinite loop
        if (currentTranslate <= -totalWidth * 3) {
          currentTranslate = -totalWidth;
        } else if (currentTranslate >= -totalWidth) {
          currentTranslate = -totalWidth * 3;
        }
        
        // Smooth transition back to automatic movement
        track.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'; // More elegant easing
        track.style.transform = `translateX(${currentTranslate}px)`;
        
        // Reset transition and allow automatic movement - CORRIGIDO para mobile
        setTimeout(() => {
          track.style.transition = 'none';
          // Garantir que a animação retome após interação touch no mobile
          isHovered = false;
          prevTranslate = currentTranslate;
          hasMoved = false; // Reset para permitir cliques normais
        }, 500);
        
        // Para dispositivos touch, garantir que a animação retome
        if ('ontouchstart' in window) {
          setTimeout(() => {
            isHovered = false;
          }, 1000); // Delay adicional para touch devices
        }
      }

      function getPositionX(e) {
        return e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      }
      
      // WhatsApp integration for all brand items (including clones)
      function setupWhatsAppIntegration() {
        const allBrandItems = track.querySelectorAll('.brand-item');
        
        allBrandItems.forEach(item => {
          // Extract brand name from title
          const brandTitle = item.querySelector('.brand-title');
          const brandName = brandTitle ? brandTitle.textContent.trim() : 'esta marca';
          
          // Remove any existing event listeners
          const newItem = item.cloneNode(true);
          item.parentNode.replaceChild(newItem, item);
          
          // Add click handler for WhatsApp
          newItem.addEventListener('click', (e) => {
            // Only trigger if not dragging and didn't move
            if (!isDragging && !hasMoved && isHovered) {
              e.preventDefault();
              e.stopPropagation();
              
              const message = `Olá, vi que vocês trabalham com a marca ${brandName} e gostaria de saber mais sobre os serviços relacionados.`;
              const encodedMessage = encodeURIComponent(message);
              const whatsappUrl = `https://wa.me/5511999999999?text=${encodedMessage}`;
              
              window.open(whatsappUrl, '_blank');
            }
          });
          
          // Add hover effects
          newItem.addEventListener('mouseenter', () => {
            if (!isDragging) {
              newItem.style.transform = 'translateY(-8px) scale(1.02)';
              newItem.style.filter = 'brightness(1.05)';
              newItem.style.transition = 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)';
              newItem.style.cursor = 'pointer';
            }
          });
          
          newItem.addEventListener('mouseleave', () => {
            newItem.style.transform = 'translateY(0) scale(1)';
            newItem.style.filter = 'none';
            newItem.style.cursor = 'grab';
          });
          
          // Prevent drag on individual items
          newItem.addEventListener('dragstart', (e) => {
            e.preventDefault();
          });
        });
      }
      
      // Setup WhatsApp integration after cloning
      setupWhatsAppIntegration();
    });
  }

  window.addEventListener("load", initCarouselInfinite);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Floating labels functionality
   */
  function initFloatingLabels() {
    const formGroups = document.querySelectorAll('.contact .form-group');
    
    formGroups.forEach(group => {
      const input = group.querySelector('input, textarea');
      const label = group.querySelector('label');
      
      if (input && label) {
        // Check if input has value on page load
        if (input.value.trim() !== '') {
          label.classList.add('active');
        }
        
        // Handle focus and blur events
        input.addEventListener('focus', () => {
          label.classList.add('active');
        });
        
        input.addEventListener('blur', () => {
          if (input.value.trim() === '') {
            label.classList.remove('active');
          }
        });
        
        // Handle input events
        input.addEventListener('input', () => {
          if (input.value.trim() !== '') {
            label.classList.add('active');
          } else {
            label.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('load', initFloatingLabels);

})();