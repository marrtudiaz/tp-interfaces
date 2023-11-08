document.addEventListener("DOMContentLoaded", function() {
    const menuUserBtn = document.getElementById("menuUserBtn");
    const menuPerfilUser = document.getElementById("menuPerfilUser");
    const cerrarMenuBtn = document.getElementById("cerrarMenuBtn");
    const body = document.getElementById("content")

    menuUserBtn.addEventListener("click", function() {
        menuPerfilUser.classList.toggle("abierto");
        body.classList.add("sombrita");

    });

    cerrarMenuBtn.addEventListener("click", function() {
        menuPerfilUser.classList.remove("abierto");
        body.classList.remove("sombrita")
    });
});