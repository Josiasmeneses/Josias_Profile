// // Substitua o código JavaScript anterior por este se preferir
// document.addEventListener('DOMContentLoaded', function() {
//     const navLinks = document.querySelectorAll('.navigation a');
//     const sections = document.querySelectorAll('section, header[id]');
    
//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 const id = entry.target.getAttribute('id');
//                 navLinks.forEach(link => {
//                     link.classList.remove('active');
//                     if (link.getAttribute('href') === `#${id}`) {
//                         link.classList.add('active');
//                     }
//                 });
//             }
//         });
//     }, { threshold: 0.5, rootMargin: '-100px 0px -50% 0px' });
    
//     sections.forEach(section => {
//         observer.observe(section);
//     });
// });
// Adicione isso ao seu arquivo JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.navigation a');
    
    function highlightNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);
    highlightNav(); // Chama no carregamento para destacar a seção inicial
});