const DEFAULT_GRID_SIZE = 16;

function randomRGBValue() {
  return Math.floor(Math.random() * 256);
}

const colourCellSolid = (event) => {
  if (!event.target.style.backgroundColor) {
    const solidClr = document.querySelector("#solid-clr").value;
    event.target.style.backgroundColor = solidClr;
  }
}

const colourCellRainbow = (event) => {
  if (!event.target.style.backgroundColor) {
    const red = randomRGBValue();
    const green = randomRGBValue();
    const blue = randomRGBValue();
    event.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
  }
}

const colourCellSketch = (event) => {
  const cell = event.target;
  if (!cell.style.backgroundColor) {
    cell.style.opacity = "0";
  }
  const cellOpacity = parseFloat(cell.style.opacity);
  if (cellOpacity < 1) {
    cell.style.opacity = `${cellOpacity + 0.1}`;
  }
}

let cellColourOption = colourCellSolid;

const sketchCheckbox = document.querySelector("#sketch-check");
const colourCell = (event) => {
  if (sketchCheckbox.checked) {
    colourCellSketch(event);
  }
  cellColourOption(event);
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
      cell.addEventListener("mouseover", colourCell);
      child.appendChild(cell);
    }
  }
}

const gridSizeInput = document.querySelector("#grid-size");
gridSizeInput.addEventListener("input", () => {
  initGrid(gridSizeInput.value);
})

const colourButtons = document.querySelector("#colour-btns");
colourButtons.addEventListener("click", (event) => {
  const targetId = event.target.id;
  switch (targetId) {
    case "solid-btn":
      cellColourOption = colourCellSolid;
      break;
    case "rainbow-btn":
      cellColourOption = colourCellRainbow;
      break;
  }
})

initGrid(DEFAULT_GRID_SIZE);