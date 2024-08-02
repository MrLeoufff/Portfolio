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

    // Configuration de la scène 3D pour les cartes de compétences
    const container = document.getElementById('skills-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.CSS3DRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    camera.position.z = 1000;

    const skillsData = [
        { title: "HTML", description: "Maîtrise des balises HTML5 pour structurer le contenu des pages web." },
        { title: "CSS", description: "Stylisation des pages web avec CSS3, animations et mise en page responsive." },
        { title: "JavaScript", description: "Programmation côté client avec JavaScript, ES6+, et manipulation DOM." },
        { title: "PHP", description: "Développement backend avec PHP et gestion de bases de données MySQL." },
        { title: "Symfony", description: "Utilisation du framework Symfony pour des applications web robustes." },
        { title: "SCSS", description: "Préprocesseur CSS permettant d'écrire des styles plus propres et réutilisables." },
        { title: "SQL", description: "Langage de requête structuré pour gérer et manipuler les bases de données relationnelles." },
        { title: "Bootstrap", description: "Framework CSS populaire pour concevoir des sites web responsives et modernes." },
        { title: "MongoDB", description: "Base de données NoSQL orientée documents pour une flexibilité et une scalabilité élevées." }
    ];

    const objects = [];
    const radius = 400;
    const total = skillsData.length;

    skillsData.forEach((skill, index) => {
        const element = document.createElement('div');
        element.className = 'skill-card';
        element.innerHTML = `<img src="images/${skill.title.toLowerCase()}.png" alt="${skill.title} Icon">
                             <div class="skill-info hidden">
                               <h3>${skill.title}</h3>
                               <p>${skill.description}</p>
                             </div>`;

        element.addEventListener('click', () => {
            objects.forEach(obj => obj.element.classList.remove('clicked'));
            element.classList.add('clicked');
            const info = element.querySelector('.skill-info');
            document.querySelectorAll('.skill-info').forEach(info => info.classList.add('hidden'));
            info.classList.remove('hidden');
        });

        const objectCSS = new THREE.CSS3DObject(element);
        const theta = index * 2 * Math.PI / total;
        objectCSS.position.setFromSphericalCoords(radius, Math.PI / 2 - theta, theta);
        scene.add(objectCSS);
        objects.push(objectCSS);
    });

    function animate() {
        requestAnimationFrame(animate);
        objects.forEach(object => {
            object.rotation.y += 0.01;
        });
        renderer.render(scene, camera);
    }

    animate();

    // Gestion de la mise à jour de la taille du renderer en fonction de la fenêtre
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // Smooth scroll pour les liens de la barre de navigation
    const navbarLinks = document.querySelectorAll('nav ul li a');

    navbarLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

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

            function easeInOutCubic(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t * t + b;
                t -= 2;
                return c / 2 * (t * t * t + 2) + b;
            }
        });
    });
});
