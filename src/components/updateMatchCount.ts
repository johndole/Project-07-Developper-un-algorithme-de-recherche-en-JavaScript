
export const updateMatchCountDisplay = () => {
    const visibleCards = document.querySelectorAll('.card:not([style*="display: none"])');
    const matchCount = visibleCards.length;

    const cardsCountDisplay = document.querySelector('#card-count');
    if (cardsCountDisplay) {
        cardsCountDisplay.textContent = `${matchCount} RECETTES`;
    }
};

