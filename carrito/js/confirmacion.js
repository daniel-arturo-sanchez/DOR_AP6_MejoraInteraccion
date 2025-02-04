document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('confirm-button');
    const navCart = document.querySelector('.nav-cart');
    const successMessage = document.getElementById('success-message');
    const header = document.querySelector('h1');
    const header2 = document.querySelector('h2');
    const cartList = document.getElementById('cart');
    const customerInfoList = document.getElementById('customer-info');
    const paymentInfoList = document.getElementById('payment-info');
    const envioList = document.getElementById('datos-envio');
    const facturacionList = document.getElementById('datos-fact');
    const contactoList = document.getElementById('datos-contacto');
    const metodosPagoList = document.getElementById('metodos-pago');
    const summary = document.getElementById('summary');

    // Función para cargar datos desde localStorage y mostrarlos en la lista
    function loadAndDisplayData() {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const igic = localStorage.getItem('igic');
        const envio = JSON.parse(localStorage.getItem('envio'));
        const total = localStorage.getItem('total');
        const subTotal = localStorage.getItem('subTotal');
        const pago = JSON.parse(localStorage.getItem('pago'));

        if (cart) {
            cart.forEach(item => {
                const cartItem = document.createElement('li');
                cartItem.textContent = `${item.quantity} x ${item.name}`;
                cartList.appendChild(cartItem);
            });
        }

        if (envio) {
            const keysToDisplay = ['nombre', 'apellido', 'dni-nie'];
            keysToDisplay.forEach(key => {
                if (envio[key]) {
                    const envioItem = document.createElement('li');
                    envioItem.textContent = `${key}: ${envio[key]}`;
                    customerInfoList.appendChild(envioItem);
                }
            });

            if (envio['datos-facturacion'] === 'on') {
                keysToDisplay.forEach(key => {
                    if (envio[key]) {
                        const facturacionItem = document.createElement('li');
                        facturacionItem.textContent = `${key}: ${envio[key]}`;
                        facturacionList.appendChild(facturacionItem);
                    }
                });
            } else {
                const factKeysToDisplay = ['fact-nombre', 'fact-apellido', 'fact-dni-nie'];
                factKeysToDisplay.forEach(key => {
                    if (envio[key]) {
                        const facturacionItem = document.createElement('li');
                        facturacionItem.textContent = `${key.replace('fact-', '')}: ${envio[key]}`;
                        facturacionList.appendChild(facturacionItem);
                    }
                });
            }

            const envioKeysToDisplay = ['direccion', 'ciudad', 'provincia', 'pais', 'codigo_postal'];
            envioKeysToDisplay.forEach(key => {
                if (envio[key]) {
                    const envioItem = document.createElement('li');
                    envioItem.textContent = `${key}: ${envio[key]}`;
                    envioList.appendChild(envioItem);
                }
            });

            const contactoKeysToDisplay = ['email', 'telefono'];
            contactoKeysToDisplay.forEach(key => {
                if (envio[key]) {
                    const contactoItem = document.createElement('li');
                    contactoItem.textContent = `${key}: ${envio[key]}`;
                    contactoList.appendChild(contactoItem);
                }
            });
        }

        if (subTotal) {
            const subTotalItem = document.createElement('li');
            subTotalItem.textContent = `SubTotal: ${subTotal}`;
            paymentInfoList.appendChild(subTotalItem);
        }

        if (igic) {
            const igicItem = document.createElement('li');
            igicItem.textContent = `IGIC: ${igic}`;
            paymentInfoList.appendChild(igicItem);
        }

        if (total) {
            const totalItem = document.createElement('li');
            totalItem.textContent = `Total: ${total}`;
            paymentInfoList.appendChild(totalItem);
        }

        if (pago) {
            for (const key in pago) {
                if (pago.hasOwnProperty(key)) {
                    const pagoItem = document.createElement('li');
                    pagoItem.textContent = `${key}: ${pago[key]}`;
                    metodosPagoList.appendChild(pagoItem);
                }
            }
        }
    }

    // Cargar y mostrar los datos al cargar la página
    loadAndDisplayData();

    button.addEventListener('click', function() {
        navCart.style.display = 'none';
        summary.style.display = 'none';
        successMessage.style.display = 'block';
        header.textContent = 'Pedido confirmado';
        header2.style.display = 'none';
        button.style.display = 'none';
        localStorage.removeItem('cart');
        localStorage.removeItem('igic');
        localStorage.removeItem('envio');
        localStorage.removeItem('total');
        localStorage.removeItem('subTotal');
        localStorage.removeItem('pago');
        localStorage.removeItem('descuento');
    });
});