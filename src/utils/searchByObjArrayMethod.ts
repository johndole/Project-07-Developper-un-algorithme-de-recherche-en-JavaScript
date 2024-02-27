/*
 * Filters an array of objects based on matching text in specified keys.
 * @param {string} input - The search term.
 * @param {Object[]} objects - The array of objects to search through.
 * @param {string[]} keys - The keys of the object to search in.
 * @returns {Object[]} The filtered array of objects.
 
function filterObjectsByKeys(input: string, objects: any[], keys: string[]): any[] {
    input = input.toLowerCase().trim(); // Normalize the input for case-insensitive comparison
  
    // Use the `filter()` method to keep only objects that match the search criteria in any of the specified keys
    const filteredObjects = objects.filter(obj => 
      keys.some(key => {
        // Check if the object has the key and if the value of the key includes the search input
        const value = obj[key];
        let searchableValue = '';
  
        // Prepare the value for searching based on its type
        if (Array.isArray(value)) {
          // Join array elements into a string for searching
          searchableValue = value.join(' ').toLowerCase();
        } else if (typeof value === 'string' || typeof value === 'number') {
          // Directly use string and number values
          searchableValue = value.toString().toLowerCase();
        }
  
        // Return true if the searchable value includes the input, indicating a match
        return searchableValue.includes(input);
      })
    );
  
    return filteredObjects;
  }
  */

// search.ts

/**
 * Initializes the search functionality, attaching an input event listener to the search input
 * and filtering card elements based on text content within specified child elements.
 */
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