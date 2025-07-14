// Script para ocultar o mostrar divs en función de donde se clicka

document.addEventListener('DOMContentLoaded', () => {
	const navButtons = document.querySelectorAll('[id^="showButton"]');
	const divContainers = document.querySelectorAll('.content-container');
	const infoDiv = document.getElementById('infoSection');
	const fullScreenDiv = document.getElementById('fullscreen');
	const imgs = document.querySelectorAll('.gallery img');
	const door = document.getElementById('door');
	let currentIndex = 0;

	navButtons.forEach((button, index) => {
		button.addEventListener('click', function () {
			// Cambia el título de la página al texto del botón
			const customTitle = this.getAttribute('data-title');
			document.title = customTitle;

			// Elimina la clase activa de todos los botones
			navButtons.forEach((btn) => btn.classList.remove('active'));

			// Agrega la clase activa al botón actual
			this.classList.add('active');

			// Oculta el resto de divs
			divContainers.forEach((container) => (container.style.display = 'none'));
			infoDiv.style.display = 'none';
			fullScreenDiv.style.display = 'none';

			// Muestra el div de contenido correspondiente
			divContainers[index].style.display = 'flex';
		});
	});

	// Manejar clic en la puerta
	door.addEventListener('click', function () {
		// Oculta todos los contenedores
		divContainers.forEach((container) => (container.style.display = 'none'));
		infoDiv.style.display = 'flex';

		// Cambia el título de la página de vuelta a un valor por defecto
		document.title = "Basil's Garden";

		// Elimina la clase activa de todos los botones
		navButtons.forEach((btn) => btn.classList.remove('active'));
	});

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
		fullScreen.style.backgroundImage = `url('${imgs[currentIndex].src}')`;
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
