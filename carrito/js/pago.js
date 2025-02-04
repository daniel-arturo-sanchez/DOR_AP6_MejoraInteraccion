document.addEventListener('DOMContentLoaded', function() {
    const validarCodeButton = document.getElementById('validar-code');
    const descuentoInput = document.getElementById('descuento');
    const validateCodeMessage = document.getElementById('validate-code-message');
    const form = document.querySelector('form');
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const tarjetaFields = document.querySelectorAll('#card-name, #numero-tarjeta, #fecha_expiracion, #cvv');
    const paypalFields = document.querySelectorAll('#paypal-email');
    const transferenciaFields = document.querySelectorAll('#bank-transfer');

    validarCodeButton.addEventListener('click', function(event) {
        event.preventDefault(); // Evitar el envío del formulario
        if (descuentoInput.value.trim() !== "") {
            validateCodeMessage.textContent = "Código válido, descuento aplicado 10%";
            validateCodeMessage.style.color = "green"; // Opcional: cambiar el color del mensaje
        } else {
            validateCodeMessage.textContent = "Por favor, introduzca un código de descuento.";
            validateCodeMessage.style.color = "red"; // Opcional: cambiar el color del mensaje
        }
    });

    // Habilitar/deshabilitar secciones de pago según la opción seleccionada
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (radio.checked) {
                switch (radio.value) {
                    case 'tarjeta':
                        enableFields(tarjetaFields);
                        disableFields(paypalFields);
                        disableFields(transferenciaFields);
                        break;
                    case 'paypal':
                        disableFields(tarjetaFields);
                        enableFields(paypalFields);
                        disableFields(transferenciaFields);
                        break;
                    case 'transferencia':
                        disableFields(tarjetaFields);
                        disableFields(paypalFields);
                        enableFields(transferenciaFields);
                        break;
                }
            }
        });
    });

    // Función para habilitar campos
    function enableFields(fields) {
        fields.forEach(field => {
            field.disabled = false;
        });
    }

    // Función para deshabilitar campos
    function disableFields(fields) {
        fields.forEach(field => {
            field.disabled = true;
        });
    }

    // Almacenar datos del formulario en localStorage al hacer submit
    form.addEventListener('submit', function(event) {
        const formData = new FormData(form);
        const pagoData = {};
        formData.forEach((value, key) => {
            pagoData[key] = value;
        });
        localStorage.setItem('pago', JSON.stringify(pagoData));
    });

    // Cargar datos del formulario desde localStorage
    function loadFormData() {
        const pagoData = JSON.parse(localStorage.getItem('pago'));
        if (pagoData) {
            for (const key in pagoData) {
                if (pagoData.hasOwnProperty(key)) {
                    const input = form.elements[key];
                    if (input) {
                        if (input.type === 'checkbox' || input.type === 'radio') {
                            input.checked = pagoData[key] === 'on';
                        } else {
                            input.value = pagoData[key];
                        }
                    }
                }
            }

            // Simular el cambio de opción de pago para habilitar/deshabilitar secciones
            const selectedPaymentRadio = document.querySelector(`input[name="payment"][value="${pagoData['payment']}"]`);
            if (selectedPaymentRadio) {
                selectedPaymentRadio.dispatchEvent(new Event('change'));
            }
        }
    }

    // Cargar datos del formulario al cargar la página
    loadFormData();
});