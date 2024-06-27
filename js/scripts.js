    const products = [
        {
            id: 1,
            name: 'Burger',
            description: 'Delicious beef burger',
            price: 5.80,
            rating: 4.5,
            category: 'Fast Food',
            image: '../images/products/beef-burger.jpg'
        },
        {
            id: 2,
            name: 'Pizza',
            description: 'Margherita pizza with cheese',
            price: 8.99,
            rating: 3.9,
            category: 'Pizza',
            image: '../images/products/margherita-pizza.jpg'
        },
        {
            id: 3,
            name: 'Drink',
            description: '7-Up',
            price: 1.50,
            rating: 4.0,
            category: 'Drinks',
            image: '../images/products/7-up.jpg'
        },
        {
            id: 4,
            name: 'Drink',
            description: 'Avant water',
            price: 1.00,
            rating: 4.7,
            category: 'Drinks',
            image: '../images/products/avant-water.jpg'
        },
        {
            id: 5,
            name: 'Sub',
            description: 'Classic sub with cheese slice',
            price: 7.99,
            rating: 4.1,
            category: 'Fast Food',
            image: '../images/products/classic-sub.jpg'
        },
        {
            id: 6,
            name: 'Drink',
            description: 'Coca Cola',
            price: 2.15,
            rating: 4.9,
            category: 'Drinks',
            image: '../images/products/coca-cola.jpg'
        },
        {
            id: 7,
            name: 'Pizza',
            description: 'Panner Pizza with cheese',
            price: 10.99,
            rating: 3.4,
            category: 'Pizza',
            image: '../images/products/panner-pizza.jpg'
        },
        {
            id: 8,
            name: 'Pizza',
            description: 'Pepperoni pizza with cheese',
            price: 11.99,
            rating: 4.3,
            category: 'Pizza',
            image: '../images/products/pepperoni-pizza.jpg'
        },
        {
            id: 9,
            name: 'Drink',
            description: 'Mango rubicon',
            price: 1.99,
            rating: 4.6,
            category: 'Drinks',
            image: '../images/products/rubicon-mango.jpg'
        },
        {
            id: 10,
            name: 'Sub',
            description: 'Sandwich foot long bread',
            price: 7.99,
            rating: 4.4,
            category: 'Fast Food',
            image: '../images/products/sandwiches.jpg'
        },
        {
            id: 11,
            name: 'Pizza',
            description: 'Vegetables pizza',
            price: 7.99,
            rating: 4.9,
            category: 'Pizza',
            image: '../images/products/vegetable-pizza.jpg'
        },
        {
            id: 12,
            name: 'Drink',
            description: 'Drink combo',
            price: 5.99,
            rating: 5.0,
            category: 'Drinks',
            image: '../images/products/subway-drink.jpg'
        },
        {
            id: 13,
            name: 'Sanck',
            description: 'Sanck combo',
            price: 4.89,
            rating: 4.5,
            category: 'Sancks',
            image: '../images/products/snacks.jpg'
        },
        {
            id: 14,
            name: 'Wraps',
            description: 'Wraps with cheese slices',
            price: 4.99,
            rating: 3.8,
            category: 'Fast Food',
            image: '../images/products/signature-wraps.jpg'
        },
        {
            id: 15,
            name: 'Sub',
            description: 'Sub with salads combo',
            price: 13.99,
            rating: 4.8,
            category: 'Fast Food',
            image: '../images/products/subs-and-salads.jpg'
        }
    ];

    const categories = ["All",...new Set(products.map(product => product.category))];

    let cart = [];
    let wishlist = [];

    function displayCategories() {
        if(document.getElementById('categories') != null) {
        const categoryList = document.getElementById('categories');
        var selected;
        categories.forEach((category,i) => {
            const li = document.createElement('li');
            if(i==0)
                li.className= 'list-group-item selected';  
            else
              li.className = 'list-group-item';
            li.textContent = category;
            li.addEventListener('click',  function(e) {   
                if(e.target.tagName === 'LI') {                                    
                  selected= document.querySelector('li.selected');                  
                  if(selected) selected.className= 'list-group-item';                            
                  e.target.className= 'list-group-item selected';                                 
                }
                filterProducts(category)
              });
            categoryList.appendChild(li);
        });
    }
    }

    function displayProducts(products) {
        if(document.getElementById('products') != null){
        const productContainer = document.getElementById('products');
        productContainer.innerHTML = '';
        const wishlistData = sessionStorage.getItem('wishlist') ? JSON.parse(sessionStorage.getItem('wishlist')) :[];
        products.forEach(product => {
            let heartIcon;
            let isItemInWishlist =  wishlistData ? wishlistData.find(p => p.id == product.id) : false;

            if(isItemInWishlist) {
                heartIcon = "bi-heart-fill";
            } else {
                heartIcon = "bi-heart";
            }

            const col = document.createElement('div');
            col.className = 'col-md-4';
            col.innerHTML = `
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height:200px;">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">$${product.price.toFixed(2)}</p>
                        <p class="card-text">Rating: ${product.rating}</p>
                        <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                        <button class="btn btn-outline-secondary" onclick="toggleWishlist(this,${product.id})">
                            <i class="bi ${heartIcon} text-danger"></i>
                        </button>
                    </div>
                </div>
            `;
            productContainer.appendChild(col);
        });
     }
     updateCartCount();
    }

    function filterProducts(category) {
        const filteredProducts = products.filter(product => product.category === category ||  category =="All");
        displayProducts(filteredProducts);
    }

    displayCategories();
    displayProducts(products);

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            var storedProduct= sessionStorage.getItem('cartItems');

            if(storedProduct == null){
                cart = [];
            }
            else {
                cart= JSON.parse(storedProduct);
            }
            var existProductIndex = cart.findIndex(p => p.id === productId)
            if(existProductIndex !== -1 && existProductIndex != undefined) {
                cart[existProductIndex].quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
        } 
      
        sessionStorage.setItem('cartItems', JSON.stringify(cart));
        updateCartCount();
        displayCartItems();
    }

    function updateCartCount() {
        var cartContent = document.getElementById('cart-count');
        var cartData = JSON.parse(sessionStorage.getItem('cartItems'));
        let totalItem = 0;
        if(cartData != null && cartData.length > 0) {
            cartData.forEach(item => {
                totalItem += item.quantity;
            });
        }
        cartContent.textContent = totalItem;
    }
    
    function displayCartItems() {
        if(document.getElementById('cart') != null){
            const cartData = JSON.parse(sessionStorage.getItem('cartItems'));
            const cartItemsContainer = document.getElementById('cart-items');
            cartItemsContainer.innerHTML = '';
            let totalAmount = 0;
            if(cartData != null && cartData.length > 0) {
                cartData.forEach(item => {
                    totalAmount += item.price * item.quantity;
                    const cartItemRow = `
                        <tr>
                            <td>${item.description}</td>
                            <td>${item.price}</td>
                            <td>${item.quantity}</td>
                            <td>$${(item.price * item.quantity).toFixed(2)}</td>
                            <td>
                                <input type="number" value="${item.quantity}" min="1" max="20" onchange="updateQuantity(${item.id}, this.value)">
                                <button type="button" class="btn btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
                            </td>
                        </tr>
                    `;
                   cartItemsContainer.innerHTML += cartItemRow;
                });
            }
            cartItemsContainer.innerHTML += `
                    <tr>
                        <td colspan="3">Total</td>
                        <td colspan="2">$${totalAmount.toFixed(2)}</td>
                    </tr>
            `;
            updateCartCount();
            displayOrderSummary();
      }
    }

    function updateQuantity(productId, quantity) {
        var cartItem = JSON.parse(sessionStorage.getItem('cartItems'));
        if(cartItem === null) {
            return;
        }

        var updateIndex = cartItem.findIndex(p => p.id === productId);
        
        if(updateIndex == undefined) {
           return;
        } 

        if(cartItem[updateIndex].quantity < quantity){
            cartItem[updateIndex].quantity++;
        } else {
            cartItem[updateIndex].quantity--;
        }

        sessionStorage.setItem('cartItems',JSON.stringify(cartItem));
        displayCartItems();
    }
    
    function removeFromCart(productId) {
        var cartItems = JSON.parse(sessionStorage.getItem('cartItems'));
        var currentItemIndex = cartItems.findIndex(p => p.id == productId)
        if(currentItemIndex != -1){
            cartItems.splice(currentItemIndex, 1);
            sessionStorage.setItem('cartItems',JSON.stringify(cartItems));
            updateCartCount();
            displayCartItems();
        }
    }
     
    function searchItem(event){
        event.preventDefault();

        var searchInput = document.getElementById("searchItem");
        var searchProduct = searchInput.value.trim().toLowerCase();
        
        var matchedItems = products.filter(items => items.description.toLocaleLowerCase().includes(searchProduct.toLowerCase()) 
                                            || items.name.toLocaleLowerCase().includes(searchProduct.toLowerCase()));
        displayProducts(matchedItems);
    }

    function toggleWishlist(heart, productId) {
        const wishlistIcon = heart.parentElement.querySelector('.bi');
        if (wishlistIcon.classList.contains('bi-heart')) {
            wishlistIcon.classList.remove('bi-heart');
            wishlistIcon.classList.add('bi-heart-fill');
        } else if(wishlistIcon.classList.contains('bi-heart-fill')){
            wishlistIcon.classList.remove('bi-heart-fill');
            wishlistIcon.classList.add('bi-heart');
        }
        updateWishlist(wishlistIcon, productId);
    }  

    function updateWishlist(wishlistIcon, productId) {
        var wishlistItems = sessionStorage.getItem('wishlist') ? JSON.parse(sessionStorage.getItem('wishlist')) :[];
        var item = products.find(p => p.id === productId);
       
        var updateIndex = wishlistItems.findIndex(p => p.id === productId);
        
        if(updateIndex == undefined) {
           return;
        } 

        if(item && !wishlistIcon.classList.contains('bi-heart')) {
             if(wishlistItems != null) {
                if(!wishlistItems.find((p => p.id === productId))) {
                    wishlistItems.push(item);
                    sessionStorage.setItem('wishlist',JSON.stringify(wishlistItems));
                 }
             } else {
                wishlist.push(item);
                sessionStorage.setItem('wishlist',JSON.stringify(wishlist));
             }
            
        } else if(item && wishlistIcon.classList.contains('bi-heart')) {
            wishlistItems.splice(updateIndex, 1);
            sessionStorage.setItem('wishlist',JSON.stringify(wishlistItems));
        }
        displayProducts(products);
        displayWishlistItems();
    }

    function displayWishlistItems(){
        if(document.getElementById('wishlistProducts') != null){
            const wishlistContainer = document.getElementById('wishlistProducts');
            wishlistContainer.innerHTML = '';
            const wishlistData = sessionStorage.getItem('wishlist') ? JSON.parse(sessionStorage.getItem('wishlist')) :[];
             
            if(wishlistData.length > 0) {
                wishlistData.forEach(product => {
                    let heartIcon;
                    let isItemInWishlist =  wishlistData ? wishlistData.find(p => p.id == product.id) : false;
        
                    if(isItemInWishlist) {
                        heartIcon = "bi-heart-fill";
                    } else {
                        heartIcon = "bi-heart";
                    }
    
                    const col = document.createElement('div');
                    col.className = 'col-md-4';
                    col.innerHTML = `
                        <div class="card">
                            <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height:200px;">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">${product.description}</p>
                                <p class="card-text">$${product.price.toFixed(2)}</p>
                                <p class="card-text">Rating: ${product.rating}</p>
                                <button class="btn btn-primary" onclick="moveTooCart(${product.id})">Move to Cart</button>
                                <button class="btn btn-outline-secondary" onclick="toggleWishlist(this,${product.id})">
                                    <i class="bi ${heartIcon} text-danger"></i>
                                </button>
                            </div>
                        </div>
                    `;
                    wishlistContainer.appendChild(col);
                });
             }
             else {
                wishlistContainer.innerHTML = `
                    <div class="col-md-5">
                        <div class="card-body">
                            <h5 class="card-title">No data found in wishlist.</h5>
                        </div>
                    </div>
                `;
             }
         }
         updateCartCount();
    }

    function moveTooCart(productId){
        var wishlistItems = JSON.parse(sessionStorage.getItem('wishlist'));
        var item = products.find(p => p.id === productId);
        var updateIndex = wishlistItems.findIndex(p => p.id === productId);
        
        if(updateIndex == undefined) {
           return;
        } 

        if(wishlistItems != null && wishlistItems.length > 0) {
            wishlistItems.splice(updateIndex, 1);
            sessionStorage.setItem('wishlist',JSON.stringify(wishlistItems));
        }
        
        addToCart(productId);
        displayWishlistItems();
    }

    function displayOrderSummary() {
        const orderSummaryContainer = document.getElementById('order-summary');
        orderSummaryContainer.innerHTML = '';
        const cartData = JSON.parse(sessionStorage.getItem('cartItems'));        
        let totalAmount = 0;
        if(cartData != null && cartData.length > 0) {
            cartData.forEach(item => {
                orderSummaryContainer.innerHTML += `
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        ${item.description}
                        <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                `;
                totalAmount += item.price * item.quantity;
            });
        }
        document.getElementById('total-amount').innerText = totalAmount.toFixed(2);
    }

    const checkoutForm = document.getElementById('checkout-form');

    if(checkoutForm != null) {
        checkoutForm.addEventListener('submit', function (event) {
            event.preventDefault();
            
            const name = document.getElementById('name').value;
            const address = document.getElementById('address').value;
            const phone = document.getElementById('phone').value;
        
            console.log('Order placed:', { name, address, phone, cart });
        
            sessionStorage.removeItem("cartItems");
            displayCartItems();
            window.alert('Order placed successfully!');
            $('#checkoutModal').modal('hide');
            window.location.href = "index.html";
        });
       
    }
   

    
