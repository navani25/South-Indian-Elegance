// Initialize Lucide icons on page load
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  // --- Navbar Logic ---
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  let mobileOpen = false;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
      navbar.classList.remove('transparent');
    } else {
      navbar.classList.add('transparent');
      navbar.classList.remove('scrolled');
    }
  });

  mobileMenuBtn.addEventListener('click', () => {
    mobileOpen = !mobileOpen;
    if (mobileOpen) {
      mobileMenu.classList.add('open');
      mobileMenu.classList.remove('hidden');
      mobileMenuBtn.innerHTML = '<i data-lucide="x"></i>';
    } else {
      mobileMenu.classList.remove('open');
      setTimeout(() => mobileMenu.classList.add('hidden'), 300); // Wait for transition
      mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
    }
    lucide.createIcons();
  });

  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileOpen = false;
      mobileMenu.classList.remove('open');
      setTimeout(() => mobileMenu.classList.add('hidden'), 300);
      mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
      lucide.createIcons();
    });
  });

  // --- Dropdown Logic (Replaces Alpine.js) ---
  const serviceDropdownBtn = document.getElementById('service-dropdown');
  const serviceOptions = document.getElementById('service-options');
  const serviceInput = document.getElementById('service-input');
  const serviceSelectedText = document.getElementById('service-selected-text');
  const serviceChevron = document.getElementById('service-chevron');
  let dropdownOpen = false;

  if (serviceDropdownBtn && serviceOptions) {
    serviceDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownOpen = !dropdownOpen;
      if (dropdownOpen) {
        serviceOptions.classList.add('open');
        serviceChevron.classList.add('rotate-180');
      } else {
        serviceOptions.classList.remove('open');
        serviceChevron.classList.remove('rotate-180');
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
      if (dropdownOpen) {
        dropdownOpen = false;
        serviceOptions.classList.remove('open');
        serviceChevron.classList.remove('rotate-180');
      }
    });

    // Handle selection
    const items = serviceOptions.querySelectorAll('.dropdown-item');
    items.forEach(item => {
      item.addEventListener('click', (e) => {
        const value = e.target.getAttribute('data-value');
        serviceInput.value = value;
        serviceSelectedText.textContent = value || 'Select a service';
        dropdownOpen = false;
        serviceOptions.classList.remove('open');
        serviceChevron.classList.remove('rotate-180');
      });
    });
  }

  // --- Before/After Slider Logic ---
  const sliderContainer = document.getElementById('ba-slider');
  const beforeImage = document.getElementById('ba-before');
  const sliderLine = document.getElementById('ba-line');

  if (sliderContainer) {
    const handleMove = (clientX) => {
      const rect = sliderContainer.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      
      beforeImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
      sliderLine.style.left = `${percentage}%`;
    };

    let isDragging = false;

    sliderContainer.addEventListener('mousedown', (e) => {
      isDragging = true;
      handleMove(e.clientX);
    });
    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('mousemove', (e) => {
      if (isDragging) handleMove(e.clientX);
    });

    sliderContainer.addEventListener('touchstart', (e) => { handleMove(e.touches[0].clientX); }, {passive: true});
    sliderContainer.addEventListener('touchmove', (e) => { handleMove(e.touches[0].clientX); }, {passive: true});
    sliderContainer.addEventListener('click', (e) => { handleMove(e.clientX); });
  }

  // --- Booking Form Logic ---
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Show toast
      let toastContainer = document.getElementById('toast-container');
      if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        document.body.appendChild(toastContainer);
      }

      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = "Booking request sent! We'll contact you shortly.";
      toastContainer.appendChild(toast);
      
      // Reset form
      bookingForm.reset();
      serviceSelectedText.textContent = 'Select a service';
      serviceInput.value = '';
      
      // Remove toast
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    });
  }

  // --- Logo Modal Logic ---
  const navbarLogo = document.getElementById('navbar-logo');
  const footerLogo = document.getElementById('footer-logo');
  const logoModal = document.getElementById('logo-modal');
  const closeModal = document.getElementById('close-modal');

  function openLogoModal(e) {
    e.preventDefault();
    e.stopPropagation();
    if (logoModal) {
      logoModal.classList.add('open');
    }
  }

  function closeLogoModalAction() {
    if (logoModal) {
      logoModal.classList.remove('open');
    }
  }

  if (navbarLogo) navbarLogo.addEventListener('click', openLogoModal);
  if (footerLogo) footerLogo.addEventListener('click', openLogoModal);
  if (closeModal) closeModal.addEventListener('click', closeLogoModalAction);
  if (logoModal) {
    logoModal.addEventListener('click', (e) => {
      if (e.target === logoModal) closeLogoModalAction();
    });
  }
});
