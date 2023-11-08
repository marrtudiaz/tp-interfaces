const main = document.getElementById("content")
main.style.paddingLeft = "60px"


document.addEventListener("DOMContentLoaded", function() {
    const toggleMenuBtn = document.getElementById("toggleMenu");
    const menuHamburguesa = document.getElementById("menuHamburguesa");

    let isOpen = false; // Variable para rastrear si el menú está abierto o cerrado

    // Función para alternar la visibilidad del menú y rotar la imagen
    function toggleMenu() {
        isOpen = !isOpen;

        // Aplicar rotación dependiendo del estado del menú
        if (isOpen) {
            toggleMenuBtn.classList.add("rotated");
            main.style.paddingLeft = "0px"
        } else {
            toggleMenuBtn.classList.remove("rotated");
            main.style.paddingLeft = "60px"
        }

        // Alternar la clase "mostrado" en el menú
        menuHamburguesa.classList.toggle("mostrado");
    }

    // Evento de clic para abrir o cerrar el menú
    toggleMenuBtn.addEventListener("click", toggleMenu);
});