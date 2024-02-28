export const filterRecipesBySelectedValues = (selectedValues: string[]): void => {
    const cards = document.querySelectorAll('.card');

    cards.forEach((card) => {
        const htmlCard = card as HTMLElement;
        let isMatch = selectedValues.length === 0; // Show all cards if no filter is selected

        if (selectedValues.length > 0) {
            const cardValues = Array.from(htmlCard.querySelectorAll('[data-value]'))
                .map(el => el.getAttribute('data-value')?.toLowerCase());

            isMatch = selectedValues.every(selectedValue =>
                cardValues.includes(selectedValue.toLowerCase())
            );
        }

        htmlCard.style.display = isMatch ? '' : 'none';
    });
};
