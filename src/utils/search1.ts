





/* Index.ts
  initSearch<Recipe>(
  '.hero__search-input',
  recipes,
  ['name', 'description', 'ingredients'], // Specify the keys to search within each Recipe object
  updateDisplay // Pass the function to handle displaying the filtered recipes
);*/


export function initSearch<T>(
  searchInputSelector: string,
  values: T[],
  filterKeys: (keyof T)[],
  displayFunction: (filteredValues: T[]) => void
): void {
  const searchInput = document.querySelector(searchInputSelector) as HTMLInputElement | null;

  if (!searchInput) {
    console.error('Search input not found');
    return;
  }

  searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.toLowerCase().trim();

    if (searchValue.length >= 3) {
      const filteredValues = values.filter(value =>
        filterKeys.some(key => {
          const propertyValue = value[key];
          let searchableString = '';

          // Safely convert property values to strings for searching
          if (Array.isArray(propertyValue)) {
            // Convert array elements to strings and join
            searchableString = propertyValue.map(element =>
              element?.toString().toLowerCase() || ''
            ).join(' ');
          } else if (typeof propertyValue === 'string' || typeof propertyValue === 'number') {
            // Directly use string and number values
            searchableString = propertyValue.toString().toLowerCase();
          } else if (propertyValue !== null && typeof propertyValue === 'object') {
            // Handle nested objects
            searchableString = JSON.stringify(propertyValue).toLowerCase();
          }

          return searchableString.includes(searchValue);
        })
      );

      displayFunction(filteredValues);
    } else {
      displayFunction(values);
    }
  });
}









