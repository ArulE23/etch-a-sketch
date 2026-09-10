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

let currColourOption = colourCellSolid;

const colourCellSketch = (event) => {
  const cell = event.target;
  if (!cell.style.backgroundColor) {
    cell.style.backgroundColor = "rgb(0,0,0)";
    cell.style.opacity = "0";
  }
  const cellOpacity = parseFloat(cell.style.opacity);
  if (cellOpacity < 1) {
    cell.style.opacity = `${cellOpacity + 0.1}`;
  }
}

const sketchGrid = document.querySelector("#sketch-grid");
function initGrid(size, colourOption) {
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
      cell.addEventListener("mouseover", colourOption);
      child.appendChild(cell);
    }
  }
}

const gridSizeInput = document.querySelector("#grid-size");
gridSizeInput.addEventListener("input", () => {
  initGrid(gridSizeInput.value, currColourOption);
})

const colourButtons = document.querySelector("#colour-btns");
colourButtons.addEventListener("click", (event) => {
  const targetId = event.target.id;
  switch (targetId) {
    case "solid-btn":
      currColourOption = colourCellSolid;
      break;
    case "rainbow-btn":
      currColourOption = colourCellRainbow;
      break;
  }
  initGrid(gridSizeInput.value, currColourOption)
})

const progressiveCheckbox = document.querySelector("#progressive");
progressiveCheckbox.addEventListener("input", () => {
  if (progressiveCheckbox.checked == true) {
    initGrid(gridSizeInput.value, colourCellSketch);
  } else {
    initGrid(gridSizeInput.value, currColourOption);
  }
})

initGrid(DEFAULT_GRID_SIZE, currColourOption);