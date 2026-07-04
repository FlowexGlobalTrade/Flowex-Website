// --- CONFIGURATION ---
// Get your free Web3Forms Access Key from https://web3forms.com
const WEB3FORMS_ACCESS_KEY = "5b00aa41-c3bc-4625-9c9b-ef798b37686a"; 

document.addEventListener('DOMContentLoaded', () => {
  // --- ELEMENTS ---
  const htmlElement = document.documentElement;
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeDropdown = document.getElementById('theme-dropdown');
  const activeThemeIcon = document.getElementById('active-theme-icon');
  const activeThemeText = document.getElementById('active-theme-text');
  
  // Theme Options
  const themeLightBtn = document.getElementById('theme-light');
  const themeDarkBtn = document.getElementById('theme-dark');
  const themeSystemBtn = document.getElementById('theme-system');

  // SPA Navigation
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
  const sections = {
    home: document.getElementById('home-section'),
    about: document.getElementById('about-section'),
    products: document.getElementById('products-section'),
    services: document.getElementById('services-section'),
    contact: document.getElementById('contact-section'),
  };

  // Modals & Triggers
  const inquiryModal = document.getElementById('inquiry-modal');
  const inquiryForm = document.getElementById('inquiry-form');
  const contactInquiryForm = document.getElementById('contact-inquiry-form');
  const brochureForm = document.getElementById('brochure-form');
  
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalCancelBtn = document.getElementById('modal-cancel-btn');
  const modalProductSelect = document.getElementById('inquiry-product');
  const successToast = document.getElementById('success-toast');
  const toastTitle = document.getElementById('toast-title');
  const toastSubtitle = document.getElementById('toast-subtitle');
  const getQuoteBtns = document.querySelectorAll('.get-quote-btn');

  // Info Modals (Policies & FAQs)
  const infoModal = document.getElementById('info-modal');
  const infoModalTitle = document.getElementById('info-modal-title');
  const infoModalBody = document.getElementById('info-modal-body');
  const infoModalCloseBtn = document.getElementById('info-modal-close-btn');

  // --- THEME LOGIC (LIGHT, DARK, SYSTEM) ---
  const applyTheme = (theme) => {
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }

    // Update UI selector icons
    let iconHTML = '';
    let text = 'System';
    if (theme === 'light') {
      iconHTML = `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>`;
      text = 'Light';
    } else if (theme === 'dark') {
      iconHTML = `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>`;
      text = 'Dark';
    } else {
      iconHTML = `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`;
      text = 'System';
    }
    
    if (activeThemeIcon) activeThemeIcon.innerHTML = iconHTML;
    if (activeThemeText) activeThemeText.textContent = text;
  };

  // Initialize Theme
  const savedTheme = localStorage.getItem('theme') || 'system';
  applyTheme(savedTheme);

  // System Theme change listener
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (localStorage.getItem('theme') === 'system') {
      applyTheme('system');
    }
  });

  // Dropdown Toggles
  if (themeToggleBtn && themeDropdown) {
    themeToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      themeDropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', () => {
      themeDropdown.classList.add('hidden');
    });
  }

  if (themeLightBtn) {
    themeLightBtn.addEventListener('click', () => {
      localStorage.setItem('theme', 'light');
      applyTheme('light');
    });
  }
  if (themeDarkBtn) {
    themeDarkBtn.addEventListener('click', () => {
      localStorage.setItem('theme', 'dark');
      applyTheme('dark');
    });
  }
  if (themeSystemBtn) {
    themeSystemBtn.addEventListener('click', () => {
      localStorage.setItem('theme', 'system');
      applyTheme('system');
    });
  }

  // --- STATS COUNTER ANIMATION ---
  const animateStats = (sectionId) => {
    const statsElements = sections[sectionId].querySelectorAll('.stat-count');
    statsElements.forEach(el => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      let count = 0;
      const speed = target / 40; // increment step
      el.textContent = "0";

      const updateCount = () => {
        count += speed;
        if (count < target) {
          el.textContent = Math.floor(count);
          setTimeout(updateCount, 25);
        } else {
          el.textContent = target;
        }
      };
      updateCount();
    });
  };

  // --- SPA ROUTING LOGIC ---
  const navigateTo = (targetId) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Handle Mobile Menu Close
    if (mobileMenu) {
      mobileMenu.classList.add('hidden');
      mobileMenuBtn.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>`;
    }

    // Toggle active sections
    if (sections[targetId]) {
      Object.keys(sections).forEach(key => {
        sections[key].classList.remove('active');
      });
      sections[targetId].classList.add('active');

      // Update indicators
      navLinks.forEach(link => {
        link.classList.remove('text-sky-600', 'dark:text-sky-400', 'border-b-2', 'border-sky-500');
        if (link.getAttribute('data-target') === targetId) {
          link.classList.add('text-sky-600', 'dark:text-sky-400', 'border-b-2', 'border-sky-500');
        }
      });

      mobileNavLinks.forEach(link => {
        link.classList.remove('text-sky-500', 'border-l-2', 'border-sky-500', 'pl-2');
        if (link.getAttribute('data-target') === targetId) {
          link.classList.add('text-sky-500', 'border-l-2', 'border-sky-500', 'pl-2');
        }
      });

      // Trigger stats animations on pages with counters
      if (targetId === 'home' || targetId === 'contact') {
        animateStats(targetId);
      }
    }
  };

  // Make navigateTo globally accessible so inline attributes can call it
  window.navigateTo = navigateTo;

  // Nav Link Click Handlers
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-target');
      navigateTo(target);
    });
  });

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-target');
      navigateTo(target);
    });
  });

  // Default redirect to home page
  navigateTo('home');

  // --- MOBILE NAV MENU TOGGLE ---
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.toggle('hidden');
      mobileMenuBtn.innerHTML = isHidden 
        ? `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>`
        : `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`;
    });
  }

  // --- MODAL CONTROLS (INQUIRY & QUOTE) ---
  const openInquiryModal = (productName = '') => {
    inquiryModal.classList.remove('hidden');
    inquiryModal.classList.add('flex');
    document.body.style.overflow = 'hidden'; 
    
    if (productName && modalProductSelect) {
      modalProductSelect.value = productName;
    } else if (modalProductSelect) {
      modalProductSelect.value = 'General Quote';
    }
  };

  const closeInquiryModal = () => {
    inquiryModal.classList.add('hidden');
    inquiryModal.classList.remove('flex');
    document.body.style.overflow = '';
    inquiryForm.reset();
  };

  window.openInquiryModal = openInquiryModal;

  getQuoteBtns.forEach(btn => {
    btn.addEventListener('click', () => openInquiryModal('General Quote'));
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeInquiryModal);
  if (modalCancelBtn) modalCancelBtn.addEventListener('click', closeInquiryModal);
  
  if (inquiryModal) {
    inquiryModal.addEventListener('click', (e) => {
      if (e.target === inquiryModal) closeInquiryModal();
    });
  }

  // Toast notifier
  const showToast = (title = 'Inquiry Submitted', subtitle = 'Thank you. Our exports desk will contact you within 12 hours.') => {
    if (successToast) {
      if (toastTitle) toastTitle.textContent = title;
      if (toastSubtitle) toastSubtitle.textContent = subtitle;
      
      successToast.classList.remove('translate-y-24', 'opacity-0');
      successToast.classList.add('translate-y-0', 'opacity-100');
      
      setTimeout(() => {
        successToast.classList.remove('translate-y-0', 'opacity-100');
        successToast.classList.add('translate-y-24', 'opacity-0');
      }, 4000);
    }
  };

  // Inquiry Form Submissions
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE") {
        alert("Please set your Web3Forms Access Key at the top of src/js/main.js to enable form submissions.");
        return;
      }

      const name = document.getElementById('inquiry-name').value;
      const email = document.getElementById('inquiry-email').value;
      const company = document.getElementById('inquiry-company').value;
      const product = document.getElementById('inquiry-product').value;
      const message = document.getElementById('inquiry-message').value;

      const formData = {
        access_key: WEB3FORMS_ACCESS_KEY,
        name: name,
        email: email,
        company: company,
        product: product,
        message: message,
        subject: `New Export Inquiry: ${product} from ${company}`
      };

      const submitBtn = inquiryForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          showToast();
          closeInquiryModal();
        } else {
          console.error('Web3Forms Error:', data);
          alert('Submission failed: ' + (data.message || 'Please check your Access Key.'));
        }
      })
      .catch(error => {
        console.error('Error submitting inquiry:', error);
        alert('Could not submit inquiry automatically. Please email flowexglobaltrade@gmail.com directly.');
      })
      .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
    });
  }

  if (contactInquiryForm) {
    contactInquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE") {
        alert("Please set your Web3Forms Access Key at the top of src/js/main.js to enable form submissions.");
        return;
      }

      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const subjectLine = document.getElementById('contact-subject').value;
      const message = document.getElementById('contact-message').value;

      const formData = {
        access_key: WEB3FORMS_ACCESS_KEY,
        name: name,
        email: email,
        subject: `New Trade Inquiry: ${subjectLine}`,
        message: message
      };

      const submitBtn = contactInquiryForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          showToast();
          contactInquiryForm.reset();
        } else {
          console.error('Web3Forms Error:', data);
          alert('Submission failed: ' + (data.message || 'Please check your Access Key.'));
        }
      })
      .catch(error => {
        console.error('Error submitting contact form:', error);
        alert('Could not submit inquiry automatically. Please email flowexglobaltrade@gmail.com directly.');
      })
      .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
    });
  }

  if (brochureForm) {
    brochureForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE") {
        alert("Please set your Web3Forms Access Key at the top of src/js/main.js to enable form submissions.");
        return;
      }

      const email = brochureForm.querySelector('input[type="email"]').value;

      const formData = {
        access_key: WEB3FORMS_ACCESS_KEY,
        email: email,
        subject: 'Export Brochure Request',
        message: `Please send the export brochure to my email: ${email}`
      };

      const submitBtn = brochureForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          showToast();
          brochureForm.reset();
        } else {
          console.error('Web3Forms Error:', data);
          alert('Submission failed: ' + (data.message || 'Please check your Access Key.'));
        }
      })
      .catch(error => {
        console.error('Error requesting brochure:', error);
        alert('Could not submit request automatically. Please email flowexglobaltrade@gmail.com directly.');
      })
      .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
    });
  }

  // --- PRODUCTS GRID FILTERING (Slide 3) ---
  const productFilterBtns = document.querySelectorAll('.product-filter-btn');
  const productItems = document.querySelectorAll('.product-category-section');

  productFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button active states
      productFilterBtns.forEach(b => {
        b.classList.remove('active', 'bg-[#0a0a0a]', 'text-white', 'dark:bg-white', 'dark:text-black');
        b.classList.add('border', 'border-zinc-200', 'dark:border-zinc-800', 'text-zinc-500', 'dark:text-zinc-400');
      });

      btn.classList.add('active', 'bg-[#0a0a0a]', 'text-white', 'dark:bg-white', 'dark:text-black');
      btn.classList.remove('border', 'border-zinc-200', 'dark:border-zinc-800', 'text-zinc-500', 'dark:text-zinc-400');

      const filterVal = btn.getAttribute('data-filter');

      // Filter grid cards
      productItems.forEach(item => {
        if (filterVal === 'all' || item.getAttribute('data-category') === filterVal) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });



  // --- INFO MODAL DATA BINDING ---
  const infoContents = {
    'privacy-policy': {
      title: 'Privacy Policy',
      body: `
        <p class="mb-2 text-xs text-zinc-400">Last updated: June 4, 2026</p>
        <p class="mb-4">Flowex Global respects your privacy. This policy outlines how we handle the personal information provided via inquiries on our website.</p>
        <h4 class="font-bold mb-2 mt-4 text-zinc-900 dark:text-white uppercase tracking-wider text-[11px]">1. Data Collection</h4>
        <p class="mb-4">We collect information that you explicitly submit in our Inquiry forms, including your name, email, company name, and specific cargo trade requirements.</p>
        <h4 class="font-bold mb-2 mt-4 text-zinc-900 dark:text-white uppercase tracking-wider text-[11px]">2. Data Use</h4>
        <p class="mb-4">This data is solely used to process quote requests and coordinate shipping logs. We do not distribute database information to third parties.</p>
      `
    },
    'terms-of-service': {
      title: 'Terms of Service',
      body: `
        <p class="mb-2 text-xs text-zinc-400">Last updated: June 4, 2026</p>
        <p class="mb-4">By visiting our website and submitting corporate inquiries, you agree to comply with the terms set forth below.</p>
        <h4 class="font-bold mb-2 mt-4 text-zinc-900 dark:text-white uppercase tracking-wider text-[11px]">1. Commercial Inquiries Only</h4>
        <p class="mb-4">Our portal and specifications database are intended for B2B export evaluations. Spamming or malicious operations are strictly prohibited.</p>
        <h4 class="font-bold mb-2 mt-4 text-zinc-900 dark:text-white uppercase tracking-wider text-[11px]">2. Proforma Estimations</h4>
        <p class="mb-4">Online HSN catalog listings and product details are subject to regular updates based on market changes and shipping line quotes.</p>
      `
    },
    'shipping-policy': {
      title: 'Shipping & Logistics Policy',
      body: `
        <p class="mb-4">Flowex Global coordinates direct ocean container routing, customs clearance, and refrigerated transit loops across global ports.</p>
        <h4 class="font-bold mb-2 mt-4 text-zinc-900 dark:text-white uppercase tracking-wider text-[11px]">Incoterms Alignment</h4>
        <p class="mb-4">We actively transact under standard FOB (Free On Board), CIF (Cost, Insurance & Freight), and CFR (Cost and Freight) shipping terms. Specific client Incoterms parameters can be documented in individual contract agreements.</p>
        <h4 class="font-bold mb-2 mt-4 text-zinc-900 dark:text-white uppercase tracking-wider text-[11px]">Reefer Cold Chain</h4>
        <p class="mb-4">Fresh grapes and seasonal yields are packed in high-efficiency thermal reefer container shipments, maintaining 100% cold loop integrity from dispatch to port release.</p>
      `
    },
    'faq': {
      title: 'Frequently Asked Questions (FAQs)',
      body: `
        <div class="space-y-4">
          <div>
            <h5 class="font-bold text-zinc-900 dark:text-white">Q: Do you hold APEDA & ISO certifications?</h5>
            <p class="text-zinc-500 dark:text-zinc-400 mt-1">A: Yes, Flowex Global is an APEDA-registered exporter and complies with ISO 22000 food safety management certifications.</p>
          </div>
          <div>
            <h5 class="font-bold text-zinc-900 dark:text-white">Q: What is the typical lead time for bulk orders?</h5>
            <p class="text-zinc-500 dark:text-zinc-400 mt-1">A: Sourcing and port-level container loading typically require 7–10 working days, subject to the specific product and destination port distance.</p>
          </div>
          <div>
            <h5 class="font-bold text-zinc-900 dark:text-white">Q: Do you supply third-party inspections?</h5>
            <p class="text-zinc-500 dark:text-zinc-400 mt-1">A: Yes, pre-shipment inspections by SGS or other internationally accredited bodies can be scheduled on demand.</p>
          </div>
        </div>
      `
    }
  };

  const openInfoModal = (key) => {
    const data = infoContents[key];
    if (!data) return;

    infoModalTitle.textContent = data.title;
    infoModalBody.innerHTML = data.body;
    infoModal.classList.remove('hidden');
    infoModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  };

  const closeInfoModal = () => {
    infoModal.classList.add('hidden');
    infoModal.classList.remove('flex');
    document.body.style.overflow = '';
  };

  window.openInfoModal = openInfoModal;

  if (infoModalCloseBtn) infoModalCloseBtn.addEventListener('click', closeInfoModal);
  if (infoModal) {
    infoModal.addEventListener('click', (e) => {
      if (e.target === infoModal) closeInfoModal();
    });
  }

  // --- BACK TO TOP BUTTON LOGIC ---
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
      } else {
        backToTopBtn.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- SHARE WEBSITE LOGIC ---
  const shareBtn = document.getElementById('share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const shareData = {
        title: 'Flowex Global Trade LLP',
        text: 'Partner with Flowex Global Trade LLP for premium Indian agricultural commodity exports, including Grapes, Turmeric, Sugarcane Jaggery, Rice, and Textiles.',
        url: window.location.href
      };

      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          console.log('Share cancelled or failed:', err);
        }
      } else {
        // Fallback: Copy link to clipboard and show toast
        try {
          await navigator.clipboard.writeText(window.location.href);
          showToast('Link Copied', 'Website address copied to your clipboard!');
        } catch (err) {
          console.error('Failed to copy link:', err);
        }
      }
    });
  }
});
