class Cronometro {
    constructor() {
        this.segundos = 0;
        this.minutos = 10;
    }

    descontar() {
        if (this.segundos > 0) {
            this.segundos--;
        } else {
            this.segundos = 59;
            this.minutos--;
        }
    }

    getTiempo() {
        if (this.segundos < 10) {
            return this.minutos + ':0' + this.segundos;
        } else {
            return this.minutos + ':' + this.segundos;
        }
    }

}