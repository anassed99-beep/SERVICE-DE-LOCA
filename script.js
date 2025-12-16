// Menu mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.querySelector('i').classList.toggle('fa-times');
});

// Fermer le menu en cliquant sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.querySelector('i').classList.remove('fa-times');
    });
});

// Filtrage du portfolio
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Retirer la classe active de tous les boutons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Ajouter la classe active au bouton cliqué
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Animation des barres de compétences
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 300);
    });
}

// Observer pour l'animation des compétences
const aboutSection = document.querySelector('#a-propos');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(aboutSection);
        }
    });
}, { threshold: 0.5 });

observer.observe(aboutSection);

// Formulaire de contact
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.');
    contactForm.reset();
});

// Changement de couleur de la navbar au scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = 'white';
        header.style.backdropFilter = 'none';
    }
});

// Animation au défilement pour les éléments
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .portfolio-item, .contact-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
};
// Ajouter ces fonctions au fichier script.js existant

// Gestion du thème sombre/clair
const themeToggle = document.getElementById('themeToggle');
const moonIcon = themeToggle.querySelector('.fa-moon');
const sunIcon = themeToggle.querySelector('.fa-sun');

// Vérifier le thème sauvegardé ou la préférence système
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'block';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    if (document.body.classList.contains('light-mode')) {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
        localStorage.setItem('theme', 'light');
        themeToggle.setAttribute('aria-label', 'Activer le mode sombre');
    } else {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
        localStorage.setItem('theme', 'dark');
        themeToggle.setAttribute('aria-label', 'Activer le mode clair');
    }
});

// Gestion du bouton CV
const cvBtn = document.getElementById('cvBtn');

cvBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Vous pouvez remplacer cette URL par le lien vers votre vrai CV
    const cvUrl = 'https://example.com/your-cv.pdf';
    
    // Créer un lien temporaire pour télécharger le CV
    const link = document.createElement('a');
    link.href = cvUrl;
    link.target = '_blank';
    link.download = 'CV_Anas_Seddaoui.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Message de confirmation (vous pouvez le retirer)
    alert('Le téléchargement de votre CV va commencer...');
});

// Modifier la fonction existante de changement de couleur de la navbar
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const isLightMode = document.body.classList.contains('light-mode');
    
    if (window.scrollY > 100) {
        if (isLightMode) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
        }
        header.style.backdropFilter = 'blur(10px)';
    } else {
        if (isLightMode) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
        }
        header.style.backdropFilter = 'blur(15px)';
    }
});

// Initialiser l'animation au défilement
animateOnScroll();
// Ajouter ce code à la fin de votre fichier script.js existant

// Mode sombre/clair - Version simplifiée
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Vérifier le thème sauvegardé
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Basculer le thème
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'light');
        themeToggle.setAttribute('aria-label', 'Activer le mode sombre');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'dark');
        themeToggle.setAttribute('aria-label', 'Activer le mode clair');
    }
});

// Bouton CV
const cvBtn = document.getElementById('cvBtn');

cvBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Message d'information
    alert('Pour télécharger mon CV, veuillez me contacter directement par email à seeanas836@gmail.com');
    
    // Alternative: Rediriger vers LinkedIn ou autre portfolio
    // window.open('https://www.linkedin.com/in/anas-seddaoui-9921b9398', '_blank');
});

// Corriger la fonction de scroll pour le header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const isLightMode = body.classList.contains('light-mode');
    
    if (window.scrollY > 100) {
        if (isLightMode) {
            header.style.backgroundColor = 'rgba(248, 250, 252, 0.98)';
        } else {
            header.style.backgroundColor = 'rgba(15, 23, 42, 0.98)';
        }
        header.style.backdropFilter = 'blur(10px)';
    } else {
        if (isLightMode) {
            header.style.backgroundColor = 'rgba(248, 250, 252, 0.95)';
        } else {
            header.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
        }
        header.style.backdropFilter = 'blur(15px)';
    }
});

// S'assurer que le menu mobile fonctionne
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});
