document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.expirience-card');
    const cards = document.querySelectorAll('.card-header');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 30; // largura + margem
    
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    // Para touch devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        if (touchEndX < touchStartX && currentIndex < cards.length - 1) {
            currentIndex++;
        }
        if (touchEndX > touchStartX && currentIndex > 0) {
            currentIndex--;
        }
        updateCarousel();
    }
});