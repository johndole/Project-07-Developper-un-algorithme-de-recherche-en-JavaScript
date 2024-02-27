/**
 * Filters cards based on matching text content in specified child elements.
 * @param {string} input - The search term.
 * @param {HTMLElement[]} cards - The array of card elements to search through.
 * @param {string[]} selectors - The selectors for child elements within each card to search.
 */

export function initSearchByLoop() {
  const searchInput = document.querySelector('.hero__search-input') as HTMLInputElement;
  const cards = document.querySelectorAll('.card');

  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value;
    // Define the selectors for child elements to search within each card
    const selectors = ['.card__title', '.card__description', '.card__ingredient-name']; // Add or remove selectors based on your markup

    filterCardsByTextContent(searchTerm, cards as NodeListOf<HTMLElement>, selectors);
  });

}

function filterCardsByTextContent(
  input: string,
  cards: NodeListOf<HTMLElement>,
  selectors: string[])
  : void {
  input = input.toLowerCase().trim(); // Normalize the input for case-insensitive comparison

  for (let i = 0; i < cards.length; i++) {
    let isMatch = false; // Assume no match initially for the current card

    // Iterate over each selector to search within the specified elements of the card
    for (let j = 0; j < selectors.length && !isMatch; j++) {
      const elements = cards[i].querySelectorAll(selectors[j]);

      // Check each element for a match
      elements.forEach(element => {
        if (element.textContent?.toLowerCase().includes(input)) {
          isMatch = true; // A match has been found
        }
      });
    }

    // Show or hide the card based on the match result
    cards[i].style.display = isMatch ? '' : 'none';
  }
}




/*// Function using a loop to retrieve matched values
function loopMethod(input: string, arr: string[]): string[] {
  const result: string[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === input) {
      result.push(arr[i]);
    }
  }
  return result;
}
*/