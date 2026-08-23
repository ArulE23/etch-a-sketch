const sketchGrid = document.querySelector("#sketch-grid");
const gridSizeInput = document.querySelector("#grid-size");
const DEFAULT_GRID_SIZE = 16;

const colourCellBlack = (event) => {
  event.target.style.backgroundColor = "black";
}

/**
 * Extracts the opacity value of an rgba string as a number.
 * e.g: "rgba(0, 0, 0, 0.1)" -> 0.1.
 */
function getRgbaOpacity(bgColor) {
  if (bgColor.includes("rgba")) {
    return Number(bgColor.split(",").at(-1).replace(")", ""));
  } else {
    return 1;
  }
}

const colourCellProgressive = (event) => {
  const cell = event.target;
  const bgColor = window.getComputedStyle(cell).backgroundColor;
  let opacity = getRgbaOpacity(bgColor);
  if (opacity < 1) {
    opacity += 0.1;
    cell.style.backgroundColor = `rgba(0,0,0,${opacity})`;
  }
}

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
      cell.addEventListener("mouseover", colourCellProgressive);
      child.appendChild(cell);
    }
  }
}

gridSizeInput.addEventListener("change", () => {
  initGrid(gridSizeInput.value);
})

initGrid(DEFAULT_GRID_SIZE);