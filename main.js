let sketchMode = false;
let cellColourOption;
let gridSize = 16;

function randomRGBValue() {
  return Math.floor(Math.random() * 256);
}

const colourCellSolid = (event) => {
  if (!event.target.style.backgroundColor) {
    const solidClr = document.querySelector("#solid-clr").value;
    event.target.style.backgroundColor = solidClr;
  }
}
cellColourOption = colourCellSolid;

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

const colourCell = (event) => {
  if (sketchMode) {
    colourCellSketch(event);
  }
  cellColourOption(event);
}

const sketchGrid = document.querySelector("#sketch-grid");
function initGrid() {
  sketchGrid.replaceChildren();
  for (let i = 0; i < gridSize; i++) {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.flex = "1";
    sketchGrid.appendChild(row);
  }
  for (child of document.querySelectorAll("#sketch-grid > div")) {
    for (let i = 0; i < gridSize; i++) {
      const cell = document.createElement("div");
      cell.style.flex = "1";
      cell.addEventListener("mouseover", colourCell);
      child.appendChild(cell);
    }
  }
}

const sizeBtns = document.querySelector("#size-btns");
const smallBtn = document.querySelector("#size-s");
const mediumBtn = document.querySelector("#size-m");
const largeBtn = document.querySelector("#size-l");
sizeBtns.addEventListener("click", (event) => {
  const target = event.target;
  switch (target) {
    case smallBtn:
      gridSize = 16;
      smallBtn.classList.add("clicked");
      mediumBtn.classList.remove("clicked");
      largeBtn.classList.remove("clicked");
      initGrid();
      break;
    case mediumBtn:
      gridSize = 48;
      smallBtn.classList.remove("clicked");
      mediumBtn.classList.add("clicked");
      largeBtn.classList.remove("clicked");
      initGrid();
      break;
    case largeBtn:
      gridSize = 112;
      smallBtn.classList.remove("clicked");
      mediumBtn.classList.remove("clicked");
      largeBtn.classList.add("clicked");
      initGrid();
      break;
  }
})

const colourBtns = document.querySelector("#colour-btns");
const solidBtn = document.querySelector("#solid-btn");
const rainbowBtn = document.querySelector("#rainbow-btn");
colourBtns.addEventListener("click", (event) => {
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
  if (sketchMode) {
    sketchBtn.classList.remove("clicked");
  } else {
    sketchBtn.classList.add("clicked");
  }
  sketchMode = !sketchMode;
})

const clearBtn = document.querySelector("#clear-btn");
clearBtn.addEventListener("click", initGrid)
clearBtn.addEventListener("mousedown", () => {
  clearBtn.classList.add("clicked");
})
window.addEventListener("mouseup", () => {
  clearBtn.classList.remove("clicked");
})

initGrid();