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
   * Carousel drag functionality and infinite loop
   */
  function initCarouselDrag() {
    const carouselContainer = document.querySelector('.brands-showcase');
    const carouselTracks = document.querySelectorAll('.carousel-track');
    
    if (!carouselContainer || !carouselTracks.length) return;

    // Pause on hover functionality
    carouselContainer.addEventListener('mouseenter', () => {
      carouselTracks.forEach(track => {
        track.style.animationPlayState = 'paused';
      });
    });

    carouselContainer.addEventListener('mouseleave', () => {
      carouselTracks.forEach(track => {
        if (!track.isDragging) {
          track.style.animationPlayState = 'running';
        }
      });
    });
    
    carouselTracks.forEach(track => {
      let isDragging = false;
      let startX = 0;
      let currentTranslate = 0;
      let prevTranslate = 0;
      let animationId = null;
      let currentIndex = 0;
      
      track.isDragging = false;

      // Mouse events
      track.addEventListener('mousedown', startDrag);
      document.addEventListener('mousemove', drag);
      document.addEventListener('mouseup', endDrag);

      // Touch events
      track.addEventListener('touchstart', startDrag, { passive: false });
      track.addEventListener('touchmove', drag, { passive: false });
      track.addEventListener('touchend', endDrag);

      // Prevent context menu
      track.addEventListener('contextmenu', e => e.preventDefault());

      function startDrag(e) {
        if (e.type === 'mousedown' && e.button !== 0) return;
        
        isDragging = true;
        track.isDragging = true;
        track.style.animationPlayState = 'paused';
        track.style.cursor = 'grabbing';
        
        const clientX = getPositionX(e);
        startX = clientX;
        prevTranslate = getCurrentTranslate();
        
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        
        e.preventDefault();
      }

      function drag(e) {
        if (!isDragging) return;
        
        const currentPosition = getPositionX(e);
        currentTranslate = prevTranslate + currentPosition - startX;
        setSliderPosition();
        
        e.preventDefault();
      }

      function endDrag() {
        if (!isDragging) return;
        
        isDragging = false;
        track.isDragging = false;
        track.style.cursor = 'grab';
        
        // Resume animation after a short delay
        setTimeout(() => {
          if (!track.isDragging) {
            track.style.animationPlayState = 'running';
          }
        }, 500);
      }

      function getPositionX(e) {
        return e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      }

      function getCurrentTranslate() {
        const style = window.getComputedStyle(track);
        const matrix = style.transform;
        if (matrix === 'none') return 0;
        
        const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');
        return parseFloat(matrixValues[4]) || 0;
      }

      function setSliderPosition() {
        track.style.transform = `translateX(${currentTranslate}px)`;
      }

      // Set initial cursor
      track.style.cursor = 'grab';
    });

    // Fix infinite loop by ensuring proper animation setup
    setTimeout(() => {
      carouselTracks.forEach(track => {
        track.style.animationPlayState = 'running';
      });
    }, 100);
  }

  window.addEventListener("load", initCarouselDrag);

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