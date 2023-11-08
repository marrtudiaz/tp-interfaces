"use strict";
class Juego {
    constructor(tablero, fichasAGanar) {

        this.tablero = tablero;
        this.fichas = [];
        this.contadorFichasUbicadas = 0;
        this.limite = fichasAGanar;
        this.ganador = null;
        //establecemos pos1 y pos2 para ubicar las fichas
        this.pos1 = this.tablero.ladoImagen / 2;
        this.pos2 = this.tablero.comienzoX + this.tablero.ancho * this.tablero.ladoImagen + this.tablero.ladoImagen / 2;
        this.tamanio = 480
        this.radius = (this.tamanio / (this.limite+2)) / 2 - 5;
        this.espera;
        this.cronometro;
        this.jugador1 = jugador1;
        this.jugador2 = jugador2;
    }


    getpos1() {
        return this.pos1;
    }

    getpos2() {
        return this.pos2;
    }


    //llama a crear tablero dentro de la clase tablero
    mostrarTablero() {
        this.tablero.crearTablero();
    }

    generarFichas(ficha, pos, jugador1, jugador2) {
        if (pos < (this.tablero.ancho * this.tablero.ladoImagen / 2)) {
            //genera la ficha 1 y la agrega al arreglo
            ficha = new Ficha(pos + this.radius + 5, (Math.random() * (((this.tablero.ladoImagen * this.tablero.alto)) - this.tablero.comienzoY) + this.tablero.comienzoY), '#ff0000', ctx, this.radius, `../images/4enraya/${jugador1}Ficha.png`, 1);

            this.fichas.push(ficha);
        } else {
            //genera la ficha 2 y la agrega al arreglo
            ficha = new Ficha(pos + this.radius + 5, (Math.random() * (((this.tablero.ladoImagen * this.tablero.alto)) - this.tablero.comienzoY) + this.tablero.comienzoY), '#ff0000', ctx, this.radius, `../images/4enraya/${jugador2}Ficha.png`, 2);
            //la ficha es  bloqueada porque siempre arranca el jugador 1
            ficha.bloquearFicha();
            this.fichas.push(ficha);

        }
    }



    //funcion que devuelve el x e y del mouse
    getMousePos(canvas, evt) {
        let ClientRect = canvas.getBoundingClientRect();
        return {
            x: Math.round(evt.clientX - ClientRect.left),
            y: Math.round(evt.clientY - ClientRect.top)
        }
    }

    mostrarFichas() {
        for (let i = 0; i < this.fichas.length; i++) {
            this.fichas[i].draw();
        }
    }

    //se ubica una ficha en una columna
    ubicarFicha(x, y, fichaSelect, ctx) {
            let columnaValida = 0;

            //se obtiene un numero de columna valida dependiendo la ubicacion de x e y 
            columnaValida = this.tablero.esValida(x, y);
            if (columnaValida > -1 && columnaValida < this.tablero.getNroCol()) {
                //si la columna es valida se obtiene una fila valida
                let filaValida = this.tablero.ingresoFicha(columnaValida, fichaSelect);
                if (filaValida > -1) {
                    //si la fila tambien es valida entonces la ficha cae
                    this.tablero.caeFicha(fichaSelect, columnaValida, filaValida);
                    //se vuelve a dibujar el tablero
                    ctx.clearRect(0, 0, width, height);
                    this.tablero.draw();
                    this.mostrarFichas();
                    //si ubica la ficha aumento el contador para el control
                    this.contadorFichasUbicadas++;
                    //se comprueba si hay ganador
                    if (this.alguienGana(this.tablero.matriz, filaValida, columnaValida, fichaSelect, this.limite)) {
                        //seteamos el ganador y terminamos el juego
                        this.ganador = fichaSelect.getJugador();
                        this.terminar();
                        clearInterval(this.espera);

                    }
                    //pregunta si no hay mas fichas que ubicar y termina el juego
                    if (this.noHayMasFichas()) {
                        this.terminar();
                        clearInterval(this.espera);
                    }

                } else {
                    //reubicamos la ficha si se suelta en cualquiera lado 
                    this.reubicarFicha(fichaSelect, ctx);
                }
            } else {
                //reubicamos la ficha si se suelta en cualquiera lado 
                this.reubicarFicha(fichaSelect, ctx);
            }
        }
        //se reubica la ficha mediante las posiciones iniciales de la misma
    reubicarFicha(fichaSelect, ctx) {
        fichaSelect.setPosY(fichaSelect.getPosYAnt());
        fichaSelect.setPosX(fichaSelect.getPosXAnt());
        ctx.clearRect(0, 0, width, height);
        this.tablero.draw();
        this.mostrarFichas();
    }

    //chequear si alguien alineo la cantidad necesaria para ganar

