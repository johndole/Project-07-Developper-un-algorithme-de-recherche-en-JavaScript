
export const updateMatchCountDisplay = () => {
    const visibleCards = document.querySelectorAll('.card:not([style*="display: none"])');
    const matchCount = visibleCards.length;

    const cardsCountDisplay = document.querySelector('#card-count');
    if (cardsCountDisplay) {
        cardsCountDisplay.textContent = `${matchCount} RECETTES`;
    }
    const recipesContainer = document.querySelector('.recipes__container');
    const existingMessage = recipesContainer?.querySelector('.no-matches-message');

    // Remove existing message if it exists
    if (existingMessage) {
        existingMessage.remove();
    }

    // Append message if no matches found
    if (matchCount === 0) {
        const message = document.createElement("p");
        message.textContent = "No matches found.";
        message.classList.add('no-matches-message'); // Add a class for easier identification
        recipesContainer?.appendChild(message);
    }
};
