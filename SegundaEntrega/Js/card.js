const btnBuyList = document.querySelectorAll(".btnBuy");

btnBuyList.forEach(btnBuy => {
    btnBuy.addEventListener('click', () => {
        // Obtén la tarjeta asociada al botón en el que se hizo clic
        const card = btnBuy.closest('.card');


        const imagen = card.querySelector('.imagen');
       // Accede a la URL de la imagen
       const imageUrl = imagen.src;
       
       const texto = card.querySelector('.titulo');
       const titulo =texto.textContent;
        // Cambia el contenido de la tarjeta
        card.innerHTML = `
        <div class="absolute">
        <div class="cart">
        <box-icon type='solid' name='cart-download' color='#fff'></box-icon>
        </div>
        <p class="price">Agregado</p>
        </div>
        <img class="imagen" src="${imageUrl}">
        <h3> ${titulo}</h3>
        
        <p><button class="btnBuy">Finalizar</button></p>
        `;
    });
    
});

