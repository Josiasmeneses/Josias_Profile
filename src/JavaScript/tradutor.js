// translations.js - Sistema independente de tradução
document.addEventListener('DOMContentLoaded', function() {
    // Configurações
    const DEFAULT_LANGUAGE = 'pt';
    let currentLanguage = localStorage.getItem('language') || DEFAULT_LANGUAGE;
    const languageSelect = document.getElementById('language-selector');

    // Dados de suporte (opções do seletor)
    const languageOptions = {
        pt: "Português",
        en: "English",
        es: "Español"
    };

    // Mapeamento de elementos para tradução
    const translationMap = {
        // Menu
        'menu.home': '.navigation li:nth-child(1) a',
        'menu.about': '.navigation li:nth-child(2) a',
        'menu.experiences': '.navigation li:nth-child(3) a',
        'menu.contact': '.navigation li:nth-child(4) a',
        
        // Perfil
        'profile.name': '#name',
        'profile.title': '#business',
        'profile.description': '#profile-description',
        
        // Formação
        'academic.title': '#class',
        'academic.course': '.academy-info h4:nth-child(1)',
        'academic.university': '.academy-info h4:nth-child(2)',
        
        // Seções
        'sections.skills': '.tecnologies h3',
        'sections.experiences': '.container-bottom .title-section',
        'sections.contact': '.container-contact .title-section'
    };

    // Carrega traduções
    async function loadTranslation(lang, type) {
        try {
            const response = await fetch(`../translations/${lang}/${type}.json`);
            if (!response.ok) throw new Error(`Failed to load ${type}`);
            return await response.json();
        } catch (error) {
            console.error(`Translation error (${lang}/${type}):`, error);
            if (lang !== DEFAULT_LANGUAGE) {
                return loadTranslation(DEFAULT_LANGUAGE, type);
            }
            return type === 'projects' ? [] : {};
        }
    }

    // Atualiza a página
    async function updateContent(lang) {
        const [texts, projects] = await Promise.all([
            loadTranslation(lang, 'general'),
            loadTranslation(lang, 'projects')
        ]);

        // Atualiza textos
        Object.entries(translationMap).forEach(([key, selector]) => {
            const element = document.querySelector(selector);
            if (element) {
                const value = key.split('.').reduce((o, k) => o?.[k], texts);
                if (value) element.textContent = value;
            }
        });

        // Atualiza projetos
        updateProjects(projects);

        // Atualiza seletor
        if (languageSelect) {
            languageSelect.value = lang;
        }

        currentLanguage = lang;
        localStorage.setItem('language', lang);
    }

    // Atualiza cards de projetos
    function updateProjects(projects) {
        const cards = document.querySelectorAll('.card-header');
        cards.forEach((card, i) => {
            const project = projects[i];
            if (project) {
                const title = card.querySelector('.title-card');
                const desc = card.querySelector('.description-card');
                if (title) title.textContent = project.title;
                if (desc) desc.textContent = project.description;
            }
        });
    }

    // Inicialização
    function init() {
        if (languageSelect) {
            // Preenche opções
            Object.entries(languageOptions).forEach(([code, name]) => {
                const option = new Option(name, code);
                if (code === currentLanguage) option.selected = true;
                languageSelect.add(option);
            });

            // Evento de mudança
            languageSelect.addEventListener('change', (e) => {
                updateContent(e.target.value);
            });
        }

        updateContent(currentLanguage);
    }

    init();
});