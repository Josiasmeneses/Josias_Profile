document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = themeToggle.querySelector('.fa-sun');
    const moonIcon = themeToggle.querySelector('.fa-moon');
    const body = document.body;
    

    // Verifica o tema salvo ou usa o tema escuro como padrão
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.replace('dark-theme', 'light-theme');
        sunIcon.classList.add('active-icon');
        moonIcon.classList.remove('active-icon');
    }

    // Alterna entre temas ao clicar no botão
    themeToggle.addEventListener('click', function() {
        if (body.classList.contains('light-theme')) {
            body.classList.replace('light-theme', 'dark-theme');
            sunIcon.classList.remove('active-icon');
            moonIcon.classList.add('active-icon');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.replace('dark-theme', 'light-theme');
            moonIcon.classList.remove('active-icon');
            sunIcon.classList.add('active-icon');
            localStorage.setItem('theme', 'light');
        }
        
        // Atualiza a cor de fundo do botão
        themeToggle.style.backgroundColor = getComputedStyle(body).getPropertyValue('--bg-body');
    });
});