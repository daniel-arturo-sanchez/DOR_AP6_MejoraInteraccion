// Elementos principales
const aumentarBtn = document.getElementById('aumentar');
const reestablecerBtn = document.getElementById('reset');
const disminuirBtn = document.getElementById('disminuir');
const themeSwitch = document.getElementById("theme");
const body = document.body;
const root = document.documentElement;
const localStorageDarkTheme = "dor_darktheme";
let contador = 0;

// Configuración de tamaños
const tamanioInicial = parseFloat(getComputedStyle(root).getPropertyValue('--font-size-base')); // Tamaño inicial en rem
const escala = parseFloat(getComputedStyle(root).getPropertyValue('--font-size-step')); // Incremento/decremento en rem (2px)
const isDarkTheme = () => document.body.classList.contains("dark-theme");
// Variable para controlar el tamaño actual
let tamanioActual = tamanioInicial;

(function () {
    switch(localStorage.getItem(localStorageDarkTheme)){
        case "on":
            setTheme();
            break;
        case "off":
            break;
        default:
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setTheme();
            }
            break;
    }
})();
// Función para actualizar el tamaño de letra
function actualizarTamanio(nuevoTamanio) {
    tamanioActual = nuevoTamanio;
    body.style.fontSize = `${tamanioActual}rem`;
}

// Eventos para los botones
aumentarBtn.addEventListener('click', () => {
    if(contador >= -2 && contador < 2 ){
        contador++;
        actualizarTamanio(tamanioActual + escala);
    }
});

disminuirBtn.addEventListener('click', () => {
    if(contador > -2 && contador <= 2 ){
        contador--;
        actualizarTamanio(tamanioActual - escala);
  }
});

reestablecerBtn.addEventListener('click', ()=> actualizarTamanio(tamanioInicial));

themeSwitch.addEventListener('click', ()=> {
    // themeSwitch.previousElementSibling.checked = !themeSwitch.previousElementSibling.checked;
    // if (isDarkTheme()){
    //     document.body.removeAttribute("class");
    // } else {
    //     document.body.setAttribute("class", "dark-theme");
    // }
    setTheme();
});

themeSwitch.previousElementSibling.addEventListener('click', ()=> {
    setTheme();
});

function setTheme() {
    themeSwitch.previousElementSibling.checked = !themeSwitch.previousElementSibling.checked;
    if (isDarkTheme()){
        document.body.setAttribute("class", "light-theme");
        themeSwitch.lastElementChild.style.fill = "#f2f0ed";
        localStorage.setItem("dor_darktheme", "off");
    } else {
        document.body.setAttribute("class", "dark-theme");
        themeSwitch.lastElementChild.style.fill = "gold";
        localStorage.setItem("dor_darktheme", "on");
    }
}