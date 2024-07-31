document.addEventListener('DOMContentLoaded', () => {
    // Observer pour les sections avec animation
    const sections = document.querySelectorAll('section');
    const options = { threshold: 0.5 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    sections.forEach(section => observer.observe(section));

    // Gestion du menu burger
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        menuToggle.classList.toggle('active');
    });

    navLinks.addEventListener('click', () => {
        navLinks.classList.remove('show');
        menuToggle.classList.remove('active');
    });

    // Animation du texte "À propos"
    const aboutText = document.querySelector('.about-text p');

    aboutText.addEventListener('mouseenter', () => {
        aboutText.style.animationPlayState = 'paused';
    });

    aboutText.addEventListener('mouseleave', () => {
        aboutText.style.animationPlayState = 'running';
    });

    const skills = {
        HTML: {
            title: "HTML",
            description: "Maîtrise des balises HTML5 pour structurer le contenu des pages web."
        },
        CSS: {
            title: "CSS",
            description: "Stylisation des pages web avec CSS3, animations et mise en page responsive."
        },
        JavaScript: {
            title: "JavaScript",
            description: "Programmation côté client avec JavaScript, ES6+, et manipulation DOM."
        },
        PHP: {
            title: "PHP",
            description: "Développement backend avec PHP et gestion de bases de données MySQL."
        },
        Symfony: {
            title: "Symfony",
            description: "Utilisation du framework Symfony pour des applications web robustes."
        },
        SCSS: {
            title: "SCSS",
            description: "Préprocesseur CSS permettant d'écrire des styles plus propres et réutilisables."
        },
        SQL: {
            title: "SQL",
            description: "Langage de requête structuré pour gérer et manipuler les bases de données relationnelles."
        },
        Bootstrap: {
            title: "Bootstrap",
            description: "Framework CSS populaire pour concevoir des sites web responsives et modernes."
        },
        MongoDB: {
            title: "MongoDB",
            description: "Base de données NoSQL orientée documents pour une flexibilité et une scalabilité élevées."
        }
    };

    const skillCards = document.querySelectorAll('.skill-card');
    const skillInfo = document.getElementById('skill-info');
    const skillTitle = document.getElementById('skill-title');
    const skillDescription = document.getElementById('skill-description');

    skillCards.forEach(card => {
        card.addEventListener('click', () => {
            skillCards.forEach(c => c.classList.remove('clicked'));
            card.classList.add('clicked');

            const skill = card.getAttribute('data-skill');
            skillTitle.textContent = skills[skill].title;
            skillDescription.textContent = skills[skill].description;
            skillInfo.classList.remove('hidden');
        });
    });

    const navbarLinks = document.querySelectorAll('nav ul li a');

    navbarLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            // Calcul de la distance et durée de défilement en fonction de la distance
            const targetPosition = targetSection.offsetTop;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1000; // Durée en ms
            let start = null;

            window.requestAnimationFrame(step);

            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const r = easeInOutCubic(progress, startPosition, distance, duration);
                window.scrollTo(0, r);
                if (progress < duration) {
                    window.requestAnimationFrame(step);
                }
            }

            // Fonction de facilité pour un défilement plus doux
            function easeInOutCubic(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t * t + b;
                t -= 2;
                return c / 2 * (t * t * t + 2) + b;
            }
        });
    });
});
