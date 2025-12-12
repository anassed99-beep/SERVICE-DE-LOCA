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
const aboutSection = document.querySelector('#About');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(aboutSection);
        }
    });
}, { threshold: 0.5 });

if (aboutSection) {
    observer.observe(aboutSection);
}

// Formulaire de contact
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.');
        contactForm.reset();
    });
}

// Toggle Mode Sombre/Clair
const themeToggle = document.getElementById('themeToggle');
const themeIconMoon = themeToggle.querySelector('.fa-moon');
const themeIconSun = themeToggle.querySelector('.fa-sun');

// Vérifier le thème sauvegardé ou préféré
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeIconMoon.style.display = 'none';
    themeIconSun.style.display = 'block';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    if (document.body.classList.contains('light-mode')) {
        themeIconMoon.style.display = 'none';
        themeIconSun.style.display = 'block';
        localStorage.setItem('theme', 'light');
    } else {
        themeIconMoon.style.display = 'block';
        themeIconSun.style.display = 'none';
        localStorage.setItem('theme', 'dark');
    }
});

// Bouton Télécharger CV
const downloadCV = document.getElementById('downloadCV');

downloadCV.addEventListener('click', (e) => {
    e.preventDefault();
    // Créer un CV fictif en PDF (dans un cas réel, vous auriez un vrai fichier PDF)
    const cvContent = `
        Curriculum Vitae - Anas Seddaoui
        
        Full Stack Web Developer
        ========================
        
        Informations Personnelles:
        --------------------------
        Nom: Anas Seddaoui
        Email: seeanas836@gmail.com
        Téléphone: +212 6-32-33-77-21
        Adresse: Daoudiate-Marrakech-Maroc
        
        Compétences:
        -------------
        • HTML/CSS: Avancé
        • JavaScript: Intermédiaire
        • PHP: Intermédiaire
        • React: Débutant
        • UI/UX Design: Débutant
        
        Expérience:
        -----------
        Développeur Web Junior - 2023 à présent
        • Développement de sites web responsifs
        • Création d'applications web modernes
        
        Projets:
        --------
        1. Site de location de voitures
           - Développement complet du site
           - Interface utilisateur moderne
        
        Éducation:
        ----------
        Formation en développement web
        Auto-formation et projets personnels
        
        Langues:
        --------
        • Arabe: Langue maternelle
        • Français: Courant
        • Anglais: Intermédiaire
    `;
    
    // Créer un blob et télécharger
    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CV_Anas_Seddaoui.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    alert('CV téléchargé ! Dans un site réel, ceci téléchargerait un vrai fichier PDF.');
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

// Initialiser l'animation au défilement
animateOnScroll();

// Changement de couleur de la navbar au scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backdropFilter = 'blur(15px)';
    }
});
