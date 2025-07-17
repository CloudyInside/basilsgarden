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

function setGridHeight(grid) {
	const firstImg = grid.querySelector('img');
	if (!firstImg) return;

	// Force browser to calculate actual image height
	const imgHeight = firstImg.getBoundingClientRect().height;
	const gap = parseFloat(getComputedStyle(grid).gap) || 0;
	const rowHeight = imgHeight + gap;

	grid.style.maxHeight = `${rowHeight}px`;
	console.log('Set grid height:', rowHeight, 'px');
}

// Wait for all images to load
function initGrids() {
	document.querySelectorAll('.favs').forEach((grid) => {
		const images = grid.querySelectorAll('img');
		let loadedCount = 0;

		if (images.length === 0) {
			setGridHeight(grid);
			return;
		}

		images.forEach((img) => {
			if (img.complete) {
				loadedCount++;
			} else {
				img.addEventListener('load', () => {
					loadedCount++;
					if (loadedCount === images.length) {
						setGridHeight(grid);
					}
				});
			}
		});

		// If all images are already loaded
		if (loadedCount === images.length) {
			setGridHeight(grid);
		}
	});
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', initGrids);

// Optional: Handle responsive changes
const resizeObserver = new ResizeObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.target.classList.contains('favs')) {
			setGridHeight(entry.target);
		}
	});
});

document.querySelectorAll('.favs').forEach((grid) => {
	resizeObserver.observe(grid);
});
