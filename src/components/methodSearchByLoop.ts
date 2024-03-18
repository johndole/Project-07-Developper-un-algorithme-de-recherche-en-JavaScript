import { updateMatchCountDisplay } from "./updateMatchCount";

export function initSearchByLoop() {
  const searchInput = document.querySelector(
    ".hero__search-input"
  ) as HTMLInputElement;
  const cards = document.querySelectorAll(".card");

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value;
    // Define the selectors for child elements to search within each card
    const selectors = [
      ".card__title",
      ".card__description",
      ".card__ingredient-name",
    ]; 
if (searchTerm.length >= 3 ){
    filterCardsByTextContent(
      searchTerm,
      cards as NodeListOf<HTMLElement>,
      selectors,
      updateMatchCountDisplay
    );
  }else {
    // Clear the search results and update match count display
    resetSearchResults(cards as NodeListOf<HTMLElement>);
    updateMatchCountDisplay();
  }
  });
}

function filterCardsByTextContent(
  input: string,
  cards: NodeListOf<HTMLElement>,
  selectors: string[],
  onUpdateMatchCountDisplay?: () => void
): void {
  input = input.toLowerCase().trim(); // Normalize the input for case-insensitive comparison

  for (let i = 0; i < cards.length; i++) {
    let isMatch = false; // Assume no match initially for the current card

    // Iterate over each selector to search within the specified elements of the card
    for (let j = 0; j < selectors.length && !isMatch; j++) {
      const elements = cards[i].querySelectorAll(selectors[j]);

      // Check each element for a match
      elements.forEach((element) => {
        if (element.textContent?.toLowerCase().includes(input)) {
          isMatch = true; // A match has been found
        }
      });
    }
  

    // Show or hide the card based on the match result
    cards[i].style.display = isMatch ? "" : "none";
  }
  // Call the callback function if provided
  if (onUpdateMatchCountDisplay) {
    onUpdateMatchCountDisplay();
  }
}

function resetSearchResults(cards: NodeListOf<HTMLElement>): void {
  // Reset the display of all cards to show them
  cards.forEach((card) => {
    card.style.display = "";
  });
}

