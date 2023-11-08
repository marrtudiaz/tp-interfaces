"use strict";

let canvas = /** @type { HTMLcanvasElement} */ document.getElementById("canvas");
let ctx = canvas.getContext('2d');
let width = 0;
let height = 0;
let fichas = [];
let fichaSelect;
let arrastrar = false;
let tablero;
let juego;
let jugador1;
let jugador2;



function oMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return { // devuelve un objeto
        x: Math.round(evt.clientX - rect.left),
        y: Math.round(evt.clientY - rect.top),
    }

}


document.addEventListener('DOMContentLoaded', () => {
    let btnPlay = document.getElementById('btn_play');
    let contenedor_menu = document.getElementById('init_juego');
    let contenedor_juego = document.getElementById('contenedor_juego');
    let tablero_cont = document.getElementById('tablero');
    btnPlay.addEventListener('click', () => {
        contenedor_menu.classList.add('inactive');
        contenedor_juego.classList.remove('inactive');
        let jugabilidad = document.querySelector('input[name="boardSize"]:checked').value; 
        this.jugador1 = document.querySelector('input[name="jugador1"]:checked').value;
        this.jugador2 = document.querySelector('input[name="jugador2"]:checked').value;
        tablero_cont.classList.remove('invisible');
        cargarJuego(Number(jugabilidad), this.jugador1, this.jugador2);
    });
});




function cargarJuego(jugabilidad, jugador1, jugador2) {
    //dibujamos el tablero y creamos la modalida dde juego
    let cantfichas = (((jugabilidad + 2) * (jugabilidad + 2)) / 2);
    tablero = new Tablero(ctx, jugabilidad);
    juego = new Juego(tablero, jugabilidad);
    width = juego.pos2 + tablero.ladoImagen + 40;
    height = (jugabilidad + 3) * tablero.ladoImagen;
    canvas.width = width;
    canvas.height = height;
    //generamos las fichas
    if (jugabilidad % 2 === 0) {
        for (let i = 0; i < cantfichas; i++) {
            juego.generarFichas('ficha1', juego.getpos1(), jugador1, jugador2);
            juego.generarFichas('ficha2', juego.getpos2(), jugador1, jugador2);
        }        
    } else {
        for (let i = 0; i < cantfichas -1; i++) {
            juego.generarFichas('ficha1', juego.getpos1(), jugador1, jugador2);
            juego.generarFichas('ficha2', juego.getpos2(), jugador1, jugador2);
        }
        juego.generarFichas('ficha1', juego.getpos1(), jugador1, jugador2);
    }
    document.querySelector('#turno1').innerHTML = `${jugador1}`;
    document.querySelector('#turno2').innerHTML = `${jugador2}`;
    document.querySelector('#fichaPlayer1').src = `../images/4enraya/${jugador1}Ficha.png`
    document.querySelector('#fichaPlayer2').src = `../images/4enraya/${jugador2}Ficha.png`
    //llamamos a mostrar fichas e inicializamos el timer
    juego.fichas[juego.fichas.length-1].image.onload = () => {
        juego.mostrarFichas();
    };
    tablero.image.onload = () => {
        tablero.imageArrow.onload = () => {
            tablero.draw();
        }
    }
    juego.timer();
}

function resetGame(){
    ctx.clearRect(0, 0, width, height); //limpiamos canvas
    let turno = document.getElementById("player1");
    let noTurno = document.getElementById("player2");
    turno.classList.remove("invisible");
    turno.classList.add("visible");
    noTurno.classList.remove("visible");
    noTurno.classList.add("invisible");


    clearInterval(juego.espera); //reiniciamos timer
    let mensajes = document.querySelectorAll("#theWinnerIs h2"); //para el caso de que se reinicie por un ganador
    let ganador = document.querySelector("#theWinnerIs");
    let tiempo = document.querySelector("#tmp");
    tiempo.classList.remove("inactive");
    ganador.classList.remove("active");
    ganador.classList.add("inactive");

    mensajes.forEach(mje => {
        mje.innerHTML = '';
    });
}

let reset = document.querySelector("#btn_reset"); //reinicia el juego con la modalidad ya seleccionada

reset.addEventListener('click', () => {
    let jugabilidad = document.querySelector('input[name="boardSize"]:checked').value; //mantenemos la modalidad de juego seleccionada
    resetGame();
    cargarJuego(Number(jugabilidad), this.jugador1, this.jugador2);
})

let exit = document.querySelector("#btn_exit"); //reinicia el juego con la modalidad ya seleccionada

exit.addEventListener('click', () => {
    resetGame();
    let contenedor_menu = document.getElementById('init_juego');
    let contenedor_juego = document.getElementById('contenedor_juego');
    contenedor_menu.classList.remove('inactive');
    contenedor_juego.classList.add('inactive');

})
//
//cuando se hace click en el mouse
canvas.addEventListener('mousedown', (evt) => {
    //obtenemos la posicion
    var mousePos = oMousePos(canvas, evt);
    //recorremos todas las fichas para ver cual esta clickeada
    for (let i = juego.fichas.length - 1; i >= 0; i--) {
        let ficha = juego.fichas[i];
        //si se hizo click en la ficha y no esta ubicada se genera el arrastre
        if (ficha.isClickedCirculo(mousePos)) {
            if (!ficha.estaUbicada()) {
                //cambiamos el estado de arrastrar para el movimiento del mouse
                arrastrar = true;
                //seteamos la nueva posicion de ficha
                fichaSelect = ficha;
                fichaSelect.setPosX(mousePos.x);
                fichaSelect.setPosY(mousePos.y);
                ctx.clearRect(0, 0, width, height);
                tablero.draw();
                juego.mostrarFichas();
                break;
            }
        }
    }


}, false);
//cuando se mueve el mouse dibujamos de nuevo las fichas en las respectivas posiciones
canvas.addEventListener("mousemove", function(evt) {
    let mousePos = oMousePos(canvas, evt);

    if (arrastrar) {
        ctx.clearRect(0, 0, width, height);
        fichaSelect.setPosX(mousePos.x);
        fichaSelect.setPosY(mousePos.y);
        tablero.draw();
        juego.mostrarFichas();

    }
}, false);

//una vez que se suelta la ficha comprobamos en donde termino ese evento
canvas.addEventListener("mouseup", function(evt) {
    let mousePos = oMousePos(canvas, evt);

    arrastrar = false;
    if (fichaSelect) {
        juego.ubicarFicha(mousePos.x, mousePos.y, fichaSelect, ctx);

    }
    fichaSelect = null;

}, false);

canvas.addEventListener("mouseout", function(evt) {
    if (arrastrar) {
        arrastrar = false;
        ctx.clearRect(0, 0, width, height);
        fichaSelect.setPosX(fichaSelect.getPosXAnt());
        fichaSelect.setPosY(fichaSelect.getPosYAnt());
        tablero.draw();
        juego.mostrarFichas();
    }
    if (fichaSelect) {
        fichaSelect = null;

    }

}, false);