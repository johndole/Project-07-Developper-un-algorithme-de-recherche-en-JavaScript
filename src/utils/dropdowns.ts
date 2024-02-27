type FilterType = 'ingredient' | 'appliance' | 'utensil';
// Global object to store selected values for each filter type
// Adjust the global object to use string[] instead of never[]
const selectedFilters: Record<FilterType, string[]> = {
    ingredient: [],
    appliance: [],
    utensil: []
};

// Main function to initialize a dropdown
export const initializeDropdown = (dropdownContainerSelector: string, values: string[], filterType: FilterType): void => {
    const dropdownContainer = document.querySelector(dropdownContainerSelector) as HTMLElement | null;

    if (!dropdownContainer) {
        console.error("Dropdown container not found for selector:", dropdownContainerSelector);
        return;
    }

    const dropdownElement = dropdownContainer.querySelector(".dropdown") as HTMLElement;
    const clearSearchElement = dropdownContainer.querySelector(".clear-search") as HTMLElement;
    const searchInputElement = dropdownContainer.querySelector(".search-tags") as HTMLInputElement;
    const allOptionsElement = dropdownContainer.querySelector(".all-options") as HTMLElement;
    const selectedOptionsElement = dropdownContainer.querySelector(".selected-options") as HTMLElement;
    const filterDisplayArea = document.querySelector("#filter-display-area") as HTMLElement;
    // Function to display dropdown items based on the values and selected values
    function displayDropdownItems(values: string[]): void {
        allOptionsElement.innerHTML = ""; // Clear existing options
        values.forEach(value => {
            if (!selectedFilters[filterType].includes(value)) {
                const optionElement = document.createElement("div");
                optionElement.classList.add("option");
                optionElement.textContent = value;

                optionElement.addEventListener("click", () => {
                    if (!selectedFilters[filterType].includes(value)) {
                        selectedFilters[filterType].push(value);
                        console.log(selectedFilters);
                        addTag(value, filterType);
                        displayDropdownItems(values);
                    }
                });
                allOptionsElement.appendChild(optionElement);
            }
        });
    }

    // Display initial dropdown items
    displayDropdownItems(values);
    filterCards();

    // Event listener for the search input
    searchInputElement.addEventListener("input", () => {
        const searchTerm = searchInputElement.value.toLowerCase();
        const filteredValues = values.filter(value => value.toLowerCase().includes(searchTerm));
        displayDropdownItems(filteredValues);
    });

    // Event listener for the clear search
    clearSearchElement.addEventListener("click", () => {
        searchInputElement.value = "";
        displayDropdownItems(values);
        searchInputElement.focus();
    });

    // Event listener for the dropdown toggle
    dropdownElement.addEventListener("click", (event) => {
        event.stopPropagation();
        dropdownContainer.classList.toggle("open");
    });

    // Function to add a tag for a selected value
    function addTag(value: string, filterType: FilterType): void {
        // Common function to create a tag element
        function createTagElement(tagValue: string): HTMLElement {
            const tagElement = document.createElement("span");
            tagElement.classList.add("tag");
            tagElement.setAttribute('data-value', tagValue); // Unique identifier
            tagElement.textContent = tagValue;

            const removeTagButton = document.createElement("span");
            removeTagButton.classList.add("remove-tag");
            removeTagButton.innerHTML = "&times;";
            tagElement.appendChild(removeTagButton);

            return tagElement;
        }

        const tagElement = createTagElement(value);
        const tagClone = createTagElement(value); // Clone for the filter display area

        // Add event listener to the original tag's remove button
        tagElement.querySelector('.remove-tag')?.addEventListener('click', () => {
            removeTag(value, filterType);
        });

        // Add the same for the cloned tag
        tagClone.querySelector('.remove-tag')?.addEventListener('click', () => {
            removeTag(value, filterType);
        });

        selectedOptionsElement.appendChild(tagElement);
        filterDisplayArea.appendChild(tagClone);

        filterCards();
    };

    // Simplified removeTag function
    function removeTag(value: string, filterType: FilterType): void {
        // Remove the tag from both areas based on the 'data-value' attribute
        document.querySelectorAll(`.tag[data-value="${value}"]`).forEach(tag => {
            tag.parentNode?.removeChild(tag);
        });

        // Update selected filters
        selectedFilters[filterType] = selectedFilters[filterType].filter(val => val !== value);

        // Re-display dropdown items and filter cards as needed
        filterCards(); // Assuming this updates the display based on current filters
    };

    // Function to filter cards based on selected values across all filters
    function filterCards(): void {
        const cards = document.querySelectorAll('.card');
        let matchCount = 0;
        cards.forEach((card) => {
            const htmlCard = card as HTMLElement
            let isMatch = true;

            // Check match for each filter type
            for (const key in selectedFilters) {
                // Assert that 'key' is a key of 'selectedFilters' and thus a FilterType
                const filterType = key as FilterType;

                const selectedValues = selectedFilters[filterType];
                if (selectedValues.length > 0) {
                    const dataSpans = htmlCard.querySelectorAll(`[data-${filterType}]`);
                    const cardValues = Array.from(dataSpans).map(span => span.getAttribute(`data-${filterType}`)?.toLowerCase());

                    // Card must match all selected values for current filter type

                    // Directly inside your loop, without assuming filterType specifics
                    isMatch = selectedFilters[filterType].every(selectedValue =>
                        cardValues.some(cardValue =>
                            cardValue?.includes(selectedValue.toLowerCase())
                        ));

                }
            }

            if (isMatch) {
                htmlCard.style.display = '';
                matchCount++; // Increment counter only for matched cards
            } else {
                htmlCard.style.display = 'none';
            }

        });
        const cardsCountDisplay = document.querySelector('#card-count');
        if (cardsCountDisplay) {
            cardsCountDisplay.textContent = `${matchCount} RECETTES`;
        }


    };


}