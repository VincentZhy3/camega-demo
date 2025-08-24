// Products Management for Camega Health
class ProductsManager {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.currentPage = 1;
        this.productsPerPage = 12;
        this.filters = {
            search: '',
            category: '',
            priceRange: '',
            sortBy: 'name'
        };
        
        this.init();
    }

    init() {
        this.loadProducts();
        this.setupEventListeners();
    }

    // Load sample products data
    loadProducts() {
        this.products = [
            {
                id: 'omega-3-fish-oil',
                name: 'Camega Omega-3 Deep Sea Fish Oil',
                category: 'omega-3',
                price: 29.99,
                originalPrice: 39.99,
                image: 'assets/camega-omega.jpg',
                description: 'Premium quality Omega-3 fish oil supplement with high EPA and DHA content.',
                rating: 4.8,
                reviews: 127,
                inStock: true,
                badge: 'BEST SELLER'
            },
            {
                id: 'vitamin-d3',
                name: 'Vitamin D3 2000 IU',
                category: 'vitamins',
                price: 19.99,
                originalPrice: 24.99,
                image: 'assets/product1.png',
                description: 'High-potency Vitamin D3 supplement for bone health and immune support.',
                rating: 4.6,
                reviews: 89,
                inStock: true,
                badge: 'NEW'
            },
            {
                id: 'coq10-supplement',
                name: 'CoQ10 100mg',
                category: 'antioxidants',
                price: 34.99,
                originalPrice: 44.99,
                image: 'assets/product.jpg',
                description: 'Coenzyme Q10 supplement for heart health and cellular energy production.',
                rating: 4.7,
                reviews: 156,
                inStock: true
            },
            {
                id: 'probiotic-blend',
                name: 'Probiotic Blend 50 Billion CFU',
                category: 'probiotics',
                price: 39.99,
                originalPrice: 49.99,
                image: 'assets/product1.png',
                description: 'Advanced probiotic formula with 50 billion live cultures for gut health.',
                rating: 4.5,
                reviews: 203,
                inStock: true
            },
            {
                id: 'magnesium-citrate',
                name: 'Magnesium Citrate 400mg',
                category: 'minerals',
                price: 24.99,
                originalPrice: 29.99,
                image: 'assets/product.jpg',
                description: 'Highly absorbable magnesium citrate for muscle relaxation and sleep support.',
                rating: 4.4,
                reviews: 78,
                inStock: false,
                badge: 'OUT OF STOCK'
            },
            {
                id: 'vitamin-c-1000',
                name: 'Vitamin C 1000mg',
                category: 'vitamins',
                price: 16.99,
                originalPrice: 21.99,
                image: 'assets/product1.png',
                description: 'High-dose Vitamin C supplement for immune system support and antioxidant protection.',
                rating: 4.3,
                reviews: 145,
                inStock: true
            },
            {
                id: 'zinc-picolinate',
                name: 'Zinc Picolinate 30mg',
                category: 'minerals',
                price: 18.99,
                originalPrice: 23.99,
                image: 'assets/product.jpg',
                description: 'Chelated zinc supplement for immune function and skin health.',
                rating: 4.6,
                reviews: 92,
                inStock: true
            },
            {
                id: 'curcumin-turmeric',
                name: 'Curcumin Turmeric Extract',
                category: 'antioxidants',
                price: 27.99,
                originalPrice: 34.99,
                image: 'assets/product1.png',
                description: 'Bioavailable curcumin extract for inflammation support and joint health.',
                rating: 4.7,
                reviews: 167,
                inStock: true,
                badge: 'POPULAR'
            }
        ];

        this.filteredProducts = [...this.products];
        this.renderProducts();
    }

    // Setup event listeners for filters
    setupEventListeners() {
        const searchInput = document.getElementById('search-input');
        const categoryFilter = document.getElementById('category-filter');
        const priceFilter = document.getElementById('price-filter');
        const sortFilter = document.getElementById('sort-filter');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filters.search = e.target.value;
                this.applyFilters();
            });
        }

        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.filters.category = e.target.value;
                this.applyFilters();
            });
        }

        if (priceFilter) {
            priceFilter.addEventListener('change', (e) => {
                this.filters.priceRange = e.target.value;
                this.applyFilters();
            });
        }

        if (sortFilter) {
            sortFilter.addEventListener('change', (e) => {
                this.filters.sortBy = e.target.value;
                this.applyFilters();
            });
        }
    }

    // Apply all filters and sorting
    applyFilters() {
        this.filteredProducts = this.products.filter(product => {
            // Search filter
            if (this.filters.search) {
                const searchTerm = this.filters.search.toLowerCase();
                const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                                    product.description.toLowerCase().includes(searchTerm) ||
                                    product.category.toLowerCase().includes(searchTerm);
                if (!matchesSearch) return false;
            }

            // Category filter
            if (this.filters.category && product.category !== this.filters.category) {
                return false;
            }

            // Price range filter
            if (this.filters.priceRange) {
                const [min, max] = this.filters.priceRange.split('-').map(Number);
                if (max && (product.price < min || product.price > max)) {
                    return false;
                }
                if (!max && product.price < min) {
                    return false;
                }
            }

            return true;
        });

        // Sort products
        this.sortProducts();

        this.currentPage = 1;
        this.renderProducts();
    }

    // Sort products based on selected criteria
    sortProducts() {
        switch (this.filters.sortBy) {
            case 'name':
                this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'price-low':
                this.filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                this.filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'popularity':
                this.filteredProducts.sort((a, b) => b.reviews - a.reviews);
                break;
            case 'newest':
                // For demo purposes, we'll sort by ID
                this.filteredProducts.sort((a, b) => b.id.localeCompare(a.id));
                break;
        }
    }

    // Render products on the page
    renderProducts() {
        const productsGrid = document.getElementById('products-grid');
        if (!productsGrid) return;

        const startIndex = (this.currentPage - 1) * this.productsPerPage;
        const endIndex = startIndex + this.productsPerPage;
        const productsToShow = this.filteredProducts.slice(startIndex, endIndex);

        if (productsToShow.length === 0) {
            productsGrid.innerHTML = `
                <div class="no-products">
                    <h3>No products found</h3>
                    <p>Try adjusting your search criteria or filters.</p>
                </div>
            `;
            return;
        }

        productsGrid.innerHTML = productsToShow.map(product => this.createProductCard(product)).join('');
        this.renderPagination();
    }

    // Create product card HTML
    createProductCard(product) {
        const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
        
        return `
            <div class="product-card" onclick="window.location.href='product-detail.html?id=${product.id}'">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <div class="product-category">${this.getCategoryDisplayName(product.category)}</div>
                    <div class="product-title">${product.name}</div>
                    <div class="product-description">${product.description}</div>
                    <div class="product-price">
                        CAD $${product.price.toFixed(2)}
                        ${product.originalPrice ? `<span style="text-decoration: line-through; color: #999; font-size: 1rem; margin-left: 8px;">$${product.originalPrice.toFixed(2)}</span>` : ''}
                        ${discount > 0 ? `<span style="background: #ff5722; color: white; padding: 2px 6px; border-radius: 8px; font-size: 12px; margin-left: 8px;">${discount}% OFF</span>` : ''}
                    </div>
                    <div class="product-actions">
                        <button class="btn-view" onclick="event.stopPropagation(); window.location.href='product-detail.html?id=${product.id}'">View Details</button>
                        <button class="btn-add-cart" onclick="event.stopPropagation(); addToCart('${product.id}')" ${!product.inStock ? 'disabled' : ''}>
                            ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Get display name for category
    getCategoryDisplayName(category) {
        const categoryNames = {
            'omega-3': 'Omega-3',
            'vitamins': 'Vitamins',
            'minerals': 'Minerals',
            'antioxidants': 'Antioxidants',
            'probiotics': 'Probiotics'
        };
        return categoryNames[category] || category;
    }

    // Render pagination
    renderPagination() {
        const pagination = document.getElementById('pagination');
        if (!pagination) return;

        const totalPages = Math.ceil(this.filteredProducts.length / this.productsPerPage);
        
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        let paginationHTML = '';
        
        // Previous button
        paginationHTML += `
            <button onclick="productsManager.goToPage(${this.currentPage - 1})" 
                    ${this.currentPage === 1 ? 'disabled' : ''}>
                Previous
            </button>
        `;

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 2 && i <= this.currentPage + 2)) {
                paginationHTML += `
                    <button onclick="productsManager.goToPage(${i})" 
                            class="${i === this.currentPage ? 'active' : ''}">
                        ${i}
                    </button>
                `;
            } else if (i === this.currentPage - 3 || i === this.currentPage + 3) {
                paginationHTML += '<span>...</span>';
            }
        }

        // Next button
        paginationHTML += `
            <button onclick="productsManager.goToPage(${this.currentPage + 1})" 
                    ${this.currentPage === totalPages ? 'disabled' : ''}>
                Next
            </button>
        `;

        pagination.innerHTML = paginationHTML;
    }

    // Go to specific page
    goToPage(page) {
        const totalPages = Math.ceil(this.filteredProducts.length / this.productsPerPage);
        if (page >= 1 && page <= totalPages) {
            this.currentPage = page;
            this.renderProducts();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Get product by ID
    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    // Search products
    searchProducts(query) {
        this.filters.search = query;
        this.applyFilters();
    }

    // Filter by category
    filterByCategory(category) {
        this.filters.category = category;
        this.applyFilters();
    }

    // Filter by price range
    filterByPriceRange(range) {
        this.filters.priceRange = range;
        this.applyFilters();
    }

    // Sort products
    sortProductsBy(criteria) {
        this.filters.sortBy = criteria;
        this.applyFilters();
    }
}

// Global functions for cart operations
function addToCart(productId) {
    // This would integrate with a cart system
    console.log('Adding product to cart:', productId);
    
    // For demo purposes, show a simple alert
    const product = window.productsManager?.getProductById(productId);
    if (product) {
        alert(`Added ${product.name} to cart!`);
    }
}

// Initialize products manager
let productsManager;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        productsManager = new ProductsManager();
    });
} else {
    productsManager = new ProductsManager();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductsManager;
}
