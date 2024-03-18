
export function initSearchByObjArrayMethod(): void {
  const searchInput = document.querySelector('.hero__search-input') as HTMLInputElement | null;
  const cards = document.querySelectorAll('.card');

  if (!searchInput) {
    console.error('Search input element not found');
    return;
  }

  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    // Define selectors for the child elements within each card to be searched
    const selectors = ['.card__title', '.card__description', '.card__ingredient-name'];

    filterCardsByTextContent(searchTerm, cards as NodeListOf<HTMLElement>, selectors);
  });
}

/**
 * Filters card elements based on matching text content within specified child elements.
 * 
 * @param {string} input - The search term.
 * @param {NodeListOf<HTMLElement>} cards - The collection of card elements to search through.
 * @param {string[]} selectors - The CSS selectors for child elements within each card to search.
 */
function filterCardsByTextContent(input: string, cards: NodeListOf<HTMLElement>, selectors: string[]): void {
  cards.forEach(card => {
    let isMatch = selectors.some(selector => {
      const elements = card.querySelectorAll(selector);
      return Array.from(elements).some(element => element.textContent?.toLowerCase().includes(input));
    });

    card.style.display = isMatch ? '' : 'none';
  });
}

/*
  // Function using the filter method to retrieve matched values
function filterMethod(input, arr) {
  return arr.filter(item => item === input);

  */