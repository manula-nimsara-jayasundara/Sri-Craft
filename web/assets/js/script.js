document.addEventListener('DOMContentLoaded', function () {
    const products = [
        {id: 1, name: 'Traditional Clay Water Pot', category: 'pottery', location: 'badulla', price: 'Rs. 2,500', image: 'https://placehold.co/400x300/c0392b/ffffff?text=Clay+Pot', artisan: 'Nimali Perera'},
        {id: 2, name: 'Ella Mist Handwoven Shawl', category: 'textiles', location: 'ella', price: 'Rs. 4,000', image: 'https://placehold.co/400x300/2980b9/ffffff?text=Woven+Shawl', artisan: 'Sita Devi'},
        {id: 3, name: 'Hand-carved Elephant Statue', category: 'woodwork', location: 'diyatalawa', price: 'Rs. 3,500', image: 'https://placehold.co/400x300/27ae60/ffffff?text=Wood+Elephant', artisan: 'Ravi Fernando'},
        {id: 4, name: 'Peacock Batik Wall Hanging', category: 'batik', location: 'badulla', price: 'Rs. 5,500', image: 'https://placehold.co/400x300/f39c12/ffffff?text=Batik+Art', artisan: 'Kamal Bandara'},
        {id: 5, name: 'Lotus Terracotta Vase Set', category: 'pottery', location: 'ella', price: 'Rs. 3,200', image: 'https://placehold.co/400x300/c0392b/ffffff?text=Vase+Set', artisan: 'Nimali Perera'},
        {id: 6, name: 'Dumbara Cotton Table Runner', category: 'textiles', location: 'diyatalawa', price: 'Rs. 2,800', image: 'https://placehold.co/400x300/2980b9/ffffff?text=Table+Runner', artisan: 'Sita Devi'},
        {id: 7, name: 'Intricate Wooden Jewelry Box', category: 'woodwork', location: 'badulla', price: 'Rs. 4,800', image: 'https://placehold.co/400x300/27ae60/ffffff?text=Jewelry+Box', artisan: 'Ravi Fernando'},
        {id: 8, name: 'Kandyan Dancer Batik Saree', category: 'batik', location: 'ella', price: 'Rs. 9,000', image: 'https://placehold.co/400x300/f39c12/ffffff?text=Batik+Saree', artisan: 'Kamal Bandara'}
    ];

    const productGrid = document.getElementById('product-grid');
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const locationFilter = document.getElementById('location-filter');

    function renderProducts(filteredProducts) {
        productGrid.innerHTML = '';
        if (filteredProducts.length === 0) {
            productGrid.innerHTML = `<div class="col-12 text-center"><p class="text-muted">No products found matching your criteria.</p></div>`;
            return;
        }
        filteredProducts.forEach(product => {
            const productCol = document.createElement('div');
            productCol.className = 'col-md-4 col-lg-3 mb-4';
            productCol.innerHTML = `
                        <div class="card product-card h-100">
                            <img src="${product.image}" class="card-img-top" alt="${product.name}">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text text-muted small">By ${product.artisan}</p>
                                <div class="mt-auto d-flex justify-content-between align-items-center pt-2">
                                    <span class="price">${product.price}</span>
                                    <a href="#" class="btn btn-view">Details</a>
                                </div>
                            </div>
                        </div>
                    `;
            productGrid.appendChild(productCol);
        });
    }

    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const selectedLocation = locationFilter.value;

        const filtered = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm) || product.artisan.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            const matchesLocation = selectedLocation === 'all' || product.location === selectedLocation;
            return matchesSearch && matchesCategory && matchesLocation;
        });

        renderProducts(filtered);
    }

    // Initial render
    renderProducts(products);

    // Event Listeners
    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
    locationFilter.addEventListener('change', filterProducts);
});


document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signupForm');

    signupForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        let isValid = true;

        // Reset custom validation messages and styles for all form controls
        const formControls = signupForm.querySelectorAll('.form-control');
        formControls.forEach(control => {
            control.classList.remove('is-invalid'); // Remove invalid state
        });

        // Get form field values
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');

        // Validate first name
        if (firstName.value.trim() === '') {
            firstName.classList.add('is-invalid');
            isValid = false;
        }

        // Validate last name
        if (lastName.value.trim() === '') {
            lastName.classList.add('is-invalid');
            isValid = false;
        }

        // Validate Email format using a simple regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            email.classList.add('is-invalid');
            isValid = false;
        }

        // Validate Password Length (at least 6 characters)
        if (password.value.length < 6) {
            password.classList.add('is-invalid');
            isValid = false;
        }

        // Validate Confirm Password (must match password and not be empty)
        if (password.value !== confirmPassword.value || confirmPassword.value.trim() === '') {
            confirmPassword.classList.add('is-invalid');
            isValid = false;
        }

        if (isValid) {
            // If all validations pass, you can proceed with form submission
            // In a real application, you would send this data to a server using fetch()
            // For this example, we'll display a custom message box instead of alert()
            showMessageBox('Sign up successful! (Form data would be sent to server)');
            signupForm.reset(); // Clear the form after successful submission
        }
    });

    /**
     * Displays a custom message box to the user.
     * @param {string} message - The message to display.
     */
    function showMessageBox(message) {
        // Create a modal-like structure for the message
        const messageBox = document.createElement('div');
        messageBox.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background-color: white;
                    padding: 25px;
                    border-radius: 10px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                    z-index: 1000;
                    text-align: center;
                    font-family: "Inter", sans-serif;
                    max-width: 90%;
                    width: 300px;
                `;

        const messageText = document.createElement('p');
        messageText.textContent = message;
        messageText.style.marginBottom = '20px';

        const closeButton = document.createElement('button');
        closeButton.textContent = 'OK';
        closeButton.style.cssText = `
                    background-color: #0d6efd;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                `;
        closeButton.onclick = () => messageBox.remove(); // Remove message box on click

        messageBox.appendChild(messageText);
        messageBox.appendChild(closeButton);
        document.body.appendChild(messageBox);
    }
});