    alguienGana(matriz, fila, columna, fichaSelect, cantFichas) {
        let gana = false;
        let enLinea = 0;

        if (matriz.length - fila >= cantFichas) { // solo busca hacia abajo si hay la cantidad de filas necesarias en esa direccion
            enLinea = this.abajo(matriz, fila, columna, fichaSelect, cantFichas);
        }
        if (enLinea >= cantFichas) {
            gana = true;
        } else {
            enLinea = this.derecha(matriz[fila], columna, fichaSelect, cantFichas);
            if (enLinea >= cantFichas) {
                gana = true;
            } else { //si no llego a la cantidad en esa direccion, busca en la direccion opuesta a partir de la posicion original,y suma los elementos
                enLinea += this.izquierda(matriz[fila], columna, fichaSelect, cantFichas) - 1;
            }
        }
        if (enLinea >= cantFichas) {
            gana = true;
        } else {
            enLinea = this.derechaAbajo(matriz, fila, columna, fichaSelect, cantFichas);
            if (enLinea >= cantFichas) {
                gana = true;
            } else {
                enLinea += this.izquierdaArriba(matriz, fila, columna, fichaSelect, cantFichas) - 1;
            }
        }
        if (enLinea >= cantFichas) {
            gana = true;

        } else {
            enLinea = this.derechaArriba(matriz, fila, columna, fichaSelect, cantFichas);
            if (enLinea >= cantFichas) {
                gana = true;
            } else {
                enLinea += this.izquierdaAbajo(matriz, fila, columna, fichaSelect, cantFichas) - 1;
            }
        }
        if (enLinea >= cantFichas) {
            gana = true;
        }
        return gana;

    }

    //Recorridos para chequear cantidad fichas alineadas
    abajo(matriz, fila, columna, fichaSelect) {
        let contador = 0;

        while (contador < this.limite && matriz[fila][columna] == fichaSelect.getJugador()) {
            fila++;
            contador++;
        }

        return contador;
    }

    derecha(arrHilera, columna, fichaSelect) {
        let contador = 0;

        while (contador < this.limite && columna < this.tablero.ancho && arrHilera[columna] == fichaSelect.getJugador()) {
            columna++;
            contador++;
        }

        return contador;
    }

    izquierda(arrHilera, columna, fichaSelect) {
        let contador = 0;

        while (contador < this.limite && columna >= 0 && arrHilera[columna] == fichaSelect.getJugador()) {
            columna--;
            contador++;
        }

        return contador;
    }
    derechaArriba(matriz, fila, columna, fichaSelect) {
        let contador = 0;

        while (contador < this.limite && fila >= 0 && columna < this.tablero.ancho && matriz[fila][columna] == fichaSelect.getJugador()) {
            fila--;
            columna++;

            contador++;
        }
        return contador;
    }

    derechaAbajo(matriz, fila, columna, fichaSelect) {
        let contador = 0;

        while (contador < this.limite && fila < this.tablero.alto && columna < this.tablero.ancho && matriz[fila][columna] == fichaSelect.getJugador()) {
            fila++;
            columna++;

            contador++;
        }
        return contador;
    }

    izquierdaArriba(matriz, fila, columna, fichaSelect) {
        let contador = 0;

        while (contador < this.limite && fila >= 0 && columna >= 0 && matriz[fila][columna] == fichaSelect.getJugador()) {
            fila--;
            columna--;

            contador++;
        }
        return contador;
    }

    izquierdaAbajo(matriz, fila, columna, fichaSelect) {
        let contador = 0;

        while (contador < this.limite && fila < this.tablero.alto && columna >= 0 && matriz[fila][columna] == fichaSelect.getJugador()) {
            fila++;
            columna--;

            contador++;
        }
        console.log(contador);
        return contador;
    }

    //termina el juego
    terminar() {
        //se bloquean todas las fichas
        this.fichas.forEach(ficha => {
                ficha.bloquearFicha();
            })
            //limpiamos cuadro de turnos
        let turnos = document.querySelectorAll('.turno');
        turnos.forEach(turno => {
            turno.classList.remove("visible");
            turno.classList.add("invisible");
        });
        let tiempo = document.querySelector("#tmp");
        tiempo.classList.add("inactive");
        let contenedor = document.querySelector("#quienGano");
        let ganador = document.querySelector("#theWinnerIs");
        ganador.classList.remove("inactive");
        ganador.classList.add("active");
        //se muestra quien gano
        if (this.ganador) {
            ganador = fichaSelect.getJugador();
            if (ganador == 1) {
                contenedor.innerHTML = `GANADOR: Player 1`;                
            } else {
                contenedor.innerHTML = `GANADOR: Player 2`;                                
            }

        } else {

            contenedor.innerHTML = /*"No hay mas fichas.*/ "¡Empataron!"; //charlar con Fran
        }
        //se corta el timer
        clearInterval(this.espera);
    }



    timer() {
        let cronometro_contenedor = document.getElementById('cronometro');

        this.cronometro = new Cronometro();
        //le pedimos el tiempo al cronometro
        cronometro_contenedor.innerHTML = this.cronometro.getTiempo();
        //llamamos a espera cada 1 segundo para ir descontando el tiempo
        this.espera = setInterval(() => {
            this.cronometro.descontar();
            let tiempo = this.cronometro.getTiempo();
            if (tiempo == "0:00") {
                //si el tiempo es 0 se termina el juego
                clearInterval(this.espera);
                this.tiempoFinal();
            }
            cronometro_contenedor.innerHTML = tiempo;
        }, 1000);
    }

    tiempoFinal() {
            let contGanador = document.getElementById("theWinnerIs");
            let finalizado = document.getElementById("sinTiempo");
             contGanador.classList.remove('inactive');
             contGanador.classList.add('active');
            this.terminar();
            finalizado.innerHTML = "¡Se terminó el tiempo!";

        }
        //chequea si quedan fichas por ubicar
    noHayMasFichas() {
        return this.fichas.length == this.contadorFichasUbicadas;
    }



}