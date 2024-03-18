const productsUrl = 'https://fakestoreapi.com/products';
const productList = document.getElementById('product-list');
const sortSelect = document.getElementById('sort-order');
const filterSelect = document.getElementById('category-filter');

// Fetch products from the API and display on the page
fetchProducts();

// Event listeners for when the sort or filter selections change
sortSelect.addEventListener('change', applyFiltersAndSort);
filterSelect.addEventListener('change', applyFiltersAndSort);

// Function to fetch product data
async function fetchProducts() {
  try {
    const response = await fetch(productsUrl); 
    const data = await response.json(); // Parse the response as JSON
    products = data;
    renderProducts(products); // Display the initial set of products
    populateFilter(products); // Populate the category filter options
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

// Function to render products on the page
function renderProducts(products) {
  productList.innerHTML = '';

  products.forEach(product => {
    // Create a new div to display each product
    const item = document.createElement('div');
    item.classList.add('product-item');

    // Populate product information within the div
    item.innerHTML = `
      <h3>${product.title}</h3>
      <img src="${product.image}" alt="${product.title}">
      <p>Price: $${product.price}</p>
      <p>Category: ${product.category}</p>
    `;
    productList.appendChild(item);
  });
}

// Function to populate the category filter dropdown
function populateFilter(products) {
  // Create a set to collect unique categories
  const categories = new Set(products.map(p => p.category)); 

  categories.forEach(cat => {
    // Create option elements for each category
    const option = document.createElement('option');
    option.value = cat; 
    option.text = cat;
    filterSelect.appendChild(option); 
  });
}

// Function to apply both sorting and filtering to the products
function applyFiltersAndSort() {
  let workingData = [...products];

  // Apply sorting based on category
  const selectedCategory = filterSelect.value;
  if (selectedCategory) {
    workingData = workingData.filter(p => p.category === selectedCategory);
  }

  // Apply sorting based on price
  const sortOrder = sortSelect.value;
  if (sortOrder === 'asc') {
    workingData.sort((a, b) => a.price - b.price); // Ascending filter
  } else if (sortOrder === 'desc') {
    workingData.sort((a, b) => b.price - a.price); // Descending filter
  }

  renderProducts(workingData); // Update display with filtered/sorted data
}
