document.addEventListener('DOMContentLoaded', function() {
    const factCheckbox = document.getElementById('datos-facturacion');
    const factInputs = document.querySelectorAll('#fact-input input[type="text"]');
    const envioRadios = document.querySelectorAll('input[name="envio"]');
    const metodoEnvioFieldset = document.getElementById('metodos-envio');
    const metodoEnvioRadios = metodoEnvioFieldset.querySelectorAll('input[name="metodo-envio"]');
    const form = document.querySelector('form');

    // Deshabilitar inputs de facturación si el checkbox está marcado
    factCheckbox.addEventListener('change', function() {
        factInputs.forEach(input => {
            input.disabled = factCheckbox.checked;
        });
    });

    // Habilitar/deshabilitar métodos de envío según la zona de envío seleccionada
    envioRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (radio.checked) {
                switch (radio.value) {
                    case 'peninsula':
                        metodoEnvioFieldset.disabled = false;
                        metodoEnvioRadios.forEach(input => {
                            input.disabled = false;
                        });
                        break;
                    case 'canarias':
                        metodoEnvioFieldset.disabled = false;
                        metodoEnvioRadios.forEach(input => {
                            input.disabled = input.id !== 'aire' && input.id !== 'mar';
                        });
                        break;
                    case 'baleares':
                        metodoEnvioFieldset.disabled = true;
                        metodoEnvioRadios.forEach(input => {
                            input.disabled = true;
                        });
                        break;
                }
            }
        });
    });

    // Almacenar datos del formulario en localStorage al hacer submit
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario para pruebas
        const formData = new FormData(form);
        const envioData = {};
        formData.forEach((value, key) => {
            envioData[key] = value;
        });
        localStorage.setItem('envio', JSON.stringify(envioData));
        form.submit(); // Enviar el formulario después de almacenar los datos
    });

    // Cargar datos del formulario desde localStorage
    function loadFormData() {
        const envioData = JSON.parse(localStorage.getItem('envio'));
        if (envioData) {
            for (const key in envioData) {
                if (envioData.hasOwnProperty(key)) {
                    const input = form.elements[key];
                    if (input) {
                        if (input.type === 'checkbox' || input.type === 'radio') {
                            input.checked = envioData[key] === 'on';
                        } else {
                            input.value = envioData[key];
                        }
                    }
                }
            }

            // Simular el cambio de zona de envío para habilitar/deshabilitar métodos de envío
            const selectedEnvioRadio = document.querySelector(`input[name="envio"][value="${envioData['envio']}"]`);
            if (selectedEnvioRadio) {
                selectedEnvioRadio.dispatchEvent(new Event('change'));
            }

            // Deshabilitar inputs de facturación si el checkbox está marcado
            if (factCheckbox.checked) {
                factInputs.forEach(input => {
                    input.disabled = true;
                });
            }
        }
    }

    // Cargar datos del formulario al cargar la página
    loadFormData();
});