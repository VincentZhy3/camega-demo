// Product Detail Management for Camega Health
class ProductDetailManager {
    constructor() {
        this.currentProduct = null;
        this.selectedSize = '60-capsules';
        this.quantity = 1;
        this.productData = {};
        
        this.init();
    }

    init() {
        this.loadProductData();
        this.loadProductFromURL();
        this.setupEventListeners();
    }

    // Load product data
    loadProductData() {
        this.productData = {
            'omega-3-fish-oil': {
                id: 'omega-3-fish-oil',
                name: 'Camega Omega-3 Deep Sea Fish Oil',
                category: 'Omega-3',
                price: 29.99,
                originalPrice: 39.99,
                images: [
                    'assets/camega-omega.jpg',
                    'assets/product1.png',
                    'assets/product.jpg'
                ],
                description: 'Premium quality Omega-3 fish oil supplement sourced from deep sea fish. Rich in EPA and DHA, essential fatty acids that support heart health, brain function, and overall wellness. Each serving provides 1000mg of pure fish oil with 300mg EPA and 200mg DHA.',
                rating: 4.8,
                reviews: 127,
                inStock: true,
                sizes: [
                    { id: '60-capsules', name: '60 Capsules', price: 29.99, originalPrice: 39.99 },
                    { id: '120-capsules', name: '120 Capsules', price: 54.99, originalPrice: 69.99 },
                    { id: '180-capsules', name: '180 Capsules', price: 79.99, originalPrice: 99.99 }
                ],
                ingredients: [
                    'Fish Oil (from Anchovy, Sardine, Mackerel) - 1000mg',
                    'EPA (Eicosapentaenoic Acid) - 300mg',
                    'DHA (Docosahexaenoic Acid) - 200mg',
                    'Gelatin (Capsule)',
                    'Glycerin',
                    'Purified Water'
                ],
                nutrition: [
                    { nutrient: 'Total Fat', amount: '1g', dailyValue: '2%' },
                    { nutrient: 'Omega-3 Fatty Acids', amount: '500mg', dailyValue: '**' },
                    { nutrient: 'EPA', amount: '300mg', dailyValue: '**' },
                    { nutrient: 'DHA', amount: '200mg', dailyValue: '**' }
                ],
                benefits: [
                    'Supports heart health and cardiovascular function',
                    'Promotes brain health and cognitive function',
                    'Reduces inflammation and joint discomfort',
                    'Supports healthy skin and hair',
                    'May improve mood and mental well-being',
                    'High-quality, purified fish oil'
                ],
                reviews: [
                    {
                        name: 'Sarah M.',
                        date: 'March 15, 2024',
                        rating: 5,
                        text: 'Excellent quality fish oil! I\'ve been taking this for 3 months and I can feel the difference. My joints feel better and my skin looks healthier. Highly recommend!'
                    },
                    {
                        name: 'Michael R.',
                        date: 'March 10, 2024',
                        rating: 5,
                        text: 'Great product! No fishy aftertaste and the capsules are easy to swallow. I\'ve noticed improved focus and energy levels since starting this supplement.'
                    },
                    {
                        name: 'Jennifer L.',
                        date: 'March 5, 2024',
                        rating: 4,
                        text: 'Good quality product. I\'ve been taking it for a month and feel more energetic. The price is reasonable for the quality.'
                    }
                ]
            },
            'vitamin-d3': {
                id: 'vitamin-d3',
                name: 'Vitamin D3 2000 IU',
                category: 'Vitamins',
                price: 19.99,
                originalPrice: 24.99,
                images: [
                    'assets/product1.png',
                    'assets/product.jpg',
                    'assets/camega-omega.jpg'
                ],
                description: 'High-potency Vitamin D3 supplement for bone health and immune support. Each capsule provides 2000 IU of Vitamin D3 in an easy-to-absorb form.',
                rating: 4.6,
                reviews: 89,
                inStock: true,
                sizes: [
                    { id: '60-capsules', name: '60 Capsules', price: 19.99, originalPrice: 24.99 },
                    { id: '120-capsules', name: '120 Capsules', price: 34.99, originalPrice: 44.99 },
                    { id: '180-capsules', name: '180 Capsules', price: 49.99, originalPrice: 64.99 }
                ],
                ingredients: [
                    'Vitamin D3 (Cholecalciferol) - 2000 IU',
                    'Medium Chain Triglycerides',
                    'Gelatin (Capsule)',
                    'Glycerin',
                    'Purified Water'
                ],
                nutrition: [
                    { nutrient: 'Vitamin D3', amount: '2000 IU', dailyValue: '250%' },
                    { nutrient: 'Total Fat', amount: '0.5g', dailyValue: '1%' }
                ],
                benefits: [
                    'Supports bone health and calcium absorption',
                    'Boosts immune system function',
                    'May improve mood and energy levels',
                    'Supports muscle function',
                    'High bioavailability form'
                ],
                reviews: [
                    {
                        name: 'David K.',
                        date: 'March 12, 2024',
                        rating: 5,
                        text: 'Perfect for Canadian winters when we don\'t get enough sun. I feel much better since starting this supplement.'
                    },
                    {
                        name: 'Lisa P.',
                        date: 'March 8, 2024',
                        rating: 4,
                        text: 'Good quality Vitamin D3. Easy to take and reasonably priced.'
                    }
                ]
            }
        };
    }

