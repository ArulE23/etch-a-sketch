let SKETCH_MODE = false;

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

const colourCell = (event) => {
  if (SKETCH_MODE) {
    colourCellSketch(event);
  }
  cellColourOption(event);
}

const sketchGrid = document.querySelector("#sketch-grid");
const gridSizeInput = document.querySelector("#grid-size");
function initGrid() {
  const size = gridSizeInput.value;
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

gridSizeInput.addEventListener("input", initGrid)

const colourButtons = document.querySelector("#colour-btns");
const solidBtn = document.querySelector("#solid-btn");
const rainbowBtn = document.querySelector("#rainbow-btn");
colourButtons.addEventListener("click", (event) => {
  const target = event.target;
  switch (target) {
    case solidBtn:
      cellColourOption = colourCellSolid;
      rainbowBtn.classList.remove("clicked");
      solidBtn.classList.add("clicked");
      break;
    case rainbowBtn:
      cellColourOption = colourCellRainbow;
      solidBtn.classList.remove("clicked");
      rainbowBtn.classList.add("clicked");
      break;
  }
})

const sketchBtn = document.querySelector("#sketch-btn");
sketchBtn.addEventListener("click", () => {
  if (SKETCH_MODE) {
    sketchBtn.classList.remove("clicked");
  } else {
    sketchBtn.classList.add("clicked");
  }
  SKETCH_MODE = !SKETCH_MODE;
})

const clearBtn = document.querySelector("#clear-btn");
clearBtn.addEventListener("click", initGrid)
clearBtn.addEventListener("mousedown", () => {
  clearBtn.classList.add("clicked");
})
clearBtn.addEventListener("mouseup", () => {
  clearBtn.classList.remove("clicked");
})

initGrid();