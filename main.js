/* REVEAL */
const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.2 });

reveals.forEach(el => revealObserver.observe(el));

/* ACTIVE NAV */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".menu a");

const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  const navHeight = nav.offsetHeight;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const link = document.querySelector(
      `.menu a[href="#${section.id}"]`
    );

    if (rect.top <= navHeight + 20 && rect.bottom > navHeight + 20) {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
});

const form = document.querySelector(".contact-form");

if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const btn = form.querySelector("button");
    btn.innerText = "Message Sent ✓";
    btn.style.background = "#4caf50";
  });
}
const counters = document.querySelectorAll('.stat h3');

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.innerText);
            let count = 0;

            const update = () => {
                count += Math.ceil(target / 40);
                if (count < target) {
                    el.innerText = count + '+';
                    requestAnimationFrame(update);
                } else {
                    el.innerText = target + '+';
                }
            };
            update();
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.6 });

counters.forEach(c => counterObserver.observe(c));


/* HERO TEXT + IMAGE ROTATION */
const words = ["Branding", "Website", "Digital Design"];
const textEl = document.querySelector(".changing-text");
const images = document.querySelectorAll(".hero-img");

let index = 0;

setInterval(() => {
  // Text animation
  textEl.classList.remove("fade");
  void textEl.offsetWidth;
  textEl.textContent = words[index];
  textEl.classList.add("fade");

  // Image switch
  images.forEach(img => img.classList.remove("active"));
  images[index].classList.add("active");

  index = (index + 1) % words.length;
}, 3500);


// Simple parallax for hero image (desktop only)
const img = document.querySelector('.hero-right img');

window.addEventListener('mousemove', (e) => {
  if (window.innerWidth < 1100) return;

  const x = (window.innerWidth / 2 - e.clientX) / 40;
  const y = (window.innerHeight / 2 - e.clientY) / 40;

  img.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
});





const tools = [
    {name:"Photoshop", color:"#31A8FF"},
    {name:"Illustrator", color:"#FF9A00"},
    {name:"InDesign", color:"#FF3366"},
    {name:"CorelDRAW", color:"#00B140"},
    {name:"After Effects", color:"#9999FF"},
    {name:"Premiere Pro", color:"#9999FF"}
];

const typedText = document.getElementById("typed-text");

let toolIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentTool = tools[toolIndex];
    const currentName = currentTool.name;

    if (!isDeleting) {
        typedText.textContent = currentName.substring(0, charIndex + 1);
        typedText.style.color = currentTool.color;
        charIndex++;

        if (charIndex === currentName.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }
    } else {
        typedText.textContent = currentName.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            toolIndex = (toolIndex + 1) % tools.length;
        }
    }

    setTimeout(typeEffect, isDeleting ? 60 : 100);
}

typeEffect();








const clientColumns = document.querySelectorAll(".client-column");

clientColumns.forEach(column => {

  // Duplicate content for infinite scroll
  column.innerHTML += column.innerHTML;

  let position = 0;
  const speed = parseFloat(column.dataset.speed);

  function smoothScroll() {
    position -= speed;

    if (Math.abs(position) >= column.scrollHeight / 2) {
      position = 0;
    }

    column.style.transform = `translateY(${position}px)`;
    requestAnimationFrame(smoothScroll);
  }

  smoothScroll();
});








document.getElementById("whatsappForm").addEventListener("submit", function(e){
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    let phoneNumber = "919679648166"; 

    let whatsappMessage = 
    `Hello Niladri,%0A%0A` +
    `Name: ${name}%0A` +
    `Email: ${email}%0A` +
    `Project Details: ${message}`;

    let url = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

    window.open(url, '_blank');
});




const cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});







 window.addEventListener("load", function () {
    const loader = document.getElementById("page-loader");

    setTimeout(() => {
      loader.classList.add("hidden");
    }, 1200); // adjust timing here
  });






/* ================= MOBILE NAVIGATION SYSTEM ================= */

document.addEventListener("DOMContentLoaded", function () {

  const toggle = document.getElementById("mobileToggle");
  const menu = document.querySelector(".menu");
  const menuLinks = document.querySelectorAll(".menu a");

  if (!toggle || !menu) return;

  // Toggle open / close
  toggle.addEventListener("click", function () {
    toggle.classList.toggle("active");
    menu.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  });

  // Close when clicking a menu link
  menuLinks.forEach(link => {
    link.addEventListener("click", function () {
      toggle.classList.remove("active");
      menu.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });
  });

  // Close when clicking outside
  document.addEventListener("click", function (e) {
    const isClickInsideMenu = menu.contains(e.target);
    const isClickOnToggle = toggle.contains(e.target);

    if (!isClickInsideMenu && !isClickOnToggle) {
      toggle.classList.remove("active");
      menu.classList.remove("active");
      document.body.classList.remove("no-scroll");
    }
  });

  // Close on ESC key (premium UX)
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      toggle.classList.remove("active");
      menu.classList.remove("active");
      document.body.classList.remove("no-scroll");
    }
  });

});