    // Load product from URL parameter
    loadProductFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        
        if (productId && this.productData[productId]) {
            this.currentProduct = this.productData[productId];
            this.renderProduct();
        } else {
            // Default to first product if no ID or invalid ID
            const firstProductId = Object.keys(this.productData)[0];
            this.currentProduct = this.productData[firstProductId];
            this.renderProduct();
        }
    }

    // Setup event listeners
    setupEventListeners() {
        // Size selector
        const sizeSelector = document.getElementById('size-selector');
        if (sizeSelector) {
            sizeSelector.addEventListener('change', (e) => {
                this.selectedSize = e.target.value;
                this.updatePrice();
            });
        }

        // Quantity input
        const quantityInput = document.getElementById('quantity-input');
        if (quantityInput) {
            quantityInput.addEventListener('change', (e) => {
                this.quantity = parseInt(e.target.value) || 1;
                this.updatePrice();
            });
        }

        // Image gallery
        this.setupImageGallery();
    }

    // Setup image gallery functionality
    setupImageGallery() {
        const thumbnails = document.querySelectorAll('.thumbnail');
        const mainImage = document.getElementById('main-product-image');

        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                // Update main image
                if (mainImage) {
                    mainImage.src = thumbnail.src;
                }

                // Update active thumbnail
                thumbnails.forEach(t => t.classList.remove('active'));
                thumbnail.classList.add('active');
            });
        });
    }

    // Render product details
    renderProduct() {
        if (!this.currentProduct) return;

        // Update page title
        document.title = `${this.currentProduct.name} - Camega Health`;

        // Update breadcrumb
        const breadcrumb = document.getElementById('product-name-breadcrumb');
        if (breadcrumb) {
            breadcrumb.textContent = this.currentProduct.name;
        }

        // Update main product image
        const mainImage = document.getElementById('main-product-image');
        if (mainImage && this.currentProduct.images.length > 0) {
            mainImage.src = this.currentProduct.images[0];
            mainImage.alt = this.currentProduct.name;
        }

        // Update thumbnails
        this.updateThumbnails();

        // Update product info
        this.updateProductInfo();

        // Update ingredients
        this.updateIngredients();

        // Update nutrition facts
        this.updateNutritionFacts();

        // Update reviews
        this.updateReviews();

        // Update size options
        this.updateSizeOptions();

        // Update price
        this.updatePrice();
    }

    // Update thumbnails
    updateThumbnails() {
        const thumbnailContainer = document.querySelector('.thumbnail-images');
        if (!thumbnailContainer) return;

        thumbnailContainer.innerHTML = this.currentProduct.images.map((image, index) => `
            <img src="${image}" alt="${this.currentProduct.name}" 
                 class="thumbnail ${index === 0 ? 'active' : ''}"
                 onclick="productDetailManager.selectImage(${index})">
        `).join('');
    }

    // Select image
    selectImage(index) {
        const mainImage = document.getElementById('main-product-image');
        const thumbnails = document.querySelectorAll('.thumbnail');
        
        if (mainImage && this.currentProduct.images[index]) {
            mainImage.src = this.currentProduct.images[index];
        }

        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }

    // Update product info
    updateProductInfo() {
        const category = document.getElementById('product-category');
        const title = document.getElementById('product-title');
        const description = document.getElementById('product-description');

        if (category) category.textContent = this.currentProduct.category;
        if (title) title.textContent = this.currentProduct.name;
        if (description) description.textContent = this.currentProduct.description;
    }

    // Update ingredients
    updateIngredients() {
        const ingredientsList = document.getElementById('ingredients-list');
        if (!ingredientsList) return;

        ingredientsList.innerHTML = this.currentProduct.ingredients.map(ingredient => 
            `<li>${ingredient}</li>`
        ).join('');
    }

    // Update nutrition facts
    updateNutritionFacts() {
        const nutritionTable = document.querySelector('.nutrition-table tbody');
        if (!nutritionTable) return;

        nutritionTable.innerHTML = this.currentProduct.nutrition.map(nutrient => `
            <tr>
                <td>${nutrient.nutrient}</td>
                <td>${nutrient.amount}</td>
                <td>${nutrient.dailyValue}</td>
            </tr>
        `).join('');
    }

    // Update reviews
    updateReviews() {
        const reviewsSection = document.querySelector('.reviews-section');
        if (!reviewsSection) return;

        const reviewsHTML = this.currentProduct.reviews.map(review => `
            <div class="review-item">
                <div class="review-header">
                    <span class="reviewer-name">${review.name}</span>
                    <span class="review-date">${review.date}</span>
                </div>
                <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</div>
                <div class="review-text">${review.text}</div>
            </div>
        `).join('');

        reviewsSection.innerHTML = `
            <h3>Customer Reviews</h3>
            ${reviewsHTML}
        `;
    }

    // Update size options
    updateSizeOptions() {
        const sizeSelector = document.getElementById('size-selector');
        if (!sizeSelector) return;

        sizeSelector.innerHTML = this.currentProduct.sizes.map(size => 
            `<option value="${size.id}">${size.name} - $${size.price.toFixed(2)}</option>`
        ).join('');

        this.selectedSize = this.currentProduct.sizes[0].id;
    }

    // Update price based on selected size and quantity
    updatePrice() {
        const selectedSizeData = this.currentProduct.sizes.find(size => size.id === this.selectedSize);
        if (!selectedSizeData) return;

        const totalPrice = selectedSizeData.price * this.quantity;
        const totalOriginalPrice = selectedSizeData.originalPrice * this.quantity;

        const priceElement = document.getElementById('product-price');
        const originalPriceElement = document.getElementById('original-price');

        if (priceElement) {
            priceElement.textContent = `$${totalPrice.toFixed(2)}`;
        }

        if (originalPriceElement) {
            originalPriceElement.textContent = `$${totalOriginalPrice.toFixed(2)}`;
        }
    }

    // Get current product data
    getCurrentProduct() {
        return this.currentProduct;
    }

    // Get selected size data
    getSelectedSizeData() {
        return this.currentProduct.sizes.find(size => size.id === this.selectedSize);
    }
}

