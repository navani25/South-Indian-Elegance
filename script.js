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
      navbar.classList.add('bg-background/90', 'backdrop-blur-lg', 'shadow-md', 'py-3', 'text-foreground');
      navbar.classList.remove('bg-transparent', 'py-5', 'text-white');
    } else {
      navbar.classList.add('bg-transparent', 'py-5', 'text-white');
      navbar.classList.remove('bg-background/90', 'backdrop-blur-lg', 'shadow-md', 'py-3', 'text-foreground');
    }
  });

  mobileMenuBtn.addEventListener('click', () => {
    mobileOpen = !mobileOpen;
    if (mobileOpen) {
      mobileMenu.classList.remove('hidden');
      mobileMenuBtn.innerHTML = '<i data-lucide="x"></i>';
    } else {
      mobileMenu.classList.add('hidden');
      mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
    }
    lucide.createIcons();
  });

  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileOpen = false;
      mobileMenu.classList.add('hidden');
      mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
      lucide.createIcons();
    });
  });

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
      
      // Remove toast
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    });
  }
});
