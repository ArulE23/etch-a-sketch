const DEFAULT_GRID_SIZE = 16;

const colourCellBlack = (event) => {
  event.target.style.backgroundColor = "black";
}

const sketchGrid = document.querySelector("#sketch-grid");
function initGrid(size) {
  sketchGrid.replaceChildren();
  for (let i = 0; i < size; i++) {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.flex = "1";
    sketchGrid.appendChild(row);
  }
  for (child of document.querySelectorAll("#sketch-grid > div")) {
    for (let i = 0; i < size; i++) {
      const cell = document.createElement("div");
      cell.style.flex = "1";
      cell.style.border = "0.5px solid grey";
      child.appendChild(cell);
      cell.addEventListener("mouseover", colourCellBlack);
    }
  }
}

const gridSizeInput = document.querySelector("#grid-size");
gridSizeInput.addEventListener("change", () => {
  initGrid(gridSizeInput.value);
})

initGrid(DEFAULT_GRID_SIZE);