// Global functions
function changeQuantity(delta) {
    const quantityInput = document.getElementById('quantity-input');
    if (!quantityInput) return;

    let newQuantity = parseInt(quantityInput.value) + delta;
    newQuantity = Math.max(1, Math.min(10, newQuantity)); // Limit between 1 and 10
    
    quantityInput.value = newQuantity;
    productDetailManager.quantity = newQuantity;
    productDetailManager.updatePrice();
}

function addToCart() {
    const product = productDetailManager.getCurrentProduct();
    const sizeData = productDetailManager.getSelectedSizeData();
    const quantity = productDetailManager.quantity;

    const cartItem = {
        productId: product.id,
        name: product.name,
        size: sizeData.name,
        price: sizeData.price,
        quantity: quantity,
        total: sizeData.price * quantity
    };

    console.log('Adding to cart:', cartItem);
    
    // For demo purposes, show alert
    alert(`Added ${quantity}x ${product.name} (${sizeData.name}) to cart!`);
}

function buyNow() {
    addToCart();
    // Redirect to checkout page
    // window.location.href = 'checkout.html';
    alert('Redirecting to checkout...');
}

// Initialize product detail manager
let productDetailManager;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        productDetailManager = new ProductDetailManager();
    });
} else {
    productDetailManager = new ProductDetailManager();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductDetailManager;
}