//Email Verification JS

document.addEventListener('DOMContentLoaded', function () {
    const verificationForm = document.getElementById('verificationForm');
    const verificationCodeInput = document.getElementById('verificationCode');
    const resendCodeLink = document.getElementById('resendCodeLink');

    verificationForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        let isValid = true;

        // Reset validation styles
        verificationCodeInput.classList.remove('is-invalid');

        // Get code value and trim whitespace
        const code = verificationCodeInput.value.trim();

        // Validate code: must be exactly 6 digits
        const codeRegex = /^[0-9]{6}$/;
        if (!codeRegex.test(code)) {
            verificationCodeInput.classList.add('is-invalid');
            isValid = false;
        }

        if (isValid) {
            // If validation passes, simulate verification
            showMessageBox('Verification successful! Code: ' + code);
            verificationForm.reset(); // Clear the form
        }
    });

    resendCodeLink.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default link behavior
        showMessageBox('Resend code functionality would be triggered here.');
        // In a real application, you would make an API call to resend the code
    });

    /**
     * Displays a custom message box to the user.
     * @param {string} message - The message to display.
     */
    function showMessageBox(message) {
        // Create a modal-like structure for the message
        const messageBox = document.createElement('div');
        messageBox.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background-color: white;
                    padding: 25px;
                    border-radius: 10px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                    z-index: 1000;
                    text-align: center;
                    font-family: "Inter", sans-serif;
                    max-width: 90%;
                    width: 300px;
                `;

        const messageText = document.createElement('p');
        messageText.textContent = message;
        messageText.style.marginBottom = '20px';

        const closeButton = document.createElement('button');
        closeButton.textContent = 'OK';
        closeButton.style.cssText = `
                    background-color: #0d6efd;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                `;
        closeButton.onclick = () => messageBox.remove(); // Remove message box on click

        messageBox.appendChild(messageText);
        messageBox.appendChild(closeButton);
        document.body.appendChild(messageBox);
    }
});


// Sign In JS

document.addEventListener('DOMContentLoaded', function () {
    const signinForm = document.getElementById('signinForm');

    signinForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        let isValid = true;

        // Reset validation styles
        const formControls = signinForm.querySelectorAll('.form-control');
        formControls.forEach(control => {
            control.classList.remove('is-invalid');
        });

        // Get field values
        const signInEmail = document.getElementById('signInEmail');
        const passwordInput = document.getElementById('password');

        // Validate Email/Username
        if (signInEmail.value.trim() === '') {
            signInEmail.classList.add('is-invalid');
            isValid = false;
        }

        // Validate Password
        if (passwordInput.value.trim() === '') {
            passwordInput.classList.add('is-invalid');
            isValid = false;
        }

        if (isValid) {
            // If validation passes, simulate sign-in
            showMessageBox('Sign in successful! (Credentials would be sent to server)');
            signinForm.reset(); // Clear the form
        }
    });

    /**
     * Displays a custom message box to the user.
     * @param {string} message - The message to display.
     */
    function showMessageBox(message) {
        // Create a modal-like structure for the message
        const messageBox = document.createElement('div');
        messageBox.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background-color: white;
                    padding: 25px;
                    border-radius: 10px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                    z-index: 1000;
                    text-align: center;
                    font-family: "Inter", sans-serif;
                    max-width: 90%;
                    width: 300px;
                `;

        const messageText = document.createElement('p');
        messageText.textContent = message;
        messageText.style.marginBottom = '20px';

        const closeButton = document.createElement('button');
        closeButton.textContent = 'OK';
        closeButton.style.cssText = `
                    background-color: #0d6efd;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                `;
        closeButton.onclick = () => messageBox.remove(); // Remove message box on click

        messageBox.appendChild(messageText);
        messageBox.appendChild(closeButton);
        document.body.appendChild(messageBox);
    }
});