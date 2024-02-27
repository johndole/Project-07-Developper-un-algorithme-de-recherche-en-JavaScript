const dropdownContainerHtmlElement = document.querySelector(
  ".custom-select"
) as HTMLElement;

const dropdownHtmlElement = dropdownContainerHtmlElement?.querySelector(
  ".dropdown"
) as HTMLElement;

const clearSearchHtmlElement = dropdownContainerHtmlElement?.querySelector(
  ".clear-search"
) as HTMLElement;

const searchInputHtmlElement = dropdownContainerHtmlElement?.querySelector(
  ".search-tags"
) as HTMLInputElement;

const allOptionsHtmlElement = dropdownContainerHtmlElement?.querySelector(
  ".all-options"
) as HTMLElement;

const tagsContainerHtmlElement = dropdownContainerHtmlElement?.querySelector(
  ".selected-options"
) as HTMLElement;

export const dropdown = (values: string[]) => {

  displayDropdownItems(values);

  // Attach events
  searchInputHtmlElement.addEventListener("input", () => {
    filterDisplayedDropdownItems(searchInputHtmlElement.value, values);
  });

  clearSearchHtmlElement.addEventListener("click", () =>
    clearSearchInput(values)
  );

  dropdownHtmlElement.addEventListener("click", toggleDropdown);
};

function filterDisplayedDropdownItems(searchTerm: string, values: string[]) {
  const filteredValues = values.filter((value) =>
    value.toLowerCase().includes(searchTerm)
  );
  displayDropdownItems(filteredValues);
}

function clearSearchInput(values: string[]) {
  searchInputHtmlElement.value = "";
  displayDropdownItems(values);
  searchInputHtmlElement.focus();
}

function toggleDropdown() {
  dropdownContainerHtmlElement.classList.toggle("open");
}

let selectedValues = [] as string[]; // Array to keep track of selected values

function displayDropdownItems(values: string[]) {
  allOptionsHtmlElement.innerHTML = "";

  // Filter out selected values so they don't appear in the dropdown
  const availableValues = values.filter(value => !selectedValues.includes(value));

  availableValues.forEach((value) => {
    const option = document.createElement("div");
    option.classList.add("option");
    option.textContent = value;
    option.setAttribute("data-value", value);

    // Add click event listener to each option
    option.addEventListener("click", function () {
      selectedValues.push(value);
      addTag(value, values);
      displayDropdownItems(values); // Refresh options display
    });

    allOptionsHtmlElement.appendChild(option);
  });
}

function addTag(value: string, values: string[]) {

  const tag = document.createElement('span');
  tag.classList.add('tag');
  tag.textContent = value;

  const removeBtn = document.createElement('span');
  removeBtn.classList.add('remove-tag');
  removeBtn.innerHTML = '&times;';
  tag.appendChild(removeBtn);

  // Add event listener to remove tag
  removeBtn.addEventListener('click', function () {
    removeTag(value, values, tag);

  });
  tagsContainerHtmlElement.appendChild(tag);
  console.log(selectedValues);
  filterCards(selectedValues, "ingredient");
}

function removeTag(value: string, values: string[], tagElement: HTMLElement) {
  const tagsContainer = document.querySelector('.selected-options') as HTMLElement;
  // Remove the tag from the UI
  tagsContainer.removeChild(tagElement);
  // Remove the value from selected values array
  selectedValues = selectedValues.filter(val => val !== value);
  // Refresh the dropdown to include the removed value again
  displayDropdownItems(values); // Assuming 'values' is your original array of options
  filterCards(selectedValues, "ingredient");
}

function filterCards(filterValues: string[], dataAttribute: string) {
  const cards = document.querySelectorAll('.card');

  cards.forEach((card) => {
    const htmlCard = card as HTMLElement;

    // Find all spans within the current card that match the given data attribute
    const dataSpans = htmlCard.querySelectorAll(`[data-${dataAttribute}]`);

    // Create an array of the values present in the card for the given attribute
    const cardValues = Array.from(dataSpans).map(span => {
      const value = span.getAttribute(`data-${dataAttribute}`);
      return value ? value.toLowerCase() : '';
    });

    // Determine if the card should be shown based on the filter values provided
    const isMatch = filterValues.length === 0 || filterValues.every(val =>
      cardValues.includes(val.toLowerCase()));

    // Show or hide the card based on the match
    htmlCard.style.display = isMatch ? '' : 'none';
  });
}