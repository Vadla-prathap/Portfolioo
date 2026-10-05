// footer year
document.getElementById('year').textContent = new Date().getFullYear();

// header shadow
const header = document.getElementById('header');
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

function onScroll(){
    header.classList.toggle('scrolled', window.scrollY > 20);

    let current = sections[0].id;
    const offset = 120;

    sections.forEach(section => {
        const top = section.offsetTop - offset;
        if (window.scrollY >= top) current = section.id;
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });

    const backToTop = document.getElementById('backToTop');
    backToTop.classList.toggle('visible', window.scrollY > 500);
}

window.addEventListener('scroll', onScroll);
onScroll();
// mobile toggle
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu after a link is tapped
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});

// back to top
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// scroll reveal
const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting){
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealItems.forEach(item => revealObserver.observe(item));

// tyyping role
const roles = ['Frontend Developer', 'UI Enthusiast', 'Lifelong Learner'];
const typedEl = document.getElementById('typedRole');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop(){
    const current = roles[roleIndex];

    if (!deleting){
        charIndex++;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length){
            deleting = true;
            setTimeout(typeLoop, 1400);
            return;
        }
    } else {
        charIndex--;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0){
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }
    setTimeout(typeLoop, deleting ? 45 : 90);
}

typeLoop();

// aniamteed stat
const statEls = document.querySelectorAll('.stat-num');

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        let count = 0;
        const step = Math.max(1, Math.ceil(target / 40));

        const timer = setInterval(() => {
            count += step;
            if (count >= target){
                count = target;
                clearInterval(timer);
            }
            el.textContent = count;
        }, 30);

        statObserver.unobserve(el);
    });
}, { threshold: 0.5 });

statEls.forEach(el => statObserver.observe(el));

// contact for validation
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

const fields = {
    name:    { el: document.getElementById('name'),    error: document.getElementById('nameError') },
    email:   { el: document.getElementById('email'),   error: document.getElementById('emailError') },
    subject: { el: document.getElementById('subject'), error: document.getElementById('subjectError') },
    message: { el: document.getElementById('message'), error: document.getElementById('messageError') },
};

function setError(field, message){
    fields[field].el.classList.add('invalid');
    fields[field].error.textContent = message;
}

function clearError(field){
    fields[field].el.classList.remove('invalid');
    fields[field].error.textContent = '';
}

function isValidEmail(value){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateField(field){
    const value = fields[field].el.value.trim();

    switch(field){
        case 'name':
            if (value.length < 2){
                setError('name', 'Please enter your name.');
                return false;
            }
            break;
        case 'email':
            if (!isValidEmail(value)){
                setError('email', 'Please enter a valid email address.');
                return false;
            }
            break;
        case 'subject':
            if (value.length < 3){
                setError('subject', 'Please add a short subject.');
                return false;
            }
            break;
        case 'message':
            if (value.length < 10){
                setError('message', 'Message should be at least 10 characters.');
                return false;
            }
            break;
    }
    clearError(field);
    return true;
}

// Validate as the user types, once they've left a field once
Object.keys(fields).forEach(field => {
    fields[field].el.addEventListener('blur', () => validateField(field));
    fields[field].el.addEventListener('input', () => {
        if (fields[field].el.classList.contains('invalid')) validateField(field);
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const results = Object.keys(fields).map(validateField);
    const allValid = results.every(Boolean);

    if (!allValid){
        formStatus.textContent = 'Please fix the errors above and try again.';
        formStatus.className = 'form-status error';
        return;
    }

    // No backend is wired up yet — this simulates a successful send.
    formStatus.textContent = 'Thanks! Your message has been sent — I\'ll get back to you soon.';
    formStatus.className = 'form-status success';
    form.reset();
});
const video = document.getElementById("bgVideo");
const muteBtn = document.getElementById("muteBtn");

muteBtn.addEventListener("click", () => {
    video.muted = !video.muted;
    muteBtn.textContent = video.muted ? "Unmute" : "Mute";
});