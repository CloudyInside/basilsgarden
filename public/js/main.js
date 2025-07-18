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
	const images = grid.querySelectorAll('img');
	if (images.length === 0) return;

	// Find the tallest image in this specific grid
	let maxHeight = 0;
	images.forEach((img) => {
		const imgHeight = img.getBoundingClientRect().height;
		if (imgHeight > maxHeight) maxHeight = imgHeight;
	});

	const gap = parseFloat(getComputedStyle(grid).gap) || 0;
	grid.style.maxHeight = `${maxHeight + gap}px`;
	console.log('Set grid height for', grid.id || 'grid', ':', maxHeight + gap, 'px');
}

function initGrid(grid) {
	const images = grid.querySelectorAll('img');

	// If no images or all images already loaded, set height immediately
	if (images.length === 0 || [...images].every((img) => img.complete)) {
		setGridHeight(grid);
		return;
	}

	// Otherwise wait for all images to load
	let loadedCount = 0;
	images.forEach((img) => {
		if (img.complete) {
			loadedCount++;
		} else {
			img.addEventListener(
				'load',
				() => {
					loadedCount++;
					if (loadedCount === images.length) {
						setGridHeight(grid);
					}
				},
				{ once: true }
			);
		}
	});
}

// Initialize all current grids and watch for new ones
const observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		mutation.addedNodes.forEach((node) => {
			if (node.nodeType === 1) {
				// Element node
				if (node.classList.contains('favs')) initGrid(node);
				node.querySelectorAll?.('.favs').forEach(initGrid);
			}
		});
	});
});

// Start observing the document for changes
observer.observe(document.body, {
	childList: true,
	subtree: true,
});

// Also observe for resize events on existing grids
const resizeObserver = new ResizeObserver((entries) => {
	entries.forEach((entry) => initGrid(entry.target));
});

// Initialize existing grids and set up observers
document.querySelectorAll('.favs').forEach((grid) => {
	initGrid(grid);
	resizeObserver.observe(grid);
});
