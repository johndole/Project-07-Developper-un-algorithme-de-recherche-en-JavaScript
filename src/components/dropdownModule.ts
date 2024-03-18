let selectedValues: string[] = [];

// Définition de l'interface pour le callback
type SelectionChangeCallback = (selectedValues: string[]) => void;

// Main function to initialize a dropdown
export const initializeDropdown = (
  dropdownContainerSelector: string,
  values: string[],
  onSelectionChange: SelectionChangeCallback
): void => {
  const dropdownContainer = document.querySelector(
    dropdownContainerSelector
  ) as HTMLElement | null;

  if (!dropdownContainer) {
    console.error(
      "Dropdown container not found for selector:",
      dropdownContainerSelector
    );
    return;
  }

  const dropdownElement = dropdownContainer.querySelector(
    ".dropdown"
  ) as HTMLElement;
  const clearSearchElement = dropdownContainer.querySelector(
    ".clear-search"
  ) as HTMLElement;
  const searchInputElement = dropdownContainer.querySelector(
    ".search-tags"
  ) as HTMLInputElement;
  const allOptionsElement = dropdownContainer.querySelector(
    ".all-options"
  ) as HTMLElement;
  const selectedOptionsElement = dropdownContainer.querySelector(
    ".selected-options"
  ) as HTMLElement;
  const filterDisplayArea = document.querySelector(
    "#filter-display-area"
  ) as HTMLElement;

  // Function to display dropdown items based on the values and selected values
  function displayDropdownItems(values: string[]): void {
    allOptionsElement.innerHTML = ""; // Clear existing options
    values.forEach((value) => {
      if (!selectedValues.includes(value)) {
        const optionElement = document.createElement("div");
        optionElement.classList.add("option");
        optionElement.textContent = value;

        optionElement.addEventListener("click", () => {
          if (!selectedValues.includes(value)) {
            selectedValues.push(value);
            console.log(selectedValues);
            addTag(value);
            displayDropdownItems(values);
            onSelectionChange(selectedValues);
          }
        });
        allOptionsElement.appendChild(optionElement);
      }
    });
  }

  // Display initial dropdown items
  displayDropdownItems(values);
  onSelectionChange(selectedValues);

  // Function to add a tag for a selected value
  function addTag(value: string): void {
    // Common function to create a tag element
    function createTagElement(tagValue: string): HTMLElement {
      const tagElement = document.createElement("span");
      tagElement.classList.add("tag");
      tagElement.setAttribute("data-value", tagValue); // Unique identifier
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
    tagElement.querySelector(".remove-tag")?.addEventListener("click", () => {
      removeTag(value);
    });

    // Add the same for the cloned tag
    tagClone.querySelector(".remove-tag")?.addEventListener("click", () => {
      removeTag(value);
    });

    selectedOptionsElement.appendChild(tagElement);
    filterDisplayArea.appendChild(tagClone);

    onSelectionChange(selectedValues);
  }

  // Function to remove a tag
  function removeTag(value: string): void {
    // Remove the tag from both areas based on the 'data-value' attribute
    document.querySelectorAll(`.tag[data-value="${value}"]`).forEach((tag) => {
      tag.parentNode?.removeChild(tag);
    });

    // Update selected filters
    selectedValues = selectedValues.filter((val) => val !== value);
    onSelectionChange(selectedValues);
  }

  // Event listener for the search input
  searchInputElement.addEventListener("input", () => {
    const searchTerm = searchInputElement.value.toLowerCase();
    const filteredValues = values.filter((value) =>
      value.toLowerCase().includes(searchTerm)
    );
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
};
