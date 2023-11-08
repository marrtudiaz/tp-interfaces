const carouselesChicos = document.querySelectorAll('.carouselChico');


carouselesChicos.forEach(carouselChico => {
    const container = carouselChico.querySelector('.carouselChicoContainer');
    const buttonLeft = carouselChico.querySelector('.carouselChicoButtonLeft');
    const buttonRight = carouselChico.querySelector('.carouselChicoButtonRight');
  
    // Controlador de evento para el botón de la izquierda
    buttonLeft.addEventListener('click', function () {
      container.scrollBy({
        left: -500, // Ajusta la cantidad de desplazamiento según tus necesidades
        behavior: 'smooth', // Agrega un desplazamiento suave
      });
    });
  
    // Controlador de evento para el botón de la derecha
    buttonRight.addEventListener('click', function () {
      container.scrollBy({
        left: 500, // Ajusta la cantidad de desplazamiento según tus necesidades
        behavior: 'smooth', // Agrega un desplazamiento suave
      });
    });
  });


const carouselContainer = document.querySelector('.carouselContainer')
const carouselControlsContainer = document.querySelector('.carouselControlsContainer')
const carouselControls = ['Previous', 'Next']
const carouselItems = document.querySelectorAll('.carouselItem')

class Carousel {
    constructor(container, items, controls) {
        this.container = container
        this.controls = controls
        this.items = [...items]
        this.startX = null;
    }

    updateCarousel() {
        this.items.forEach(item => {
            item.classList.remove('carouselItem1')
            item.classList.remove('carouselItem2')
            item.classList.remove('carouselItem3')
            item.removeEventListener('click', this.deshabilitarEnlace);
        });

        this.items.slice(0, 3).forEach((item, i) => {
            item.classList.add(`carouselItem${i + 1}`)
            if (!item.classList.contains('carouselItem2')) {
                item.addEventListener('click', this.deshabilitarEnlace)
            }
        });
    }
    deshabilitarEnlace(event) {
        event.preventDefault();
    }
    setCurrentState(direction) {
        if (direction.className == 'carouselControlPrevious') {
            this.items.unshift(this.items.pop())
        }
        else {
            this.items.push(this.items.shift())
        }
        this.updateCarousel();
    }
    setupTouchEvents() {
        this.container.addEventListener('touchstart', (e) => {
            this.startX = e.touches[0].clientX;
        });

        this.container.addEventListener('touchmove', (e) => {
            if (this.startX !== null) {
                const currentX = e.touches[0].clientX;
                const deltaX = this.startX - currentX;

                // Detecta la dirección del desplazamiento
                if (deltaX > 0) {
                    // Desplazamiento hacia la izquierda (siguiente)
                    this.setCurrentState('Next');
                } else if (deltaX < 0) {
                    var state = {};
                    state.className = "carouselControlPrevious"
                    this.setCurrentState(state);
                    // Desplazamiento hacia la derecha (anterior)
                }

                this.startX = null;
            }
        });
    }
    setControls() {
        this.controls.forEach(control => {
            carouselControlsContainer.appendChild(document.createElement('button')).className = `carouselControl${control}`
        });
    }

    useControls() {
        const triggers = [...carouselControlsContainer.childNodes]
        triggers.forEach(control => {
            control.addEventListener('click', e => {
                e.preventDefault();
                this.setCurrentState(control);
            })
        });
    }
}

const carouselExample = new Carousel(carouselContainer,carouselItems,carouselControls)
carouselExample.setControls();
carouselExample.setupTouchEvents();
carouselExample.useControls();
carouselExample.updateCarousel();

