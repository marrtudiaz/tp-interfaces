"use strict";

class Ficha {
    constructor(posX, posY, color, ctx, radio, imagen, numJugador) {
        this.posX = posX;
        this.posY = posY;
        this.posXAnt = posX;
        this.posYAnt = posY;
        this.color = color;
        this.ctx = ctx;
        this.radio = radio;
        //se le asigna a la ficha un numero de jugador para reconocerla a la hora de ubicarla
        this.jugador = numJugador;
        this.selected = false;
        this.bloqueada = false;
        this.image = new Image();
        this.image.src = imagen;
        
    }

    getPosX() {
        return this.posX;
    }

    setPosX(x) {
        this.posX = x;
    }

    getPosXAnt() {
        return this.posXAnt;
    }



    getPosY() {
        return this.posY;
    }
    getPosYAnt() {
        return this.posYAnt;
    }
    setPosY(y) {
        this.posY = y;
    }


    getColor() {
        return this.color;
    }

    getJugador() {
        return this.jugador;
    }

    setColor(color) {
        this.color = color;
    }

    bloquearFicha() {
        this.bloqueada = true;
    }

    desbloquearFicha() {
        this.bloqueada = false;
    }

    estaUbicada() {
        return this.bloqueada;
    }
    draw() {
        //dibuja la ficha dada una imagen
        this.ctx.fillStyle = this.image;

        this.ctx.arc(this.posX, this.posY, this.radio, 0, 2 * Math.PI);

        this.ctx.drawImage(this.image, this.posX - this.radio, this.posY - this.radio, this.radio * 2, this.radio * 2);

    }

    isClickedCuadrado(posicion) {
        //funciona solamente con cuadrado
        if ((posicion.x < this.posX + this.radio / 2 && posicion.x >= this.posX - this.radio / 2) &&
            (posicion.y < this.posY + this.radio / 2 && posicion.y >= this.posY - this.radio / 2)) {
            return true;
        } else {
            return false;
        }
    }

    isClickedCirculo(posicion) {
        //verifica que el circulo se haya clickeado
        if (Math.sqrt((posicion.x - this.posX) * (posicion.x - this.posX) + (posicion.y - this.posY) * (posicion.y - this.posY)) <=
            this.radio) {
            return true;
        } else {
            return false;
        }
    }
}