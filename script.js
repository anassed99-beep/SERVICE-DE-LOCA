// ===== CONFIGURATION INITIALE =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script chargé - début de l\'exécution');
    
    // ===== MENU MOBILE =====
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            console.log('Menu mobile cliqué');
            navLinks.classList.toggle('active');
            
            // Changer l'icône
            const icon = hamburger.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
        
        // Fermer le menu en cliquant sur un lien
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
    
    // ===== THÈME SOMBRE/CLAIR =====
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    console.log('Bouton thème trouvé:', themeToggle);
    
    if (themeToggle) {
        // Initialiser le thème
        const savedTheme = localStorage.getItem('theme');
        console.log('Thème sauvegardé:', savedTheme);
        
        if (savedTheme === 'light') {
            body.classList.add('light-mode');
            updateThemeIcon('light');
        } else {
            updateThemeIcon('dark');
        }
        
        // Fonction pour mettre à jour l'icône
        function updateThemeIcon(mode) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                if (mode === 'light') {
                    icon.className = 'fas fa-sun';
                    themeToggle.setAttribute('aria-label', 'Activer le mode sombre');
                } else {
                    icon.className = 'fas fa-moon';
                    themeToggle.setAttribute('aria-label', 'Activer le mode clair');
                }
            }
        }
        
        // Ajouter l'événement click
        themeToggle.addEventListener('click', function() {
            console.log('Bouton thème cliqué!');
            
            body.classList.toggle('light-mode');
            
            if (body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
                updateThemeIcon('light');
                console.log('Mode clair activé');
            } else {
                localStorage.setItem('theme', 'dark');
                updateThemeIcon('dark');
                console.log('Mode sombre activé');
            }
            
            // Forcer un reflow pour s'assurer que les styles sont appliqués
            body.offsetHeight;
        });
        
        // Test: vérifier si le bouton répond
        themeToggle.style.cursor = 'pointer';
        themeToggle.title = 'Cliquez pour changer le thème';
    } else {
        console.error('ERREUR: Bouton themeToggle non trouvé!');
        console.log('Cherché un élément avec id="themeToggle"');
        console.log('Éléments avec des IDs:', 
            Array.from(document.querySelectorAll('[id]')).map(el => el.id));
    }
    
   // ===== BOUTON CV =====
const cvBtn = document.getElementById('cvBtn');
if (cvBtn) {
    cvBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Bouton CV cliqué - Téléchargement en cours');
        
        // Créer un lien temporaire
        const link = document.createElement('a');
        
        // METTRE ICI LE CHEMIN VERS VOTRE FICHIER PDF
        link.href = 'CV.PDF'; // ← Remplacez par votre fichier
        
        // Nom du fichier à télécharger
        link.download = 'CV.PDF';
        
        // Lancer le téléchargement
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}
    
    // ===== FILTRAGE PORTFOLIO =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                console.log('Filtre sélectionné:', filter);
                
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // ===== ANIMATION DES COMPÉTENCES =====
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
    if (aboutSection && skillBars.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('Section à propos visible - animation des compétences');
                    animateSkillBars();
                    observer.unobserve(aboutSection);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(aboutSection);
    }
    
// ===== FORMULAIRE FORMSPREE (SIMPLE) =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        try {
            const formData = new FormData(contactForm);
            
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                alert('✅ Message envoyé avec succès !');
                contactForm.reset();
            } else {
                throw new Error('Erreur d\'envoi');
            }
        } catch (error) {
            alert('❌ Erreur : ' + error.message);
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}
    
    // ===== NAVBAR AU SCROLL =====
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            const isLightMode = body.classList.contains('light-mode');
            
            if (window.scrollY > 100) {
                if (isLightMode) {
                    header.style.backgroundColor = 'rgba(248, 250, 252, 0.98)';
                } else {
                    header.style.backgroundColor = 'rgba(15, 23, 42, 0.98)';
                }
                header.style.backdropFilter = 'blur(10px)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                if (isLightMode) {
                    header.style.backgroundColor = 'rgba(248, 250, 252, 0.95)';
                } else {
                    header.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
                }
                header.style.backdropFilter = 'blur(15px)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
            }
        }
    });
    
    // ===== ANIMATIONS AU DÉFILEMENT =====
    function animateOnScroll() {
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
    }
    
    // Initialiser les animations
    animateOnScroll();
    
    console.log('Script chargé avec succès - toutes les fonctions initialisées');
});
