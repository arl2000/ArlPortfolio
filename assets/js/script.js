// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a nav link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Stop observing once it's visible
        }
    });
}, observerOptions);

// Observe all elements with the 'fade-in' or 'animate-pop-in' class
document.querySelectorAll('.fade-in, .animate-pop-in').forEach(element => {
    observer.observe(element);
});

// Ensure hero section is visible immediately so CSS typing is seen on load
window.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.classList.add('is-visible');
    }

    // Typing Effect for Greeting and Hero Name
    const greetingText = "Hi, I'm ";
    const nameText = "ARL";

    const greetingElement = document.getElementById("heroGreeting");
    const nameElement = document.getElementById("heroName");

    let gIndex = 0;
    let nIndex = 0;

    function typeGreeting() {
        if (gIndex < greetingText.length) {
            greetingElement.textContent += greetingText[gIndex];
            gIndex++;
            setTimeout(typeGreeting, 100); // Typing speed for greeting
        } else {
            typeName(); // Start typing name after greeting is done
        }
    }

    function typeName() {
        if (nIndex < nameText.length) {
            nameElement.textContent += nameText[nIndex];
            nIndex++;
            setTimeout(typeName, 150); // Typing speed for name
        }
    }

    typeGreeting();
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    // Header shadow on scroll
    const header = document.querySelector('.navbar');
    if (header) {
        if (scrolled > 10) header.classList.add('is-scrolled');
        else header.classList.remove('is-scrolled');
    }
    // Scroll progress bar
    const progress = document.getElementById('scrollProgress');
    if (progress) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const width = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
        progress.style.width = width + '%';
    }
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // Simple validation
    if (name && email && message) {
        alert('Message sent successfully!');
        contactForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Toggle code blocks and copy to clipboard
document.addEventListener('click', (e) => {
    const toggleBtn = e.target.closest('.btn-toggle');
    if (toggleBtn) {
        const card = toggleBtn.closest('.project-card');
        const code = card && card.querySelector('.code-block');
        if (code) {
            const isHidden = code.hasAttribute('hidden');
            if (isHidden) code.removeAttribute('hidden'); else code.setAttribute('hidden', '');
            toggleBtn.setAttribute('aria-expanded', String(isHidden));
            toggleBtn.textContent = isHidden ? 'Hide Code' : 'Show Code';
        }
    }

    const copyBtn = e.target.closest('.btn-copy');
    if (copyBtn) {
        const target = copyBtn.getAttribute('data-target');
        const codeEl = target ? document.querySelector(target) : null;
        const text = codeEl ? codeEl.innerText : '';
        if (text) {
            navigator.clipboard.writeText(text).then(() => {
                const original = copyBtn.textContent;
                copyBtn.textContent = 'Copied!';
                setTimeout(() => (copyBtn.textContent = original), 1200);
            });
        }
    }
});

// Simple tilt effect for project cards
document.querySelectorAll('[data-tilt]').forEach((card) => {
    let rect;
    const strength = 12;
    const reset = () => {
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
    };
    card.addEventListener('mouseenter', () => {
        rect = card.getBoundingClientRect();
        card.style.transition = 'transform 120ms ease-out';
    });
    card.addEventListener('mousemove', (e) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rx = ((y / rect.height) - 0.5) * -strength;
        const ry = ((x / rect.width) - 0.5) * strength;
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 240ms ease';
        reset();
    });
});

// Active nav highlight on scroll
const sections = Array.from(document.querySelectorAll('section[id]'));
const navLinks = Array.from(document.querySelectorAll('.nav-menu a'));
const activateLink = (id) => {
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
};

const onScrollSpy = () => {
    let current = sections[0]?.id;
    const scrollPos = window.scrollY + 120;
    for (const section of sections) {
        const top = section.offsetTop;
        if (scrollPos >= top) current = section.id;
    }
    if (current) activateLink(current);
};

window.addEventListener('scroll', onScrollSpy);
window.addEventListener('load', onScrollSpy);

//type scroll for elements
document.addEventListener("DOMContentLoaded", () => {
  // Only elements with .type-on-scroll will get typing effect
  const typerElements = document.querySelectorAll(".type-on-scroll");

  typerElements.forEach(el => {
    el.dataset.text = el.textContent.trim();
    el.textContent = ""; // clear initially
  });

  const typeText = (el) => {
    if (el.dataset.typed) return; // prevent retyping
    el.dataset.typed = "true";

    const text = el.dataset.text;
    let i = 0;

    const typeInterval = setInterval(() => {
      el.textContent += text.charAt(i);
      i++;
      if (i >= text.length) clearInterval(typeInterval);
    }, 60); // typing speed
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typeText(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  typerElements.forEach(el => observer.observe(el));
});

// Certificate modal
const modal = document.getElementById("certificateModal");
const modalImg = document.getElementById("certificateModalImg");
const captionText = document.getElementById("certificateCaption");
const closeBtn = document.querySelector(".certificate-close");

document.querySelectorAll(".certificate-card img").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.textContent = img.alt || img.nextElementSibling?.textContent || "";
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
