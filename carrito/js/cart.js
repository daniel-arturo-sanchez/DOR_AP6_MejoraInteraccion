document.addEventListener('DOMContentLoaded', function() {
    const rows = document.querySelectorAll('table tbody tr');
    const totalAmountElement = document.getElementById('total-amount');
    const subTotalElement = document.getElementById('sub-total');
    const igicElement = document.getElementById('igic');
    const continueButton = document.querySelector('form button[type="submit"]');

    function updateTotalAmount() {
        let totalAmount = 0;
        let subTotal = 0;
        const selectedItems = [];
        let hasSelectedItems = false;

        document.querySelectorAll('table tbody tr').forEach(row => {
            const checkbox = row.querySelector('input[type="checkbox"]');
            const quantityInput = row.querySelector('input[type="number"]');
            const priceCell = row.querySelector('td:nth-child(5)');
            const totalCell = row.querySelector('td:nth-child(6)');
            const nameCell = row.querySelector('td:nth-child(3)');

            if (checkbox.checked) {
                const quantity = parseInt(quantityInput.value, 10);
                const price = parseFloat(priceCell.textContent);
                const total = quantity * price;
                totalCell.textContent = total.toFixed(2); // Format to 2 decimal places
                totalAmount += total;
                subTotal += total;

                // Store the name, quantity, and price of the checked items
                selectedItems.push({
                    name: nameCell.textContent,
                    quantity: quantity,
                    price: price
                });

                hasSelectedItems = true;
            } else {
                totalCell.textContent = '';
            }

            // Remove row if quantity is 0
            if (quantityInput.value == 0) {
                row.remove();
            }
        });

        const igic = subTotal * 0.07;
        const total = subTotal + igic;

        totalAmountElement.textContent = total.toFixed(2); // Format to 2 decimal places
        subTotalElement.textContent = subTotal.toFixed(2);
        igicElement.textContent = igic.toFixed(2);

        // Store the selected items and totals in localStorage
        localStorage.setItem('cart', JSON.stringify(selectedItems));
        localStorage.setItem('subTotal', subTotal.toFixed(2));
        localStorage.setItem('igic', igic.toFixed(2));
        localStorage.setItem('total', total.toFixed(2));

        // Disable continue button if no items are selected or no items in the table
        continueButton.disabled = !hasSelectedItems || document.querySelectorAll('table tbody tr').length === 0;
    }

    function loadCartFromLocalStorage() {
        const cartData = JSON.parse(localStorage.getItem('cart'));
        const subTotal = localStorage.getItem('subTotal');
        const igic = localStorage.getItem('igic');
        const total = localStorage.getItem('total');

        if (cartData) {
            cartData.forEach(item => {
                rows.forEach(row => {
                    const nameCell = row.querySelector('td:nth-child(3)');
                    if (nameCell.textContent === item.name) {
                        const checkbox = row.querySelector('input[type="checkbox"]');
                        const quantityInput = row.querySelector('input[type="number"]');
                        checkbox.checked = true;
                        quantityInput.value = item.quantity;
                    }
                });
            });

            subTotalElement.textContent = subTotal;
            igicElement.textContent = igic;
            totalAmountElement.textContent = total;
        }
    }

    // Load cart from localStorage if available
    loadCartFromLocalStorage();

    // Initial calculation
    updateTotalAmount();

    // Update total when quantity or checkbox changes
    document.querySelectorAll('table tbody tr').forEach(row => {
        const checkbox = row.querySelector('input[type="checkbox"]');
        const quantityInput = row.querySelector('input[type="number"]');

        checkbox.addEventListener('change', updateTotalAmount);
        quantityInput.addEventListener('input', updateTotalAmount);
    });

    // Add event listener to remove buttons
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            const row = button.closest('tr');
            row.remove();
            updateTotalAmount();
        });
    });

    // Add event listeners to increase and decrease buttons
    document.querySelectorAll('.increase-btn').forEach(button => {
        button.addEventListener('click', function() {
            const quantityInput = button.closest('td').querySelector('input[type="number"]');
            quantityInput.value = parseInt(quantityInput.value, 10) + 1;
            updateTotalAmount();
        });
    });

    document.querySelectorAll('.decrease-btn').forEach(button => {
        button.addEventListener('click', function() {
            const quantityInput = button.closest('td').querySelector('input[type="number"]');
            if (quantityInput.value > 0) {
                quantityInput.value = parseInt(quantityInput.value, 10) - 1;
                updateTotalAmount();
            }
        });
    });
});