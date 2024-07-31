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

    // Initialisation des graphiques Chart.js
    const ctxHtml = document.getElementById('htmlChart').getContext('2d');
    const ctxJs = document.getElementById('jsChart').getContext('2d');
    const ctxPhp = document.getElementById('phpChart').getContext('2d');

    const dataHtml = {
        labels: ['HTML', 'CSS', 'Sass', 'Bootstrap'],
        datasets: [{
            label: 'Compétences HTML/CSS',
            data: [90, 85, 70, 75],
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)'],
            borderWidth: 1
        }]
    };

    const dataJs = {
        labels: ['JavaScript', 'Node.js', 'Express'],
        datasets: [{
            label: 'Compétences JavaScript',
            data: [85, 75, 70],
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
            borderWidth: 1
        }]
    };

    const dataPhp = {
        labels: ['PHP', 'Symfony'],
        datasets: [{
            label: 'Compétences PHP/Symfony',
            data: [80, 70],
            backgroundColor: ['rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)'],
            borderWidth: 1
        }]
    };

    new Chart(ctxHtml, {
        type: 'bar',
        data: dataHtml,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    new Chart(ctxJs, {
        type: 'bar',
        data: dataJs,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    new Chart(ctxPhp, {
        type: 'bar',
        data: dataPhp,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
