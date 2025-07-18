(() => {
  // <stdin>
  document.addEventListener("DOMContentLoaded", () => {
    const imgs = document.querySelectorAll(".gallery img");
    let currentIndex = 0;
    const fullScreen = document.getElementById("fullscreen");
    const leftArrow = document.createElement("div");
    const rightArrow = document.createElement("div");
    leftArrow.textContent = " ";
    rightArrow.textContent = " ";
    leftArrow.className = "arrow left-arrow";
    rightArrow.className = "arrow right-arrow";
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
      fullScreen.style.backgroundImage = `url('${imgs[currentIndex].getAttribute("data-full")}')`;
      fullScreen.style.display = "block";
    }
    imgs.forEach((img, index) => {
      img.addEventListener("click", function(event) {
        event.stopPropagation();
        updateFullScreenImage(index);
      });
    });
    leftArrow.addEventListener("click", function(event) {
      event.stopPropagation();
      updateFullScreenImage(currentIndex - 1);
    });
    rightArrow.addEventListener("click", function(event) {
      event.stopPropagation();
      updateFullScreenImage(currentIndex + 1);
    });
    fullScreen.addEventListener("click", function(event) {
      event.stopPropagation();
      this.style.display = "none";
    });
  });
  function setGridHeight(grid) {
    const firstImg = grid.querySelector("img");
    if (!firstImg) return;
    const imgHeight = firstImg.getBoundingClientRect().height;
    const gap = parseFloat(getComputedStyle(grid).gap) || 0;
    const rowHeight = imgHeight + gap;
    grid.style.maxHeight = `${rowHeight}px`;
    console.log("Set grid height:", rowHeight, "px");
  }
  function setGridHeight(grid) {
    const firstImg = grid.querySelector("img");
    if (!firstImg) return;
    const imgHeight = firstImg.getBoundingClientRect().height;
    const gap = parseFloat(getComputedStyle(grid).gap) || 0;
    grid.style.maxHeight = `${imgHeight + gap}px`;
  }
  function initGrid(grid) {
    const images = grid.querySelectorAll("img");
    if (images.length === 0 || [...images].every((img) => img.complete)) {
      setGridHeight(grid);
      return;
    }
    images.forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", () => {
          if ([...images].every((i) => i.complete)) {
            setGridHeight(grid);
          }
        });
      }
    });
  }
  var observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          if (node.classList.contains("favs")) initGrid(node);
          node.querySelectorAll?.(".favs").forEach(initGrid);
        }
      });
    });
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  var resizeObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => initGrid(entry.target));
  });
  document.querySelectorAll(".favs").forEach((grid) => {
    initGrid(grid);
    resizeObserver.observe(grid);
  });
})();
