// Script para ocultar o mostrar divs en función de donde se clicka

document.addEventListener('DOMContentLoaded', () => {
	const imgs = document.querySelectorAll('.gallery img');
	let currentIndex = 0;

	// Modal con imágenes a pantalla completa
	const fullScreen = document.getElementById('fullscreen');
	const leftArrow = document.createElement('div');
	const rightArrow = document.createElement('div');

	leftArrow.textContent = ' ';
	rightArrow.textContent = ' ';
	leftArrow.className = 'arrow left-arrow';
	rightArrow.className = 'arrow right-arrow';

	fullScreen.appendChild(leftArrow);
	fullScreen.appendChild(rightArrow);

	function updateFullScreenImage(index) {
		if (index < 0) {
			currentIndex = imgs.length - 1;
		} else if (index >= imgs.length) {
			currentIndex = 0;
		} else {
			currentIndex = index;
		}
		console.log(imgs);
		fullScreen.style.backgroundImage = `url('${imgs[currentIndex].getAttribute('data-full')}')`;
		fullScreen.style.display = 'block';
	}

	imgs.forEach((img, index) => {
		img.addEventListener('click', function (event) {
			event.stopPropagation();
			updateFullScreenImage(index);
		});
	});

	leftArrow.addEventListener('click', function (event) {
		event.stopPropagation();
		updateFullScreenImage(currentIndex - 1);
	});

	rightArrow.addEventListener('click', function (event) {
		event.stopPropagation();
		updateFullScreenImage(currentIndex + 1);
	});

	// Cierra el modo de pantalla completa al hacer clic en el contenedor
	fullScreen.addEventListener('click', function (event) {
		event.stopPropagation();
		this.style.display = 'none';
	});
});
